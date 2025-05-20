const Pedido = require('../entities/Pedido');

class PedidoRepository {
  async findById(id) {
    return await Pedido.findByPk(id);
  }

  async findAllByStatus(status) {
    return await Pedido.findAll({
      where: { status },
      order: [['created_at', 'ASC']],
    });
  }

  async create(pedidoData) {
    return await Pedido.create(pedidoData);
  }

  async update(pedidoData) {
    const { id, clienteId, total, status, qrCode } = pedidoData;

    await Pedido.update(
      { clienteId, total, status, qrCode },
      { where: { id } }
    );

    return this.findById(id);
  }

  async updateStatus(pedidoId, status) {
    await Pedido.update({ status }, { where: { id: pedidoId } });
    return this.findById(pedidoId);
  }
}

module.exports = PedidoRepository;
