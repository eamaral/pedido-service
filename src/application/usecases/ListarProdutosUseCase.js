class ListarProdutosUseCase {
  constructor(produtoRepository) {
    this.produtoRepository = produtoRepository;
  }

  async execute() {
    return await this.produtoRepository.findAll();
  }

  async findByCategory(categoria) {
    return await this.produtoRepository.findByCategory(categoria);
  }
}

module.exports = ListarProdutosUseCase;
