const Sequelize = require('sequelize');
const database = require('../database/db');
const Pessoas = require('./pessoas')

const Tipos_sanguineos = database.define('tipos_sanguineos',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tipo:{
        type: Sequelize.STRING(2),
        allowNull: false
    },
    fator:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

Tipos_sanguineos.associate = (models) => { 
        Tipos_sanguineos.hasMany(Pessoas,{
        foreignKey: 'pessoa_id'});
  };


module.exports = Tipos_sanguineos;