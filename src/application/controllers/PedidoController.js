const CriarPedidoUseCase = require('../usecases/CriarPedidoUseCase');
const AtualizarStatusPedidoUseCase = require('../usecases/AtualizarStatusPedidoUseCase');
const PedidoRepository = require('../../domain/repositories/PedidoRepository');

const criarPedidoUseCase = new CriarPedidoUseCase();
const atualizarStatusUseCase = new AtualizarStatusPedidoUseCase();
const pedidoRepository = new PedidoRepository();

class PedidoController {
  async criar(req, res) {
    try {
      const pedido = await criarPedidoUseCase.execute(req.body);
      return res.status(201).json(pedido);
    } catch (error) {
      console.error('Erro ao criar pedido:', error.message);
      return res.status(400).json({ error: error.message });
    }
  }

  async atualizarStatus(req, res) {
    try {
      const { pedidoId, novoStatus } = req.body;
      const pedidoAtualizado = await atualizarStatusUseCase.execute(pedidoId, novoStatus);
      return res.status(200).json(pedidoAtualizado);
    } catch (error) {
      console.error('Erro ao atualizar status do pedido:', error.message);
      return res.status(400).json({ error: error.message });
    }
  }

  async buscarPorId(req, res) {
    try {
      const pedido = await pedidoRepository.findById(req.params.id);
      if (!pedido) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }
      return res.status(200).json(pedido);
    } catch (error) {
      console.error('Erro ao buscar pedido:', error.message);
      return res.status(500).json({ error: 'Erro interno ao buscar pedido' });
    }
  }

  async listarEmPreparacao(req, res) {
    try {
      const pedidos = await pedidoRepository.findAllByStatus('Em Preparação');
      return res.status(200).json(pedidos);
    } catch (error) {
      console.error('Erro ao listar pedidos em preparação:', error.message);
      return res.status(500).json({ error: 'Erro ao listar pedidos' });
    }
  }
}

module.exports = new PedidoController();
