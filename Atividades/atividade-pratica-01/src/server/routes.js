const express = require("express");
const routes = express.Router();

const estadosRoutes = require('./routes/estados');
const cidadesRoutes = require('./routes/cidades');
const tipos_sanguineosRoutes = require('./routes/tipos_sanguineos');
const locais_coletaRoutes = require('./routes/locais_coleta');
const doacoesRoutes = require('./routes/doacoes');
const pessoasRoutes = require('./routes/pessoas');
//const mainRoutes = require('./routes/main');

routes.use('/estados', estadosRoutes);
routes.use('/cidades', cidadesRoutes);
routes.use('/tipos_sanguineos', tipos_sanguineosRoutes);
routes.use('./locais_coleta', locais_coletaRoutes);
routes.use('./doacoes', doacoesRoutes);
routes.use('./pessoas', pessoasRoutes);

module.exports = routes;