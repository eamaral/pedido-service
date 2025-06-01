// tests/usecases/criarPedido.usecase.test.js
const CriarPedidoUseCase = require('../../src/application/usecases/CriarPedidoUseCase');

describe('CriarPedidoUseCase', () => {
  const mockRepo = {
    create: jest.fn()
  };

  const usecase = new CriarPedidoUseCase(mockRepo);

  it('deve criar um novo pedido com total calculado corretamente', async () => {
    const input = {
      clienteId: '12345678900',
      itens: [
        { preco: 10, quantidade: 2 },
        { preco: 5, quantidade: 1 }
      ]
    };

    const pedidoCriado = {
      id: 'pedido123',
      ...input,
      total: 25
    };

    mockRepo.create.mockResolvedValue(pedidoCriado);

    const result = await usecase.execute(input);

    expect(mockRepo.create).toHaveBeenCalledWith({
      clienteId: '12345678900',
      itens: input.itens,
      total: 25
    });
    expect(result).toEqual(pedidoCriado);
  });

  it('deve lançar erro se clienteId ou itens forem inválidos', async () => {
    const entradasInvalidas = [
      {}, 
      { clienteId: '123' }, 
      { itens: [] }, 
      { clienteId: '123', itens: 'string' }
    ];

    for (const entrada of entradasInvalidas) {
      await expect(usecase.execute(entrada)).rejects.toThrow('clienteId e itens válidos são obrigatórios');
    }
  });
});
