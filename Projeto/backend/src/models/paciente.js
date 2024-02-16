const Sequelize = require('sequelize')
const database = require('../database/db');
const Consulta = require('./consulta');

const Paciente = database.define('pacientes', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Paciente.associate = (models) =>{
    Paciente.hasMany(Consulta, {foreignKey: 'consulta_id'})
}

module.exports = Paciente;
