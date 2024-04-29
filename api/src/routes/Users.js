const express = require('express');
const router = express.Router();
const UsersControllers = require('../controllers/Users');

router.get('/', UsersControllers.obtenerUsuarios);
router.post('/register', UsersControllers.registrarUsuario);
router.post('/login', UsersControllers.loguearUsuario);
router.delete('/:id', UsersControllers.eliminarUsuario);

module.exports = router;