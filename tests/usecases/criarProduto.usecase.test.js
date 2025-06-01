// tests/usecases/criarProduto.usecase.test.js
const CriarProdutoUseCase = require('../../src/application/usecases/CriarProdutoUseCase');

describe('CriarProdutoUseCase', () => {
  const mockRepo = {
    create: jest.fn()
  };

  const usecase = new CriarProdutoUseCase(mockRepo);

  it('deve criar um novo produto com os dados fornecidos', async () => {
    const produtoData = {
      nome: 'Hambúrguer',
      preco: 25,
      categoria: 'Lanche'
    };

    const produtoCriado = { id: 'prod123', ...produtoData };

    mockRepo.create.mockResolvedValue(produtoCriado);

    const result = await usecase.execute(produtoData);

    expect(mockRepo.create).toHaveBeenCalledWith(produtoData);
    expect(result).toEqual(produtoCriado);
  });
});
