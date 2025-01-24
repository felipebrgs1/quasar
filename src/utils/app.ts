import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { validateForm } from '../utils/validators';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;

const prisma = new PrismaClient();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.post('/api/contracts', async (req: Request, res: Response) => {
  try {
    const contractData = req.body;
    const errors = {
      contract: {},
      contractor: {},
      vehicle: {},
      device: {},
      plan: {},
    };

    const isValid = validateForm(contractData, errors);

    if (!isValid) {
      return res.status(400).json({ errors });
    }

    // Verificar se o contrato já existe
    const existingContract = await prisma.contract.findUnique({
      where: { contract: contractData.contract.contract },
    });

    if (existingContract) {
      return res.status(400).json({ message: 'Contrato já existe.' });
    }

    // Criar o contrato
    const createdContract = await prisma.contract.create({
      data: {
        contract: contractData.contract.contract,
        version: contractData.contract.version,
        unit: contractData.contract.unit,
        consultant: contractData.contract.consultant,
        contractor: {
          connectOrCreate: {
            where: { cnpj: contractData.contractor.cnpj },
            create: contractData.contractor,
          },
        },
        vehicle: {
          connectOrCreate: {
            where: { plate: contractData.vehicle.plate },
            create: contractData.vehicle,
          },
        },
        device: {
          connectOrCreate: {
            where: { serialNumber: contractData.device.serialNumber },
            create: contractData.device,
          },
        },
        plan: {
          create: contractData.plan,
        },
      },
    });

    res.status(201).json({ message: 'Contrato criado com sucesso!', data: createdContract });
    return
  } catch (error) {
    console.error('Erro ao criar contrato:', error);
    res.status(500).json({ message: 'Ocorreu um erro ao criar o contrato.' });
    return
  }
});

app.get('/api/cnpj/:cnpj', async (req: Request, res: Response) => {
  try {
    const { cnpj } = req.params;

    if (!cnpj || cnpj.length !== 14) {
      return res.status(400).json({ message: 'CNPJ inválido. Certifique-se de fornecer um CNPJ com 14 dígitos.' });
    }

    const response = await axios.get(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
    
    // Se chegou aqui, a requisição foi bem sucedida
    return res.status(200).json({ 
      status: 'OK',
      data: response.data 
    });

  } catch (error: any) {
    console.error('Erro ao buscar CNPJ:', error.message);

    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      return res.status(status).json({
        status: 'ERROR',
        message: 'CNPJ não encontrado ou inválido',
        details: error.response?.data || 'Erro desconhecido na API externa.',
      });
    }
    
    return res.status(500).json({ 
      status: 'ERROR',
      message: 'Ocorreu um erro ao buscar o CNPJ.' 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
