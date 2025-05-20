const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../infrastructure/database/sequelize');

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
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Recebido', 'Em Preparação', 'Pronto para Retirada', 'Finalizado'),
    defaultValue: 'Recebido',
  },
  qrCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'pedidos',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Pedido;
