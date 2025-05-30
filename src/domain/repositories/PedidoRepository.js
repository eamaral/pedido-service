const { Pedido } = require('../../infrastructure/database');

class PedidoRepository {
  async findAllByStatus(status) {
    return Pedido.findAll({ where: { status } });
  }

  async findById(id) {
    return Pedido.findByPk(id);
  }

  async create({ clienteId, itens, total }) {
    return Pedido.create({ clienteId, itens, total, status: 'Recebido' });
  }

  async updateStatus(id, novoStatus) {
    const pedido = await Pedido.findByPk(id);
    if (!pedido) return null;
    pedido.status = novoStatus;
    await pedido.save();
    return pedido;
  }
}

module.exports = PedidoRepository;
