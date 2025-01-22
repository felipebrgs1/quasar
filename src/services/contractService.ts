import axios from 'axios';

const API_URL = 'http://localhost:3000/api/contracts';

const create = async (contractData: any) => {
  try {
    const response = await axios.post(API_URL, contractData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Erro ao criar contrato');
  }
};

export default {
  create,
};
