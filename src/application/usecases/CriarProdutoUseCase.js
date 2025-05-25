const ProdutoRepository = require('../../domain/repositories/ProdutoRepository');

class CriarProdutoUseCase {
  constructor() {
    this.produtoRepository = new ProdutoRepository();
  }

  async execute(produtoData) {
    return await this.produtoRepository.create(produtoData);
  }
}

module.exports = CriarProdutoUseCase;
