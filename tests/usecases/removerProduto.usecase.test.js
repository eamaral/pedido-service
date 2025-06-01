// tests/usecases/removerProduto.usecase.test.js
const RemoverProdutoUseCase = require('../../src/application/usecases/RemoverProdutoUseCase');

describe('RemoverProdutoUseCase', () => {
  it('deve remover um produto pelo ID', async () => {
    const mockRepo = {
      deleteById: jest.fn().mockResolvedValue({ sucesso: true })
    };

    const usecase = new RemoverProdutoUseCase(mockRepo);
    const result = await usecase.execute(1);

    expect(mockRepo.deleteById).toHaveBeenCalledWith(1);
    expect(result).toEqual({ sucesso: true });
  });
});
