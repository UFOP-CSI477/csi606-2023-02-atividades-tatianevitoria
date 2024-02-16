const Agenda = require('../models/agenda');
const database = require('../database/db');

async () => {await database.sync()};

async function getAllAgendas(req, res) {
    try {
      const agendas = await Agenda.findAll();
      res.json(agendas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar agenda.' });
    }
  }
  
  async function getAgendaById(req, res) {
    const { id } = req.params;
    try {
      const agenda = await Agenda.findByPk(id);
      if (!agenda) {
        return res.status(404).json({ error: 'Agenda não encontrada.' });
      }
      res.json(agenda);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar Agenda por ID.' });
    }
  }
  
  async function createAgenda(req, res) {
    const { data_agenda, horario } = req.body;
    try {
      const novaAgenda = await Agenda.create({ data_agenda, horario });
      res.status(201).json(novaAgenda);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar Agenda.' });
    }
  }
 
  async function updateAgenda(req, res) {
    const { id } = req.params;
    const { data_agenda, horario } = req.body;
    try {
      const agenda = await Agenda.findByPk(id);
      if (!agenda) {
        return res.status(404).json({ error: 'Agenda não encontrada.' });
      }
      await agenda.update({ data_agenda, horario });
      res.json(agenda);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar Agenda.' });
    }
  }
  

  async function deleteAgenda(req, res) {
    const { id } = req.params;
    try {
        const agenda = await Agenda.findByPk(id);
        if (!agenda) {
        return res.status(404).json({ error: 'Agenda não encontrada.' });
      }
      await agenda.destroy();
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir Agenda.' });
    }
  }
  
  module.exports = {
    getAllAgendas,
    getAgendaById,
    createAgenda,
    updateAgenda,
    deleteAgenda,
  };
  