const express = require('express');
const consultaController = require('../controllers/consultaController.js');

const router = express.Router();

router.get('/consulta', consultaController.getAllConsultas);
router.get('/consulta/:id', consultaController.getConsultaById);
router.post('/consulta', consultaController.createConsulta);
router.put('/consulta/:id', consultaController.updateConsulta);
router.delete('/consulta/:id', consultaController.deleteConsulta);

module.exports = router;
