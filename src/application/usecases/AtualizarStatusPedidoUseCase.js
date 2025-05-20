const PedidoRepository = require('../../domain/repositories/PedidoRepository');

class AtualizarStatusPedidoUseCase {
  constructor() {
    this.pedidoRepository = new PedidoRepository();
  }

  async execute(pedidoId, novoStatus) {
    const pedido = await this.pedidoRepository.findById(pedidoId);
    if (!pedido) {
      throw new Error('Pedido não encontrado.');
    }

    return await this.pedidoRepository.updateStatus(pedidoId, novoStatus);
  }
}

module.exports = AtualizarStatusPedidoUseCase;
