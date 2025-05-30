const { sequelize } = require('./sequelize');
const Produto = require('../../domain/entities/Produto');
const Pedido = require('../../domain/entities/Pedido');

module.exports = {
  sequelize,
  Produto,
  Pedido
};
