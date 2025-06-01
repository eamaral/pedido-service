// tests/usecases/buscarPedido.usecase.test.js
const BuscarPedidoUseCase = require('../../src/application/usecases/BuscarPedidoUseCase');

describe('BuscarPedidoUseCase', () => {
  const mockRepo = {
    findById: jest.fn()
  };

  const usecase = new BuscarPedidoUseCase(mockRepo);

  it('deve retornar o pedido se encontrado', async () => {
    const pedidoMock = { id: '123', clienteId: '111', itens: [] };
    mockRepo.findById.mockResolvedValue(pedidoMock);

    const result = await usecase.execute('123');

    expect(mockRepo.findById).toHaveBeenCalledWith('123');
    expect(result).toEqual(pedidoMock);
  });

  it('deve lançar erro se o pedido não for encontrado', async () => {
    mockRepo.findById.mockResolvedValue(null);

    await expect(usecase.execute('999')).rejects.toThrow('Pedido não encontrado');
  });
});
