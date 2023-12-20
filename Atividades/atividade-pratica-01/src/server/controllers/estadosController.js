const Estado = require('../models/estados');
const database = require('../database/db');

async () => {await database.sync()};

// Obtém todos os estados
async function getAllEstados(req, res) {
  try {
    const estados = await Estado.findAll();
    res.json(estados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar estados.' });
  }
}

// Obtém um estado por ID
async function getEstadoById(req, res) {
  const { id } = req.params;
  try {
    const estado = await Estado.findByPk(id);
    if (!estado) {
      return res.status(404).json({ error: 'Estado não encontrado.' });
    }
    res.json(estado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar estado por ID.' });
  }
}

// Cria um novo estado
async function createEstado(req, res) {
  const { nome, sigla } = req.body;
  try {
    const novoEstado = await Estado.create({ nome, sigla });
    res.status(201).json(novoEstado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar estado.' });
  }
}

// Atualiza um estado por ID
async function updateEstado(req, res) {
  const { id } = req.params;
  const { nome, sigla } = req.body;
  try {
    const estado = await Estado.findByPk(id);
    if (!estado) {
      return res.status(404).json({ error: 'Estado não encontrado.' });
    }
    await estado.update({ nome, sigla });
    res.json(estado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar estado.' });
  }
}

// Exclui um estado por ID
async function deleteEstado(req, res) {
  const { id } = req.params;
  try {
    const estado = await Estado.findByPk(id);
    if (!estado) {
      return res.status(404).json({ error: 'Estado não encontrado.' });
    }
    await estado.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir estado.' });
  }
}

module.exports = {
  getAllEstados,
  getEstadoById,
  createEstado,
  updateEstado,
  deleteEstado,
};
