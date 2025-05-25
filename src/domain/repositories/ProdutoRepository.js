const Produto = require('../entities/Produto');

class ProdutoRepository {
  async findAll() {
    return await Produto.findAll();
  }

  async findById(id) {
    return await Produto.findByPk(id);
  }

  async findByCategory(categoria) {
    return await Produto.findAll({ where: { categoria } });
  }

  async create(produtoData) {
    try {
      console.log('[REPOSITÓRIO PRODUTO] Dados recebidos para salvar no banco:', produtoData);
      const produto = await Produto.create(produtoData);
      console.log('[REPOSITÓRIO PRODUTO] Produto salvo no banco:', produto);
      return produto;
    } catch (error) {
      console.error('[REPOSITÓRIO PRODUTO] Erro ao salvar produto no banco:', error.message);
      throw error;
    }
  }

  async updateById(id, produtoData) {
    await Produto.update(produtoData, { where: { id } });
    return this.findById(id);
  }

  async deleteById(id) {
    return await Produto.destroy({ where: { id } });
  }
}

module.exports = ProdutoRepository;
