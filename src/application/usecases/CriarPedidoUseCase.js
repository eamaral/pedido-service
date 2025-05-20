const PedidoRepository = require('../../domain/repositories/PedidoRepository');
const PedidoDto = require('../dtos/PedidoDto');

class CriarPedidoUseCase {
  constructor() {
    this.pedidoRepository = new PedidoRepository();
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
      const produto = this.mockBuscarProduto(item.produtoId);
      if (!produto) {
        throw new Error(`Produto com ID ${item.produtoId} não encontrado (mock).`);
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

  mockBuscarProduto(produtoId) {
    const mockProdutos = {
      '01': { id: '01', nome: 'Hamburguer', preco: 15.99 },
      '02': { id: '02', nome: 'Batata Frita', preco: 7.5 },
      '03': { id: '03', nome: 'Refrigerante', preco: 5.0 },
      '04': { id: '04', nome: 'Sorvete', preco: 4.5 },
    };

    return mockProdutos[produtoId] || null;
  }
}

module.exports = CriarPedidoUseCase;
