// tests/usecases/editarProduto.usecase.test.js
const EditarProdutoUseCase = require('../../src/application/usecases/EditarProdutoUseCase');

describe('EditarProdutoUseCase', () => {
  const mockRepo = {
    updateById: jest.fn(),
    findById: jest.fn()
  };

  const usecase = new EditarProdutoUseCase(mockRepo);

  it('deve atualizar e retornar o produto atualizado', async () => {
    const produtoId = '123';
    const dadosAtualizados = { nome: 'Novo Nome', preco: 20 };
    const produtoAtualizado = { id: '123', nome: 'Novo Nome', preco: 20 };

    mockRepo.updateById.mockResolvedValue();
    mockRepo.findById.mockResolvedValue(produtoAtualizado);

    const result = await usecase.execute(produtoId, dadosAtualizados);

    expect(mockRepo.updateById).toHaveBeenCalledWith(produtoId, dadosAtualizados);
    expect(mockRepo.findById).toHaveBeenCalledWith(produtoId);
    expect(result).toEqual(produtoAtualizado);
  });
});
