import express from 'express';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());

app.post('/api/contracts', async (req, res) => {
  const contractData = req.body;

  if (
    !contractData.contractor ||
    !contractData.vehicle ||
    !contractData.device ||
    !contractData.version ||
    !contractData.unit ||
    !contractData.consultant
  ) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    // Create contractor if it doesn't exist
    let contractor = await prisma.contractor.findUnique({
      where: { cnpj: contractData.contractor.cnpj },
    });

    if (!contractor) {
      contractor = await prisma.contractor.create({
        data: {
          name: contractData.contractor.name,
          cnpj: contractData.contractor.cnpj,
          stateRegistration: contractData.contractor.stateRegistration,
          municipalRegistration: contractData.contractor.municipalRegistration,
          address: contractData.contractor.address,
          neighborhood: contractData.contractor.neighborhood,
          complement: contractData.contractor.complement,
          zip: contractData.contractor.zip,
          city: contractData.contractor.city,
          state: contractData.contractor.state,
          email: contractData.contractor.email,
          legalRepresentative: contractData.contractor.legalRepresentative,
          cpf: contractData.contractor.cpf,
          phone: contractData.contractor.phone,
          mobile: contractData.contractor.mobile,
          whatsapp: contractData.contractor.whatsapp,
        },
      });
    }

    // Create vehicle if it doesn't exist
    let vehicle = await prisma.vehicle.findUnique({
      where: { plate: contractData.vehicle.plate },
    });

    if (!vehicle) {
      vehicle = await prisma.vehicle.create({
        data: {
          renavam: contractData.vehicle.renavam,
          plate: contractData.vehicle.plate,
          yearManufacture: contractData.vehicle.yearManufacture,
          yearModel: contractData.vehicle.yearModel,
          crvNumber: contractData.vehicle.crvNumber,
          securityCode: contractData.vehicle.securityCode,
          cat: contractData.vehicle.cat,
          model: contractData.vehicle.model,
          species: contractData.vehicle.species,
          previousPlate: contractData.vehicle.previousPlate,
          chassis: contractData.vehicle.chassis,
          color: contractData.vehicle.color,
          fuel: contractData.vehicle.fuel,
          observations: contractData.vehicle.observations,
          category: contractData.vehicle.category,
          capacity: contractData.vehicle.capacity,
          power: contractData.vehicle.power,
          engine: contractData.vehicle.engine,
          cmt: contractData.vehicle.cmt,
          axles: contractData.vehicle.axles,
          body: contractData.vehicle.body,
          owner: contractData.vehicle.owner,
          ownerCpfCnpj: contractData.vehicle.ownerCpfCnpj,
          additionalInfo: contractData.vehicle.additionalInfo,
        },
      });
    }

    // Create device if it doesn't exist
    let device = await prisma.device.findUnique({
      where: { serialNumber: contractData.device.serialNumber },
    });

    if (!device) {
      device = await prisma.device.create({
        data: {
          brand: contractData.device.brand,
          model: contractData.device.model,
          serialNumber: contractData.device.serialNumber,
          operator: contractData.device.operator,
          lineNumber: contractData.device.lineNumber,
          hasIButton: contractData.device.hasIButton,
          iButtonQuantity: contractData.device.iButtonQuantity,
          hasRfidReader: contractData.device.hasRfidReader,
          rfidCardQuantity: contractData.device.rfidCardQuantity,
          hasCamera: contractData.device.hasCamera,
          cameraQuantity: contractData.device.cameraQuantity,
        },
      });
    }

    // Create contract
    const newContract = await prisma.contract.create({
      data: {
        version: contractData.version,
        unit: contractData.unit,
        consultant: contractData.consultant,
        contractor: { connect: { id: contractor.id } },
        vehicle: { connect: { id: vehicle.id } },
        device: { connect: { id: device.id } },
      },
    });

    res.status(201).json(newContract);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
