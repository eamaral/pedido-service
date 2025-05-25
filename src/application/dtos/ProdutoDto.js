class ProdutoDto {
    constructor({ id, nome, descricao, preco, categoria, imagem }) {
      this.id = id
      this.nome = nome
      this.descricao = descricao
      this.preco = preco
      this.categoria = categoria
      this.imagem = imagem
    }
  }
  module.exports = ProdutoDto
  