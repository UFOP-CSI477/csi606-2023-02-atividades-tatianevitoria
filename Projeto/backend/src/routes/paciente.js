const express = require('express');
const pacienteController = require('../controllers/pacienteController.js');


const router = express.Router();

router.get('/paciente', pacienteController.getAllPacientes);
router.get('/paciente/:id', pacienteController.getPacienteById);
router.post('/paciente', pacienteController.createPaciente);
router.put('/paciente/:id', pacienteController.updatePaciente);
router.delete('/paciente/:id', pacienteController.deletePaciente);

module.exports = router;
