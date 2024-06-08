const { Employees, Positions } = require("../db");
const { Op } = require("sequelize");
const fs = require('fs');

const ejecutarBaseDatos = async () => {
  const obtenerInformacion = await Employees.findAll({ include: Positions });
  return obtenerInformacion;
}

const archivoBase64 = (archivo, empleado, extension) => {
  let decodificarLink = Buffer.from(archivo, 'base64');
  let nombreArchivoGuardado = extension === '.pdf' ? `${empleado.nombre}${empleado.apellido}${extension}` : `${Date.now()}${extension}`
  let almacenamientoLinkArchivo = `uploads/${nombreArchivoGuardado}`;
  let linkArchivoARenderizar = `http://localhost:3001/uploads/${nombreArchivoGuardado}`;
  fs.writeFileSync(almacenamientoLinkArchivo, decodificarLink);
  return linkArchivoARenderizar;
}

const obtenerEmpleados = async (req, res, next) => {
  try {
    const { empleado } = req.query;
    const obtenerInformacion = await ejecutarBaseDatos();

    if (!obtenerInformacion.length) {
      return res.status(400).send("La base de datos está vacía");
    }

    if (empleado) {
      const buscarEmpleado = await Employees.findAll({
        where: {
          [Op.or]: [
            { primerNombre: { [Op.iLike]: `%${empleado}%` } },
            { primerApellido: { [Op.iLike]: `%${empleado}%` } }
          ]
        }
      });
      return buscarEmpleado.length ? res.status(200).json(buscarEmpleado) : res.status(404).send("No existe ningún empleado registrado con ese nombre");
    }
    else {
      res.status(200).json(obtenerInformacion);
    }
  } catch (error) {
    next(error);
  }
}

const buscarUnEmpleado = async (req, res, next) => {
  try {
    const { id } = req.params;
    const buscarEmpleado = await Employees.findOne({ where: { id }, include: Positions });
    if (buscarEmpleado) {
      res.status(200).json(buscarEmpleado);
    } else {
      return res.status(404).send("No existe empleado registrado con ese id");
    }
  } catch (error) {
    next(error);
  }
}

const registrarEmpleado = async (req, res, next) => {
  try {
    const { primerNombre, segundoNombre, primerApellido, segundoApellido, edad, foto, curriculumVitae, puestoId, fechaIngreso } = req.body;
    if (!primerNombre || !primerApellido || !edad || !puestoId || !fechaIngreso) {
      return res.status(400).send("Debes completar los campos requeridos");
    }
    const empleado = { "nombre": primerNombre, "apellido": primerApellido }
    const crearImagen = foto ? archivoBase64(foto, empleado, '.png') : `http://localhost:3001/uploads/withoutimagen.png`;
    const crearCV = curriculumVitae ? archivoBase64(curriculumVitae, empleado, '.pdf') : '';
    const crearEmpleado = await Employees.create({
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      edad,
      foto: crearImagen,
      curriculumVitae: crearCV,
      fechaIngreso,
      PositionId: puestoId
    });
    res.status(200).json({ creado: true, crearEmpleado });
  } catch (error) {
    next(error);
  }
}

const actualizarEmpleado = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { primerNombre, segundoNombre, primerApellido, segundoApellido, edad, nuevaFoto, nuevoCurriculum, puestoId, fechaIngreso } = req.body;
    const buscarEmpleado = await Employees.findOne({ where: { id }, include: Positions });
    if (!buscarEmpleado) {
      return res.status(404).send("No existe empleado registrado con ese id");
    }
    if (nuevaFoto) {
      const url = new URL(buscarEmpleado.foto);
      const relativePath = url.pathname.substring(1);
      fs.unlinkSync(relativePath)
    }
    const empleado = { "nombre": buscarEmpleado.primerNombre, "apellido": buscarEmpleado.primerApellido }

    const editarImagen = nuevaFoto ? archivoBase64(nuevaFoto, ".png") : buscarEmpleado.foto
    const editarCurriculum = nuevoCurriculum ? archivoBase64(nuevoCurriculum, empleado, ".pdf") : buscarEmpleado.curriculumVitae
    await buscarEmpleado.update({
      primerNombre: primerNombre,
      segundoNombre: segundoNombre,
      primerApellido: primerApellido,
      segundoApellido: segundoApellido,
      edad: edad,
      foto: nuevaFoto ? editarImagen : buscarEmpleado.foto,
      curriculumVitae: nuevoCurriculum ? editarCurriculum : buscarEmpleado.curriculumVitae,
      PositionId: puestoId,
      fechaIngreso: fechaIngreso
    });
    buscarEmpleado.save();
    res.status(200).json(buscarEmpleado);
  } catch (error) {
    next(error);
  }
}

const eliminarEmpleado = async (req, res, next) => {
  try {
    const { id } = req.params;
    const buscarEmpleado = await Employees.findOne({ where: { id } });
    if (!buscarEmpleado) {
      return res.status(404).send("No existe ningún empleado registrado con ese id");
    } else {
      await Employees.destroy({ where: { id } });
      res.status(200).json({ destroy: true, msg: "El empleado fue eliminado de la base de datos" })
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  obtenerEmpleados,
  buscarUnEmpleado,
  registrarEmpleado,
  actualizarEmpleado,
  eliminarEmpleado
}