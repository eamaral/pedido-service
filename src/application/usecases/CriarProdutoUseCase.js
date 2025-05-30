class CriarProdutoUseCase {
  constructor(produtoRepository) {
    this.produtoRepository = produtoRepository;
  }

  async execute(produtoData) {
    return await this.produtoRepository.create(produtoData);
  }
}

module.exports = CriarProdutoUseCase;