const ProdutoRepository = require('../../domain/repositories/ProdutoRepository');
const ProdutoDto = require('../dtos/ProdutoDto');

const CriarProdutoUseCase = require('../usecases/CriarProdutoUseCase');
const ListarProdutosUseCase = require('../usecases/ListarProdutosUseCase');
const EditarProdutoUseCase = require('../usecases/EditarProdutoUseCase');
const RemoverProdutoUseCase = require('../usecases/RemoverProdutoUseCase');

const produtoRepo = new ProdutoRepository();

const criarProdutoUC = new CriarProdutoUseCase(produtoRepo);
const listarProdutosUC = new ListarProdutosUseCase(produtoRepo);
const editarProdutoUC = new EditarProdutoUseCase(produtoRepo);
const removerProdutoUC = new RemoverProdutoUseCase(produtoRepo);

module.exports = {
  criarProduto: async (req, res) => {
    try {
      const produto = await criarProdutoUC.execute(req.body);
      res.status(201).json(new ProdutoDto(produto.toJSON()));
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  listarProdutos: async (_req, res) => {
    try {
      const list = await listarProdutosUC.execute();
      const dtoList = list.map(p => new ProdutoDto(p.toJSON()));
      res.status(200).json(dtoList);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  listarProdutosPorCategoria: async (req, res) => {
    try {
      const list = await listarProdutosUC.findByCategory(req.params.categoria);
      const dtoList = list.map(p => new ProdutoDto(p.toJSON()));
      res.status(200).json(dtoList);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  editarProduto: async (req, res) => {
    try {
      const produto = await editarProdutoUC.execute(req.params.id, req.body);
      res.status(200).json(new ProdutoDto(produto.toJSON()));
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  removerProduto: async (req, res) => {
    try {
      await removerProdutoUC.execute(req.params.id);
      res.status(200).json({ message: 'Produto removido com sucesso.' });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
};
