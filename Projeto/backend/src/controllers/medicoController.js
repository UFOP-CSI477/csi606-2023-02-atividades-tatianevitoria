const Medico = require('../models/medico');
const database = require('../database/db');

async () => {await database.sync()};

async function getAllMedicos(req, res) {
    try {
      const medicos = await Medico.findAll();
      res.json(medicos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar Medico.' });
    }
  }
  
  async function getMedicoById(req, res) {
    const { id } = req.params;
    try {
      const medico = await Medico.findByPk(id);
      if (!medico) {
        return res.status(404).json({ error: 'Medico não encontrada.' });
      }
      res.json(medico);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar Medico por ID.' });
    }
  }
  
  async function createMedico(req, res) {
    const { nome, especialidade, agenda_id } = req.body;
    try {
      const novoMedico = await Medico.create({ nome, especialidade, agenda_id });
      res.status(201).json(novoMedico);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar Medico.' });
    }
  }
 
  async function updateMedico(req, res) {
    const { id } = req.params;
    const { nome, especialidade, agenda_id } = req.body;
    try {
      const medico = await Medico.findByPk(id);
      if (!medico) {
        return res.status(404).json({ error: 'Medico não encontrada.' });
      }
      await medico.update({ nome, especialidade, agenda_id });
      res.json(medico);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar Medico.' });
    }
  }
  

  async function deleteMedico(req, res) {
    const { id } = req.params;
    try {
        const medico = await Medico.findByPk(id);
        if (!medico) {
        return res.status(404).json({ error: 'Medico não encontrada.' });
      }
      await medico.destroy();
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir Medico.' });
    }
  }
  
  module.exports = {
    getAllMedicos,
    getMedicoById,
    createMedico,
    updateMedico,
    deleteMedico,
  };
