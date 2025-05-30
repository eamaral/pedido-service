class EditarProdutoUseCase {
  constructor(produtoRepository) {
    this.produtoRepository = produtoRepository;
  }

  async execute(id, dadosAtualizados) {
    await this.produtoRepository.updateById(id, dadosAtualizados);
    return await this.produtoRepository.findById(id);
  }
}

module.exports = EditarProdutoUseCase;