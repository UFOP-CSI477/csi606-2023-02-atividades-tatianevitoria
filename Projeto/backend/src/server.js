const express = require('express');
const db = require("./database/db.js");
const pacienteRouter = require('./routes/paciente.js');
const medicoRouter = require('./routes/medico.js');
const agendaRouter = require('./routes/agenda.js');
const consultaRouter = require('./routes/consulta.js');
const cors = require('cors');

const PORT = 4444;
const server = express();

server.use(express.json());
server.use(cors());

server.use(pacienteRouter);
server.use(medicoRouter);
server.use(agendaRouter);
server.use(consultaRouter);


db.sync(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`));

server.listen(PORT, () => {
  console.log(`[SERVER] is running on port ${PORT}`);
});
