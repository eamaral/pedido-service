class RemoverProdutoUseCase {
  constructor(produtoRepository) {
    this.produtoRepository = produtoRepository;
  }

  async execute(id) {
    return await this.produtoRepository.deleteById(id);
  }
}

module.exports = RemoverProdutoUseCase;
