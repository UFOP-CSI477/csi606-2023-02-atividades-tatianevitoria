const Doacao = require('../models/doacoes');
const database = require('../database/db');

async () => {await database.sync()};

// Obtém todas as Doacoes
async function getAllDoacoes(req, res) {
  try {
    const doacoes = await Doacao.findAll();
    res.json(doacoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar as Doacoes.' });
  }
}

// Obtém uma Doacao por ID
async function getDoacaoById(req, res) {
  const { id } = req.params;
  try {
    const doacao = await Doacao.findByPk(id);
    if (!doacao) {
      return res.status(404).json({ error: 'Doacao não encontrada.' });
    }
    res.json(doacao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar Doacao por ID.' });
  }
}

// Cria uma nova Doacao
async function createDoacao(req, res) {
  const { pessoa_id, local_id, data } = req.body;
  try {
    const novaDoacao = await Doacao.create({ pessoa_id, local_id, data });
    res.status(201).json(novaDoacao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar Doacao.' });
  }
}

// Atualiza uma Doacao por ID
async function updateDoacao(req, res) {
  const { id } = req.params;
  const { pessoa_id, local_id, data } = req.body;
  try {
    const doacao = await Doacao.findByPk(id);
    if (!doacao) {
      return res.status(404).json({ error: 'Doacao não encontrada.' });
    }
    await doacao.update({ pessoa_id, local_id, data });
    res.json(doacao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar Doacao.' });
  }
}

// Exclui uma Doacao por ID
async function deleteDoacao(req, res) {
  const { id } = req.params;
  try {
    const doacao = await Doacao.findByPk(id);
    if (!doacao) {
      return res.status(404).json({ error: 'Doacao não encontrada.' });
    }
    await doacao.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir Doacao.' });
  }
}

module.exports = {
  getAllDoacoes,
  getDoacaoById,
  createDoacao,
  updateDoacao,
  deleteDoacao,
};
