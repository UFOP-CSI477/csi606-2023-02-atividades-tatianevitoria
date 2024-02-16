const Sequelize = require('sequelize')
const database = require('../database/db');
const Agenda = require('./agenda');
//const Consulta = require('./consulta');

const Medico = database.define('medicos', {
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
    especialidade: {
        type: Sequelize.STRING
    },
    agenda_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
            model: 'agendas',
            key: 'id',
        }
    }
});

Medico.associate = (models) => {
    Medico.belongsTo(Agenda, { foreignKey: 'agenda_id' });
   // Medico.hasMany(Consulta, {foreignKey: 'consulta_id'});
};

module.exports = Medico;
