const Sequelize = require('sequelize');
const database = require('../database/db');
const Locais_doacao = require('./locais_coleta');
const Pessoas = require ('./pessoas');

const Doacoes = database.define('doacoes',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    pessoa_id:{
        type: Sequelize.INTEGER,
        allowNull: false, 
        foreignKey: true,
        references: {
            model: 'pessoas',
            key: 'id',
        }
    },
    local_id:{ 
        type: Sequelize.INTEGER,
        allowNull: false, 
        foreignKey: true,
        references: {
            model: 'locais_coleta',
            key: 'id',
        }
    },
    data:{
        type: Sequelize.DATE,
        allowNull: false
    }

});

Doacoes.associate = (models) => {
    // A chave estrangeira da Tabela Doacoes pertence à Tabela Pessoas
    Doacoes.belongsTo(Pessoas, {
        foreignKey: 'pessoa_id'});
    // A chave estrangeira da Tabela Doacoes pertence à Tabela Locais_doacao
    Doacoes.belongsTo(Locais_doacao, {
        foreignKey: 'local_id'});
    
};


module.exports = Doacoes;
