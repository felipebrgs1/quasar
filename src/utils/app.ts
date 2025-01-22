import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { validateForm } from '../utils/validators';

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

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
