const express = require('express');
const router = express.Router();
const PositionsControllers = require('../controllers/Positions');

router.get('/', PositionsControllers.obtenerPuestos);
router.post('/', PositionsControllers.crearPuesto);
router.delete('/:id', PositionsControllers.eliminarPuesto);

module.exports = router;