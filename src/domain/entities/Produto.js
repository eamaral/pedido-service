const { DataTypes } = require('sequelize');
const { sequelize } = require('../../infrastructure/database/sequelize');
const { v4: uuidv4 } = require('uuid');

const Produto = sequelize.define('Produto', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: uuidv4,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.ENUM('Lanche', 'Acompanhamento', 'Bebida', 'Sobremesa'),
    allowNull: false,
  },
  imagem: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'produtos',
  timestamps: false,
});

module.exports = Produto;
