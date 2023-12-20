const Pessoa = require('../models/pessoas');
const database = require('../database/db');

async () => {await database.sync()};

// Obtém todas as pessoas
async function getAllPessoas(req, res) {
  try {
    const pessoas = await Pessoa.findAll();
    res.json(pessoas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar a pessoa.' });
  }
}

// Obtém uma pessoa por ID
async function getPessoaById(req, res) {
  const { id } = req.params;
  try {
    const pessoa = await Pessoa.findByPk(id);
    if (!pessoa) {
      return res.status(404).json({ error: 'pessoa não encontrada.' });
    }
    res.json(pessoa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar pessoa por ID.' });
  }
}

// Cria uma nova pessoa
async function createPessoa(req, res) {
  const { nome, rua, numero, complemento, rg, cidade_id, tipo_id } = req.body;
  try {
    const novapessoa = await Pessoa.create({ nome, rua, numero, complemento, rg, cidade_id, tipo_id });
    res.status(201).json(novapessoa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar pessoa.' });
  }
}

// Atualiza uma pessoa por ID
async function updatePessoa(req, res) {
  const { id } = req.params;
  const { nome, rua, numero, complemento, rg, cidade_id, tipo_id } = req.body;
  try {
    const pessoa = await Pessoa.findByPk(id);
    if (!pessoa) {
      return res.status(404).json({ error: 'pessoa não encontrada.' });
    }
    await pessoa.update({ nome, rua, numero, complemento, rg, cidade_id, tipo_id });
    res.json(pessoa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar pessoa.' });
  }
}

// Exclui uma pessoa por ID
async function deletePessoa(req, res) {
  const { id } = req.params;
  try {
    const pessoa = await Pessoa.findByPk(id);
    if (!pessoa) {
      return res.status(404).json({ error: 'pessoa não encontrada.' });
    }
    await pessoa.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir pessoa.' });
  }
}

module.exports = {
  getAllPessoas,
  getPessoaById,
  createPessoa,
  updatePessoa,
  deletePessoa,
};
