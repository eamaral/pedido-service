const { Produto } = require('../../infrastructure/database');

class ProdutoRepository {
  async findAll() {
    return Produto.findAll();
  }

  async findById(id) {
    return Produto.findByPk(id);
  }

  async create(data) {
    return Produto.create(data);
  }

  async updateById(id, data) {
    await Produto.update(data, { where: { id } });
    return this.findById(id);
  }

  async deleteById(id) {
    return Produto.destroy({ where: { id } });
  }

  async findByCategory(categoria) {
    return Produto.findAll({ where: { categoria } });
  }
}

module.exports = ProdutoRepository;
