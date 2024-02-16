const Sequelize = require('sequelize')
const database = require('../database/db');
const Agenda = require('./agenda');
const Paciente = require('./paciente');
const Medico = require('./medico');


const Consulta = database.define('consultas', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    agenda_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
            model: 'agendas',
            key: 'id',
        }
    },
    paciente_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
            model: 'pacientes',
            key: 'id',
        }
    },
    medico_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
            model: 'medicos',
            key: 'id',
        }
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Consulta.associate = (models) => {
    Consulta.belongsTo(Agenda, { 
        foreignKey: 'agenda_id' });

    Consulta.belongsTo(Medico, { foreignKey: 'medico_id' });

    Consulta.belongsTo(Paciente, { 
        foreignKey: 'paciente_id' });
};

module.exports = Consulta;
