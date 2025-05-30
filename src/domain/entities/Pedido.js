// src/domain/entities/Pedido.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../infrastructure/database/sequelize');

const Pedido = sequelize.define('Pedido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  clienteId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  itens: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  qrCode: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'pedidos',
  underscored: true,
  timestamps: true,
});

module.exports = Pedido;
