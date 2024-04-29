const express = require('express');
const router = express.Router();
const EmployeesControllers = require('../controllers/Employees');

router.get('/', EmployeesControllers.obtenerEmpleados);
router.post('/', EmployeesControllers.registrarEmpleado);
router.put('/:id', EmployeesControllers.actualizarEmpleado);
router.delete('/:id', EmployeesControllers.eliminarEmpleado);

module.exports = router;