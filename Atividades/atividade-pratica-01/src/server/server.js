//const express = require("express");
const express = require('express');
//const bodyParser = require("body-parser");
const db = require("./database/db.js");
//const routes = require('./routes/main.js');
const estadosRouter = require('./routes/estados.js');
const cidadesRouter = require('./routes/cidades.js');
const tipo_sanguineosRouter = require('./routes/tipos_sanguineos.js');
const locais_coletaRouter = require('./routes/locais_coleta.js');
const doacoesRouter = require('./routes/doacoes.js');
const pessoasRouter = require('./routes/pessoas.js');

const PORT= 4444;
const server = express();

server.use(express.json());
server.use(estadosRouter);
server.use(cidadesRouter);
server.use(tipo_sanguineosRouter);
server.use(locais_coletaRouter);
server.use(doacoesRouter);
server.use(pessoasRouter);

db.sync(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`));

server.listen(PORT, () => {
  console.log(`[SERVER] is running on port ${PORT}`);
});
