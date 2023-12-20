const express = require('express');
const router = express.Router();

const tipos_sanguineosController = require('../controllers/tipos_sanguineosController');

router.get('/tipos_sanguineos', tipos_sanguineosController.getAllTipos_sanguineos);
router.get('/tipos_sanguineos/:id', tipos_sanguineosController.getTipo_sanguineoById);
router.post('/tipos_sanguineos', tipos_sanguineosController.createTipo_sanguineo);
router.put('/tipos_sanguineos/:id', tipos_sanguineosController.updateTipo_sanguineo);
router.delete('/tipos_sanguineos/:id', tipos_sanguineosController.deleteTipo_sanguineo);

module.exports = router;