const ProdutoRepository = require('../../domain/repositories/ProdutoRepository')

class ListarProdutosUseCase {
  constructor() {
    this.produtoRepository = new ProdutoRepository();
  }

  async execute() {
    return await this.produtoRepository.findAll();
  }
}

module.exports = ListarProdutosUseCase;
