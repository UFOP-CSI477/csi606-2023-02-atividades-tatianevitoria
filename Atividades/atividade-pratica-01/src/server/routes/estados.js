const express = require('express');
const router = express.Router();

const estadosController = require('../controllers/estadosController');

router.get('/estados', estadosController.getAllEstados);
router.get('/estados/:id', estadosController.getEstadoById);
router.post('/estados', estadosController.createEstado);
router.put('/estados/:id', estadosController.updateEstado);
router.delete('/estados/:id', estadosController.deleteEstado);

module.exports = router;