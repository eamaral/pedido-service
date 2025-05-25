const CriarProdutoUseCase   = require('../usecases/CriarProdutoUseCase')
const ListarProdutosUseCase = require('../usecases/ListarProdutosUseCase')
const ProdutoDto            = require('../dtos/ProdutoDto')

const criarProdutoUC   = new CriarProdutoUseCase()
const listarProdutosUC = new ListarProdutosUseCase()

module.exports = {
  criarProduto: async (req, res) => {
    try {
      const p    = await criarProdutoUC.execute(req.body)
      const json = p.toJSON ? p.toJSON() : p
      res.status(201).json(new ProdutoDto(json))
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  },

  listarProdutos: async (req, res) => {
    try {
      const list = await listarProdutosUC.execute()
      const arr  = list.map(p => {
        const j = p.toJSON ? p.toJSON() : p
        return new ProdutoDto(j)
      })
      res.status(200).json(arr)
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  },

  listarProdutosPorCategoria: async (req, res) => {
    try {
      const list = await listarProdutosUC.produtoRepository.findByCategory(req.params.categoria)
      const arr  = list.map(p => {
        const j = p.toJSON ? p.toJSON() : p
        return new ProdutoDto(j)
      })
      res.status(200).json(arr)
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  },

  editarProduto: async (req, res) => {
    try {
      const p    = await listarProdutosUC.produtoRepository.updateById(req.params.id, req.body)
      const j    = p.toJSON ? p.toJSON() : p
      res.status(200).json(new ProdutoDto(j))
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  },

  removerProduto: async (req, res) => {
    try {
      await listarProdutosUC.produtoRepository.deleteById(req.params.id)
      res.status(200).json({ message: 'Produto removido com sucesso.' })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
}
