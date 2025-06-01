// tests/usecases/atualizarStatusPedido.usecase.test.js
const AtualizarStatusPedidoUseCase = require('../../src/application/usecases/AtualizarStatusPedidoUseCase');

describe('AtualizarStatusPedidoUseCase', () => {
  const mockRepo = {
    findById: jest.fn(),
    updateStatus: jest.fn()
  };

  const usecase = new AtualizarStatusPedidoUseCase(mockRepo);

  it('deve atualizar o status do pedido se ele existir', async () => {
    const pedidoId = '1';
    const novoStatus = 'Finalizado';

    mockRepo.findById.mockResolvedValue({ id: pedidoId, status: 'Pendente' });
    mockRepo.updateStatus.mockResolvedValue({ id: pedidoId, status: novoStatus });

    const result = await usecase.execute(pedidoId, novoStatus);

    expect(mockRepo.findById).toHaveBeenCalledWith(pedidoId);
    expect(mockRepo.updateStatus).toHaveBeenCalledWith(pedidoId, novoStatus);
    expect(result.status).toBe(novoStatus);
  });

  it('deve lançar erro se o pedido não for encontrado', async () => {
    mockRepo.findById.mockResolvedValue(null);

    await expect(usecase.execute('99', 'Pronto')).rejects.toThrow('Pedido não encontrado');
  });
});
