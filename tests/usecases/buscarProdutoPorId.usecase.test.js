// tests/usecases/buscarProdutoPorId.usecase.test.js
const BuscarProdutoPorIdUseCase = require('../../src/application/usecases/BuscarProdutoPorIdUseCase');

describe('BuscarProdutoPorIdUseCase', () => {
  const mockRepo = {
    buscarPorId: jest.fn()
  };

  const usecase = new BuscarProdutoPorIdUseCase(mockRepo);

  it('deve retornar o produto se encontrado', async () => {
    const produtoMock = { id: 'abc123', nome: 'Hamburguer' };
    mockRepo.buscarPorId.mockResolvedValue(produtoMock);

    const result = await usecase.execute('abc123');

    expect(mockRepo.buscarPorId).toHaveBeenCalledWith('abc123');
    expect(result).toEqual(produtoMock);
  });

  it('deve retornar null se o produto não existir', async () => {
    mockRepo.buscarPorId.mockResolvedValue(null);

    const result = await usecase.execute('invalido');

    expect(result).toBeNull();
  });
});
