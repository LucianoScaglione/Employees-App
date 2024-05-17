const express = require('express');
const router = express.Router();
const PositionsControllers = require('../controllers/Positions');

router.get('/', PositionsControllers.obtenerPuestos);
router.get('/:id', PositionsControllers.obtenerPuesto);
router.post('/', PositionsControllers.crearPuesto);
router.put('/:id', PositionsControllers.actualizarPuesto);
router.delete('/:id', PositionsControllers.eliminarPuesto);

module.exports = router;