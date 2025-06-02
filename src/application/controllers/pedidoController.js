const PedidoRepository = require('../../domain/repositories/PedidoRepository');
const ClienteApiRepository = require('../../domain/repositories/ClienteApiRepository');
const PedidoDto = require('../dtos/PedidoDto');

const CriarPedidoUseCase = require('../usecases/CriarPedidoUseCase');
const BuscarPedidoUseCase = require('../usecases/BuscarPedidoUseCase');
const AtualizarStatusPedidoUseCase = require('../usecases/AtualizarStatusPedidoUseCase');

const pedidoRepo = new PedidoRepository();
const clienteRepo = new ClienteApiRepository();

const criarPedidoUC = new CriarPedidoUseCase(pedidoRepo);
const buscarPedidoUC = new BuscarPedidoUseCase(pedidoRepo);
const atualizarStatusUC = new AtualizarStatusPedidoUseCase(pedidoRepo);

exports.criar = async (req, res) => {
  try {
    const pedido = await criarPedidoUC.execute(req.body);
    res.status(201).json(new PedidoDto(pedido.toJSON()));
  } catch (err) {
    console.error('Erro ao criar pedido:', err);
    res.status(400).json({ error: err.message });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const pedido = await buscarPedidoUC.execute(req.params.pedidoId);
    res.status(200).json(new PedidoDto(pedido.toJSON()));
  } catch (err) {
    console.error('Erro ao buscar pedido:', err);
    res.status(404).json({ error: err.message });
  }
};

exports.listarEmPreparacao = async (_req, res) => {
  try {
    const pedidos = await pedidoRepo.findAllByStatus('Em Preparação');
    if (!pedidos.length) return res.status(404).json({ error: 'Nenhum pedido em preparação' });
    const result = pedidos.map(p => new PedidoDto(p.toJSON()));
    res.status(200).json(result);
  } catch (err) {
    console.error('Erro ao listar pedidos:', err);
    res.status(500).json({ error: 'Erro ao listar pedidos' });
  }
};

exports.atualizarStatus = async (req, res) => {
  try {
    const { pedidoId, novoStatus } = req.body;
    const atualizado = await atualizarStatusUC.execute(pedidoId, novoStatus);
    res.status(200).json(new PedidoDto(atualizado.toJSON()));
  } catch (err) {
    console.error('Erro ao atualizar status:', err);
    res.status(404).json({ error: err.message });
  }
};

exports.finalizarPedido = async (req, res) => {
  try {
    const { pedidoId } = req.body;
    const finalizado = await atualizarStatusUC.execute(pedidoId, 'Finalizado');

    const pedido = await buscarPedidoUC.execute(pedidoId);
    const cpf = pedido.clienteId;

    clienteRepo.setAuth(req.headers.authorization);
    console.log('[finalizarPedido] CPF do cliente:', cpf);

    const cliente = await clienteRepo.findByCPF(cpf);
    if (!cliente) {
      console.error('Cliente não encontrado ao finalizar pedido:', cpf);
      return res.status(404).json({ error: 'Cliente não encontrado para atualização de pontos' });
    }

    const cpfParaAtualizar = cliente.cpf || cliente.id;
    const pontosInfo = await clienteRepo.atualizarPontos(cpfParaAtualizar);

    res.status(200).json({ ...new PedidoDto(finalizado.toJSON()), ...pontosInfo });
  } catch (err) {
    console.error('Erro ao finalizar pedido:', err);
    res.status(500).json({ error: err.message });
  }
};
