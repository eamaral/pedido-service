const axios = require('axios');

class ClienteApiRepository {
  constructor() {
    const base = process.env.API_BASE_URL;
    this.baseUrl = `${base}/api/clientes`;
    this.authHeader = null;
  }

  setAuth(header) {
    this.authHeader = header;
  }

  async findByCPF(cpf) {
    try {
      const resp = await axios.get(
        `${this.baseUrl}/identificar/${cpf}`,
        { headers: { Authorization: this.authHeader } }
      );
      return resp.data;
    } catch (err) {
      const status = err.response?.status || 'erro desconhecido';
      console.error(`Erro ao buscar cliente por CPF (${cpf}):`, status);
      return null;
    }
  }

  async atualizarPontos(cpf) {
    try {
      const resp = await axios.put(
        `${this.baseUrl}/${cpf}`,
        {},
        { headers: { Authorization: this.authHeader } }
      );
      return resp.data;
    } catch (err) {
      const status = err.response?.status || 'erro desconhecido';
      console.error(`Erro ao atualizar pontos do cliente (${cpf}):`, status);
      return { error: 'Erro ao atualizar pontos' };
    }
  }
}

module.exports = ClienteApiRepository;
