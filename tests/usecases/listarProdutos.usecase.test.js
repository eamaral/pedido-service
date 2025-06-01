// tests/usecases/listarProdutos.usecase.test.js
const ListarProdutosUseCase = require('../../src/application/usecases/ListarProdutosUseCase');

describe('ListarProdutosUseCase', () => {
  it('deve retornar todos os produtos', async () => {
    const produtos = [{ id: 1 }, { id: 2 }];
    const mockRepo = {
      findAll: jest.fn().mockResolvedValue(produtos)
    };

    const usecase = new ListarProdutosUseCase(mockRepo);
    const result = await usecase.execute();

    expect(mockRepo.findAll).toHaveBeenCalled();
    expect(result).toEqual(produtos);
  });

  it('deve retornar produtos por categoria', async () => {
    const categoria = 'bebidas';
    const produtos = [{ id: 3, categoria: 'bebidas' }];
    const mockRepo = {
      findByCategory: jest.fn().mockResolvedValue(produtos)
    };

    const usecase = new ListarProdutosUseCase(mockRepo);
    const result = await usecase.findByCategory(categoria);

    expect(mockRepo.findByCategory).toHaveBeenCalledWith(categoria);
    expect(result).toEqual(produtos);
  });
});
