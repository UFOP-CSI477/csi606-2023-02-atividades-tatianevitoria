const express = require('express');
const router = express.Router();

const locais_coletaController = require('../controllers/locais_coletaController');

router.get('/locais_coleta', locais_coletaController.getAllLocais_coleta);
router.get('/locais_coleta/:id', locais_coletaController.getLocal_coletaById);
router.post('/locais_coleta', locais_coletaController.createLocal_coleta);
router.put('/locais_coleta/:id', locais_coletaController.updateLocal_coleta);
router.delete('/locais_coleta/:id', locais_coletaController.deleteLocal_coleta);

module.exports = router;