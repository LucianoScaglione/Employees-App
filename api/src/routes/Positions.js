const express = require('express');
const router = express.Router();
const PositionsControllers = require('../controllers/Positions');

router.get('/', PositionsControllers.obtenerPuestos);
router.post('/', PositionsControllers.crearPuesto);

module.exports = router;