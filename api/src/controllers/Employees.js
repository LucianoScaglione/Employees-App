const { Employees } = require("../db");
const { Op } = require("sequelize");

const ejecutarBaseDatos = async () => {
  const obtenerInformacion = await Employees.findAll();
  return obtenerInformacion;
}

const obtenerEmpleados = async (req, res, next) => {
  try {
    const { primerNombre, primerApellido } = req.query;
    const obtenerInformacion = await ejecutarBaseDatos();

    if (!obtenerInformacion.length) {
      res.status(400).send("La base de datos está vacía");
    }

    if (primerNombre) {
      const buscarEmpleadoNombre = await Employees.findAll({
        where: {
          primerNombre: {
            [Op.iLike]: `%${primerNombre}%`
          }
        }
      });
      buscarEmpleadoNombre.length ? res.status(200).send(buscarEmpleadoNombre) : res.status(404).send("No existe ningún empleado con ese nombre");
    } else if (primerApellido) {
      const buscarEmpleadoApellido = await Employees.findAll({
        where: {
          primerApellido: {
            [Op.iLike]: `%${primerApellido}%`
          }
        }
      });
      buscarEmpleadoApellido.length ? res.status(200).send(buscarEmpleadoApellido) : res.status(404).send("No existe ningún empleado con ese apellido");
    }
    else {
      res.status(200).send(obtenerInformacion);
    }
  } catch (error) {
    next(error);
  }
}

const buscarUnEmpleado = async (req, res, next) => {
  const { id } = req.params;
  const buscarEmpleado = await Employees.findOne({ where: { id } });
  if (buscarEmpleado) {
    res.status(200).send(buscarEmpleado);
  } else {
    res.status(400).send("No existe empleado registrado con ese id");
  }
}

const registrarEmpleado = async (req, res, next) => {
  try {
    const { primerNombre, segundoNombre, primerApellido, segundoApellido, edad, foto, curriculumVitae, puesto, fechaIngreso } = req.body;
    // Falta agregar foto y currículum vitae
    const crearEmpleado = await Employees.create({
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      edad,
      foto,
      curriculumVitae,
      puesto,
      fechaIngreso
    });

    res.status(200).json({ creado: true, crearEmpleado });

  } catch (error) {
    next(error);
  }
}

const actualizarEmpleado = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { primerNombre, segundoNombre, primerApellido, segundoApellido, edad, foto, curriculumVitae, puesto, fechaIngreso } = req.body;
    const buscarEmpleado = await Employees.findOne({ where: { id } });
    if (buscarEmpleado) {
      await buscarEmpleado.update({
        primerNombre: primerNombre,
        segundoNombre: segundoNombre,
        primerApellido: primerApellido,
        segundoApellido: segundoApellido,
        edad: edad,
        foto: foto,
        curriculumVitae: curriculumVitae,
        puesto: puesto,
        fechaIngreso: fechaIngreso
      });
      buscarEmpleado.save();
      res.status(200).json({ msg: "La información del empleado fue actualizada", buscarEmpleado });
    } else {
      res.status(404).send("No existe empleado registrado con ese id");
    }
  } catch (error) {
    next(error);
  }
}

const eliminarEmpleado = async (req, res, next) => {
  try {
    const { id } = req.params;
    const buscarEmpleado = await Employees.findOne({ where: { id } });
    if (!buscarEmpleado) {
      res.status(404).send("No existe ningún empleado registrado con ese id");
    } else {
      const eliminar = await Employees.destroy({ where: { id } });
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