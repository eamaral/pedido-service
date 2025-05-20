class PedidoDto {
    constructor(pedido) {
      this.id = pedido.id;
      this.clienteId = pedido.clienteId;
      this.itens = pedido.itens;
      this.total = pedido.total;
      this.status = pedido.status;
      this.qrCode = pedido.qrCode;
    }
  }
  
  module.exports = PedidoDto;
  