const express = require('express');
const router = express.Router();
const UsersControllers = require('../controllers/Users');

router.get('/', UsersControllers.obtenerUsuarios);
router.get('/:id', UsersControllers.obtenerUsuario);
router.post('/register', UsersControllers.registrarUsuario);
router.post('/login', UsersControllers.loguearUsuario);
router.put('/:id', UsersControllers.editarUsuario);
router.delete('/:id', UsersControllers.eliminarUsuario);

module.exports = router;