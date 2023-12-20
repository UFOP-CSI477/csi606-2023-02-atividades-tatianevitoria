const Sequelize = require('sequelize');
const database = require('../database/db');
const Cidades = require('./cidades');
const Tipos_sanguineos = require('./tipos_sanguineos');
const Doacoes = require('./doacoes');

const Pessoas = database.define('pessoas',{
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
    rg:{
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
    },
    tipo_id:{ 
        type: Sequelize.INTEGER,
        allowNull: false, 
        foreignKey: true,
        references: {
            model: 'tipos_sanguineos',
            key: 'id',
        }
    }

});

Pessoas.associate = (models) => {
    // A chave estrangeira da Tabela Cidades pertence à Tabela Estados
    Pessoas.belongsTo(Cidades, {
        foreignKey: 'cidade_id'});
    Pessoas.belongsTo(Tipos_sanguineos, {
        foreignKey: 'tipo_id'});
};

Pessoas.associate = (models) => { 
    Pessoas.hasMany(Doacoes,
      { foreignKey: 'doacao_id' });
  };

module.exports = Pessoas;
