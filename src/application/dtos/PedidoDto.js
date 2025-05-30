class PedidoDto {
  constructor({ id, clienteId, itens, total, status, createdAt, updatedAt }) {
    this.pedidoId = id;
    this.clienteId = clienteId;
    this.itens = itens;
    this.total = total;
    this.status = status;
    this.tempoEstimadoEntrega = this._calcularEstimativa(createdAt);
  }

  _calcularEstimativa(dataCriacao) {
    const inicio = new Date(dataCriacao);
    const fim = new Date(inicio.getTime() + 10 * 60000);
    const format = date => `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
    return `${format(inicio)} - ${format(fim)}`;
  }
}

module.exports = PedidoDto;