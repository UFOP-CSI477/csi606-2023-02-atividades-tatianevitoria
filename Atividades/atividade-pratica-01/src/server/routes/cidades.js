const express = require('express');
const router = express.Router();

const cidadesController = require('../controllers/cidadesController');

router.get('/cidades', cidadesController.getAllCidades);
router.get('/cidades/:id', cidadesController.getCidadeById);
router.post('/cidades', cidadesController.createCidade);
router.put('/cidades/:id', cidadesController.updateCidade);
router.delete('/cidades/:id', cidadesController.deleteCidade);

module.exports = router;