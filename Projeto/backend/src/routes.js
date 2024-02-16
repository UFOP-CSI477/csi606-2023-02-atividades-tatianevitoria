const express = require("express");
const routes = express.Router();

const pacienteRoutes = require('./routes/paciente.js');
const medicoRoutes = require('./routes/medico.js');
const agendaRoutes = require('./routes/agenda.js');
const consultaRoutes =  require('./routes/consulta.js');

routes.use('/paciente', pacienteRoutes);
routes.use('/medico', medicoRoutes);
routes.use('/agenda', agendaRoutes);
routes.use('/consulta', consultaRoutes);

module.exports = routes;