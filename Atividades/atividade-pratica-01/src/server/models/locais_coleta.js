const Sequelize = require('sequelize');
const database = require('../database/db');
const Cidades = require('./cidades');
const Doacoes = require('./doacoes');

const Locais_coleta = database.define('locais_coleta',{
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
    rua:{
        type: Sequelize.STRING,
        allowNull: false
    },
    numero:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    complemento:{
        type: Sequelize.STRING,
        allowNull: false
    },
    cidade_id:{ 
        type: Sequelize.INTEGER,
        allowNull: false, 
        foreignKey: true,
        references: {
            model: 'cidades',
            key: 'id',
        }
    }
});

Locais_coleta.associate = (models) => {
    // A chave estrangeira da Tabela Locais coleta pertence à Tabela Cidades
    Locais_coleta.belongsTo(Cidades, 
        {foreignKey: 'cidade_id'});
};

Locais_coleta.associate = (models) => { 
    Locais_coleta.hasMany(Doacoes,{
        foreignKey: 'doacoes_id'});
  };

module.exports = Locais_coleta;