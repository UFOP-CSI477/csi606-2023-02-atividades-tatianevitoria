const express = require('express');
const medicoController = require('../controllers/medicoController.js');

const router = express.Router();

router.get('/medico', medicoController.getAllMedicos);
router.get('/medico/:id', medicoController.getMedicoById);
router.post('/medico', medicoController.createMedico);
router.put('/medico/:id', medicoController.updateMedico);
router.delete('/medico/:id', medicoController.deleteMedico);

module.exports = router;
