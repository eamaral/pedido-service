const PedidoRepository = require('../../domain/repositories/PedidoRepository');
const ProdutoRepository = require('../../domain/repositories/ProdutoRepository');
const PedidoDto = require('../dtos/PedidoDto');

class CriarPedidoUseCase {
  constructor() {
    this.pedidoRepository = new PedidoRepository();
    this.produtoRepository = new ProdutoRepository();
  }

  async execute({ itens, clienteId }) {
    if (!itens || itens.length === 0) {
      throw new Error('Nenhum item foi fornecido para o pedido.');
    }

    if (!clienteId) {
      throw new Error('O clienteId é obrigatório para criar um pedido.');
    }

    let total = 0;
    const itensValidados = [];

    for (const item of itens) {
      const produto = await this.produtoRepository.findById(item.produtoId);
      if (!produto) {
        throw new Error(`Produto com ID ${item.produtoId} não encontrado.`);
      }

      itensValidados.push({
        produtoId: produto.id,
        nome: produto.nome,
        quantidade: item.quantidade,
        preco: produto.preco,
      });

      total += produto.preco * item.quantidade;
    }

    const pedido = await this.pedidoRepository.create({
      clienteId,
      itens: itensValidados,
      total,
      status: 'Recebido',
    });

    return new PedidoDto(pedido);
  }
}

module.exports = CriarPedidoUseCase;
