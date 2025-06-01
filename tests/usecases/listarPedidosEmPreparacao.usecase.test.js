// tests/usecases/listarPedidosEmPreparacao.usecase.test.js
const ListarPedidosEmPreparacaoUseCase = require('../../src/application/usecases/ListarPedidosEmPreparacaoUseCase');

describe('ListarPedidosEmPreparacaoUseCase', () => {
  it('deve retornar a lista de pedidos em preparação', async () => {
    const pedidosEmPreparacao = [
      { id: 1, status: 'Em Preparação' },
      { id: 2, status: 'Em Preparação' }
    ];

    const mockRepo = {
      listarEmPreparacao: jest.fn().mockResolvedValue(pedidosEmPreparacao)
    };

    const usecase = new ListarPedidosEmPreparacaoUseCase(mockRepo);
    const result = await usecase.execute();

    expect(mockRepo.listarEmPreparacao).toHaveBeenCalled();
    expect(result).toEqual(pedidosEmPreparacao);
  });
});
