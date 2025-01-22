import axios from 'axios';

export const contractService = {
  async create(formData) {
    try {
      const response = await axios.post('http://localhost:3000/api/contracts', formData);
      return response.data; // Retorna o contrato criado
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao criar contrato');
    }
  }
};
