const express = require('express');
const agendaController = require('../controllers/agendaController.js');

const router = express.Router();

router.get('/agenda', agendaController.getAllAgendas);
router.get('/agenda/:id', agendaController.getAgendaById);
router.post('/agenda', agendaController.createAgenda);
router.put('/agenda/:id', agendaController.updateAgenda);
router.delete('/agenda/:id', agendaController.deleteAgenda);

module.exports = router;
