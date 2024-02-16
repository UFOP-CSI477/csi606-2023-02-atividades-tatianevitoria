const Sequelize = require('sequelize')
const database = require('../database/db');
//const Consulta = require('./consulta');
//const Medico = require('./medico');

const Agenda = database.define('agendas', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    data_agenda: {
        type: Sequelize.DATE,
        allowNull: false
    },
    horario: {
        type: Sequelize.TIME,
        allowNull: false
    }
});
/*
Agenda.associate = (models) =>{
    Agenda.hasMany(Consulta, {foreignKey: 'consulta_id'});
    Agenda.hasMany(Medico, {foreignKey: 'medico_id'});
};*/

module.exports = Agenda;
