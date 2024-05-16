const { Positions } = require('../db');

const obtenerPuestos = async (req, res, next) => {
  try {
    const puestos = await Positions.findAll();
    puestos.length ? res.status(200).send(puestos) : res.status(404).send("No existen puestos creados");
  } catch (error) {
    next(error);
  }
};

const crearPuesto = async (req, res, next) => {
  try {
    const { puesto } = req.body;
    const buscarPuesto = await Positions.findOne({ where: { puesto } });
    if (buscarPuesto) {
      res.status(400).send("Ya existe ese puesto registrado")
    } else {
      const crearPuesto = await Positions.create({ puesto });
      res.status(200).send({ msg: "Puesto registrado correctamente", puesto: crearPuesto });
    }
  } catch (error) {
    next(error);
  }
};

const eliminarPuesto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const buscarPuesto = await Positions.findOne({ where: { id } });
    if (!buscarPuesto) {
      res.status(400).send("No existe puesto registrado con ese id");
    } else {
      await Positions.destroy({ where: { id } });
      res.status(200).send("El puesto fue eliminado de la base de datos");
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  obtenerPuestos,
  crearPuesto,
  eliminarPuesto
}