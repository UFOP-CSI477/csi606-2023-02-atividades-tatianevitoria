const Sequelize = require('sequelize');
const database = require('../database/db');
const Estados = require('./estados');
const Locais_coleta = require('./locais_coleta');

const Cidades = database.define('cidades',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    estado_id:{ 
        type: Sequelize.INTEGER,
        allowNull: false, 
        foreignKey: true,
        references: {
            model: 'estados',
            key: 'id',
        }
    }

});

Cidades.associate = (models) => {
    // A chave estrangeira da Tabela Cidades pertence à Tabela Estados
    Cidades.belongsTo(Estados, {
        foreignKey: 'estado_id'});
};

Cidades.associate = (models) => { 
    Cidades.hasMany(Locais_coleta,
      { foreignKey: 'local_id' });
  };

module.exports = Cidades;
