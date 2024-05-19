const { Users } = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const obtenerUsuarios = async (req, res, next) => {
  try {
    const buscarUsuarios = await Users.findAll();
    buscarUsuarios.length ? res.status(200).send(buscarUsuarios) : res.status(400).send("No existen usuarios registrados")
  } catch (error) {
    next(error);
  }
};

const obtenerUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const buscarUsuario = await Users.findOne({ where: { id } });
    buscarUsuario ? res.status(200).send(buscarUsuario) : res.status(400).send("No existe usuario registrado con ese id");
  } catch (error) {
    next(error);
  }
}

const registrarUsuario = async (req, res, next) => {
  try {
    const { nombreUsuario, contraseña, correo } = req.body;
    const buscarUsuario = await Users.findOne({ where: { nombreUsuario } });
    const buscarUsuarioCorreo = await Users.findOne({ where: { correo: correo.toLowerCase() } });

    if (!nombreUsuario || !contraseña || !correo) {
      res.status(400).send("Debes completar todos los campos de registro");
    }

    if (!buscarUsuario && !buscarUsuarioCorreo) {
      const hashContraseña = await bcrypt.hash(contraseña, 10);
      const usuario = await Users.create({
        nombreUsuario,
        contraseña: hashContraseña,
        correo: correo.toLowerCase()
      }
      );
      res.status(200).json({ msg: "Usuario creado correctamente", "Usuario": usuario });
    } else {
      res.status(400).send("Ya existe un usuario registrado con ese nombre o correo, intente nuevamente");
    }
  } catch (error) {
    next(error);
  }
};

const loguearUsuario = async (req, res, next) => {
  try {
    const { nombreUsuario, contraseña } = req.body;
    const buscarUsuario = await Users.findOne({ where: { nombreUsuario } });

    if (!nombreUsuario || !contraseña) {
      res.status(400).send("Debes escribir un nombre de usuario y contraseña");
    }

    if (buscarUsuario && (await bcrypt.compare(contraseña, buscarUsuario.contraseña))) {
      const token = jwt.sign({ user_id: buscarUsuario.id }, "secret", { expiresIn: "10h" });
      buscarUsuario.token = token;
      res.status(200).json({ usuario: buscarUsuario, token: token });
    } else {
      res.status(400).send("Nombre de usuario o contraseña incorrecta");
    }
  } catch (error) {
    next(error);
  }
};

const editarUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombreUsuario, contraseña, correo } = req.body;
    const buscarUsuario = await Users.findOne({ where: { id } });
    if (buscarUsuario) {
      await buscarUsuario.update({
        nombreUsuario,
        /* Crear hash contraseña*/
        contraseña,
        correo
      })
      buscarUsuario.save();
      res.status(200).send("Usuario actualizado correctamente");
    } else {
      res.status(400).send("No existe usuario registado con ese id");
    }
  } catch (error) {
    next(error);
  }
}

const eliminarUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const buscarUsuario = await Users.findOne({ where: { id } });

    if (buscarUsuario) {
      await buscarUsuario.destroy();
      res.status(200).send("Usuario eliminado");
    } else {
      res.status(400).send("No existe usuario con ese id");
    }
  } catch (error) {
    next(error);
  }
};


module.exports = {
  obtenerUsuarios,
  obtenerUsuario,
  registrarUsuario,
  loguearUsuario,
  editarUsuario,
  eliminarUsuario
};