const Locais_coleta = require('../models/locais_coleta');
const database = require('../database/db');

async () => {await database.sync()};

// Obtém todos os Local_coleta
async function getAllLocais_coleta(req, res) {
  try {
    const locais_coleta = await Locais_coleta.findAll();
    res.json(locais_coleta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar Local_coleta.' });
  }
}

// Obtém um Local_coleta por ID
async function getLocal_coletaById(req, res) {
  const { id } = req.params;
  try {
    const local_coleta = await Locais_coleta.findByPk(id);
    if (!local_coleta) {
      return res.status(404).json({ error: 'Local_coleta não encontrado.' });
    }
    res.json(local_coleta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar Local_coleta por ID.' });
  }
}

// Cria um novo Local_coleta
async function createLocal_coleta(req, res) {
  const { nome, rua, numero, complemento, cidade_id } = req.body;
  try {
    const novoLocais_coleta = await Locais_coleta.create({ nome, rua, numero, complemento, cidade_id });
    res.status(201).json(novoLocais_coleta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar Local_coleta.' });
  }
}

// Atualiza um Local_coleta por ID
async function updateLocal_coleta(req, res) {
  const { id } = req.params;
  const { nome, rua, numero, complemento, cidade_id } = req.body;
  try {
    const local_coleta = await Locais_coleta.findByPk(id);
    if (!local_coleta) {
      return res.status(404).json({ error: 'Local_coleta não encontrado.' });
    }
    await local_coleta.update({ nome, rua, numero, complemento, cidade_id });
    res.json(local_coleta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar Local_coleta.' });
  }
}

// Exclui um Local_coleta por ID
async function deleteLocal_coleta(req, res) {
  const { id } = req.params;
  try {
    const local_coleta = await Locais_coleta.findByPk(id);
    if (!local_coleta) {
      return res.status(404).json({ error: 'Local_coleta não encontrado.' });
    }
    await local_coleta.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir Local_coleta.' });
  }
}

module.exports = {
  getAllLocais_coleta,
  getLocal_coletaById,
  createLocal_coleta,
  updateLocal_coleta,
  deleteLocal_coleta,
};
