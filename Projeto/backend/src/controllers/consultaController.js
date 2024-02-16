const Consulta = require('../models/consulta');
const database = require('../database/db');

async () => {await database.sync()};

async function getAllConsultas(req, res) {
    try {
      const consultas = await Consulta.findAll();
      res.json(consultas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar consulta.' });
    }
  }
  
  async function getConsultaById(req, res) {
    const { id } = req.params;
    try {
      const consulta = await Consulta.findByPk(id);
      if (!consulta) {
        return res.status(404).json({ error: 'Consulta não encontrada.' });
      }
      res.json(consulta);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar Consulta por ID.' });
    }
  }
  
  async function createConsulta(req, res) {
    const { agenda_id, paciente_id, medico_id, status } = req.body;
    try {
      const novaConsulta = await Consulta.create({ agenda_id, paciente_id, medico_id, status });
      res.status(201).json(novaConsulta);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar Consulta.' });
    }
  }
 
  async function updateConsulta(req, res) {
    const { id } = req.params;
    const { agenda_id, paciente_id, medico_id, status } = req.body;
    try {
      const consulta = await Consulta.findByPk(id);
      if (!consulta) {
        return res.status(404).json({ error: 'Consulta não encontrada.' });
      }
      await consulta.update({ agenda_id, paciente_id, medico_id, status });
      res.json(consulta);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar Consulta.' });
    }
  }
  

  async function deleteConsulta(req, res) {
    const { id } = req.params;
    try {
        const consulta = await Consulta.findByPk(id);
        if (!consulta) {
        return res.status(404).json({ error: 'Consulta não encontrada.' });
      }
      await consulta.destroy();
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir Consulta.' });
    }
  }
  
  module.exports = {
    getAllConsultas,
    getConsultaById,
    createConsulta,
    updateConsulta,
    deleteConsulta,
  };
