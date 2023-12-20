const Sequelize = require('sequelize');
const database = require('../database/db');
const Cidades = require('./cidades');

const Estados = database.define('estados',{
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
    sigla:{
        type: Sequelize.STRING(2),
        allowNull: false
    }
});

Estados.associate = (models) => { 
    Estados.hasMany(Cidades,{
        foreignKey: 'cidade_id'});
  };

module.exports = Estados;