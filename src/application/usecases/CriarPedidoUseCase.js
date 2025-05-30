class CriarPedidoUseCase {
  constructor(pedidoRepository) {
    this.pedidoRepository = pedidoRepository;
  }

  async execute({ clienteId, itens }) {
    if (!clienteId || !itens || !Array.isArray(itens) || itens.length === 0) {
      throw new Error('clienteId e itens válidos são obrigatórios');
    }

    const total = itens.reduce((acc, item) => acc + (item.preco || 0) * (item.quantidade || 1), 0);
    return await this.pedidoRepository.create({ clienteId, itens, total });
  }
}

module.exports = CriarPedidoUseCase;
