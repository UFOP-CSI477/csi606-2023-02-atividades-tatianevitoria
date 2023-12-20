const express = require('express');
const router = express.Router();

const doacoesController = require('../controllers/doacoesController');

router.get('/doacoes', doacoesController.getAllDoacoes);
router.get('/doacoes/:id', doacoesController.getDoacaoById);
router.post('/doacoes', doacoesController.createDoacao);
router.put('/doacoes/:id', doacoesController.updateDoacao);
router.delete('/doacoes/:id', doacoesController.deleteDoacao);

module.exports = router;