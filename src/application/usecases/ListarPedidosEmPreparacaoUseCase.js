class ListarPedidosEmPreparacaoUseCase {
  constructor(pedidoRepository) {
    this.pedidoRepository = pedidoRepository;
  }

  async execute() {
    return await this.pedidoRepository.listarEmPreparacao();
  }
}

module.exports = ListarPedidosEmPreparacaoUseCase;