const Cidade = require('../models/cidades');
const database = require('../database/db');

async () => {await database.sync()};

// Obtém todas as cidades
async function getAllCidades(req, res) {
  try {
    const cidades = await Cidade.findAll();
    res.json(cidades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar a cidade.' });
  }
}

// Obtém uma Cidade por ID
async function getCidadeById(req, res) {
  const { id } = req.params;
  try {
    const cidade = await Cidade.findByPk(id);
    if (!cidade) {
      return res.status(404).json({ error: 'Cidade não encontrada.' });
    }
    res.json(cidade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar Cidade por ID.' });
  }
}

// Cria uma nova Cidade
async function createCidade(req, res) {
  const { nome, estado_id } = req.body;
  try {
    const novaCidade = await Cidade.create({ nome, estado_id });
    res.status(201).json(novaCidade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar Cidade.' });
  }
}

// Atualiza uma Cidade por ID
async function updateCidade(req, res) {
  const { id } = req.params;
  const { nome, estado_id } = req.body;
  try {
    const cidade = await Cidade.findByPk(id);
    if (!cidade) {
      return res.status(404).json({ error: 'Cidade não encontrada.' });
    }
    await cidade.update({ nome, estado_id });
    res.json(cidade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar Cidade.' });
  }
}

// Exclui uma Cidade por ID
async function deleteCidade(req, res) {
  const { id } = req.params;
  try {
    const cidade = await Cidade.findByPk(id);
    if (!cidade) {
      return res.status(404).json({ error: 'Cidade não encontrada.' });
    }
    await cidade.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir Cidade.' });
  }
}

module.exports = {
  getAllCidades,
  getCidadeById,
  createCidade,
  updateCidade,
  deleteCidade,
};
