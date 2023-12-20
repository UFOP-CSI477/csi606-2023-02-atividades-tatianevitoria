const Tipos_sanguineos = require('../models/tipos_sanguineos');
const database = require('../database/db');

async () => {await database.sync()};

// Obtém todos os Tipos_sanguineoss
async function getAllTipos_sanguineos(req, res) {
  try {
    const tipo_sanguineos = await Tipos_sanguineos.findAll();
    res.json(tipo_sanguineos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar Tipos_sanguineos.' });
  }
}

// Obtém um Tipo_sanguineo por ID
async function getTipo_sanguineoById(req, res) {
  const { id } = req.params;
  try {
    const tipo_sanguineo = await Tipos_sanguineos.findByPk(id);
    if (!tipo_sanguineo) {
      return res.status(404).json({ error: 'Tipo_sanguineo não encontrado.' });
    }
    res.json(tipo_sanguineo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar Tipo_sanguineo por ID.' });
  }
}

// Cria um novo Tipo_sanguineo
async function createTipo_sanguineo(req, res) {
  const { tipo, fator } = req.body;
  try {
    const novoTipo_sanguineo = await Tipos_sanguineos.create({ tipo, fator });
    res.status(201).json(novoTipo_sanguineo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar Tipos_sanguineos.' });
  }
}

// Atualiza um Tipo_sanguineo por ID
async function updateTipo_sanguineo(req, res) {
  const { id } = req.params;
  const { tipo, fator } = req.body;
  try {
    const tipo_sanguineo = await Tipos_sanguineos.findByPk(id);
    if (!tipo_sanguineo) {
      return res.status(404).json({ error: 'Tipo_sanguineo não encontrado.' });
    }
    await tipo_sanguineo.update({ tipo, fator });
    res.json(tipo_sanguineo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar Tipo_sanguineo.' });
  }
}

// Exclui um Tipo_sanguineo por ID
async function deleteTipo_sanguineo(req, res) {
  const { id } = req.params;
  try {
    const tipo_sanguineo = await Tipos_sanguineos.findByPk(id);
    if (!tipo_sanguineo) {
      return res.status(404).json({ error: 'Tipo_sanguineo não encontrado.' });
    }
    await tipo_sanguineo.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir Tipo_sanguineo.' });
  }
}

module.exports = {
  getAllTipos_sanguineos,
  getTipo_sanguineoById,
  createTipo_sanguineo,
  updateTipo_sanguineo,
  deleteTipo_sanguineo,
};
