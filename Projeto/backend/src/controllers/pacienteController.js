const Paciente = require('../models/paciente');
const database = require('../database/db');

async () => {await database.sync()};
async function getAllPacientes(req, res) {
    try {
      const pacientes = await Paciente.findAll();
      res.json(pacientes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar Paciente.' });
    }
  }
  
  async function getPacienteById(req, res) {
    const { id } = req.params;
    try {
      const paciente = await Paciente.findByPk(id);
      if (!paciente) {
        return res.status(404).json({ error: 'Paciente não encontrada.' });
      }
      res.json(pacientea);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar Paciente por ID.' });
    }
  }
  
  async function createPaciente(req, res) {
    const { nome, cpf } = req.body;
    try {
      const novoPaciente = await Paciente.create({ nome, cpf });
      res.status(201).json(novoPaciente);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar Paciente.' });
    }
  }
 
  async function updatePaciente(req, res) {
    const { id } = req.params;
    const { nome, cpf } = req.body;
    try {
      const paciente = await Paciente.findByPk(id);
      if (!paciente) {
        return res.status(404).json({ error: 'Paciente não encontrada.' });
      }
      await paciente.update({ nome, cpf });
      res.json(paciente);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar Paciente.' });
    }
  }
  

  async function deletePaciente(req, res) {
    const { id } = req.params;
    try {
        const paciente = await Paciente.findByPk(id);
        if (!paciente) {
        return res.status(404).json({ error: 'Paciente não encontrada.' });
      }
      await paciente.destroy();
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir Paciente.' });
    }
  }

// Exportar todas as funções dos controllers
module.exports = pacienteController = {
    getAllPacientes,
    getPacienteById,
    createPaciente,
    updatePaciente,
    deletePaciente,
};
