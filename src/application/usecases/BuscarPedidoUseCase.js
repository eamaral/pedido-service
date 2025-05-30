class BuscarPedidoUseCase {
  constructor(pedidoRepository) {
    this.pedidoRepository = pedidoRepository;
  }

  async execute(pedidoId) {
    const pedido = await this.pedidoRepository.findById(pedidoId);
    if (!pedido) throw new Error('Pedido não encontrado');
    return pedido;
  }
}

module.exports = BuscarPedidoUseCase;
