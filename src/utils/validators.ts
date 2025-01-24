// utils/validators.ts
import { z } from 'zod';
import axios from 'axios';
export const validateContract = (data: any) => {
  const schema = z.object({
    contract: z.string().nonempty().length(19, "O campo 'contract' deve ter exatamente 19 caracteres."),
    version: z.string().nonempty().length(8, "O campo 'version' deve ter exatamente 8 caracteres."),
    unit: z.string().nonempty(),
    consultant: z.string().nonempty(),
    contractorId: z.string().uuid(),
    vehicleId: z.string().uuid(),
    deviceId: z.string().uuid(),
  });

  return schema.safeParse(data);
};

export const cnpjValidator = async (cnpj: string): Promise<boolean> => {
    const cleanCnpj = cnpj.replace(/\D/g, "").trim();
    try {
        const response = await axios.get(`http://localhost:3000/api/cnpj/${cleanCnpj}`);
        if (response.status === 200) {
            return true;
        }
        throw new Error('CNPJ inválido');
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message || 'CNPJ inválido');
        }
        throw new Error('Erro na validação do CNPJ');
    }
};

export const validateContractor = (data: any) => {
  const schema = z.object({
    name: z.string().nonempty(),
    cnpj: z.string().nonempty().length(18, "O campo 'cnpj' deve ter exatamente 18 caracteres."),
    stateRegistration: z.string().nonempty().length(12, "O campo 'stateRegistration' deve ter exatamente 12 caracteres."),
    municipalRegistration: z.string().nonempty().length(8, "O campo 'municipalRegistration' deve ter exatamente 8 caracteres."),
    address: z.string().nonempty(),
    neighborhood: z.string().nonempty(),
    complement: z.string().optional(),
    zip: z.string().nonempty().length(9, "O campo 'zip' deve ter exatamente 8 caracteres."),
    city: z.string().nonempty(),
    state: z.string().nonempty(),
    email: z.string().email().nonempty(),
    legalRepresentative: z.string().default(""),
    cpf: z.string().nonempty().length(14, "O campo 'cpf' deve ter exatamente 14 caracteres."),
    phone: z.string().default(""),
    mobile: z.string().nonempty().length(15, "O campo 'mobile' deve ter exatamente 15 caracteres."),
    whatsapp: z.string().nonempty().length(15, "O campo 'whatsapp' deve ter exatamente 15 caracteres."),
  });

  return schema.safeParse(data);
};

export const validateVehicle = (data: any) => {
  const schema = z.object({
    renavam: z.string().nonempty(),
    plate: z.string().nonempty(),
    yearManufacture: z.string().nonempty(),
    yearModel: z.string().nonempty(),
    crvNumber: z.string().optional(),
    securityCode: z.string().optional(),
    cat: z.string().optional(),
    model: z.string().nonempty(),
    species: z.string().optional(),
    previousPlate: z.string().optional(),
    chassis: z.string().nonempty(),
    color: z.string().nonempty(),
    fuel: z.string().nonempty(),
    observations: z.string().optional(),
    category: z.string().optional(),
    capacity: z.string().optional(),
    power: z.string().optional(),
    engine: z.string().optional(),
    cmt: z.string().optional(),
    axles: z.string().optional(),
    body: z.string().optional(),
    owner: z.string().nonempty(),
    ownerCpfCnpj: z.string().nonempty(),
    additionalInfo: z.string().optional(),
  });

  return schema.safeParse(data);
};

export const validateDevice = (data: any) => {
  const schema = z.object({
    brand: z.string().nonempty(),
    model: z.string().nonempty(),
    serialNumber: z.string().nonempty(),
    operator: z.string().optional(),
    lineNumber: z.string().optional(),
    hasIButton: z.boolean().default(false),
    iButtonQuantity: z.string().default("0"),
    hasRfidReader: z.boolean().default(false),
    rfidCardQuantity: z.string().default("0"),
    hasCamera: z.boolean().default(false),
    cameraQuantity: z.string().default("0"),
  });

  return schema.safeParse(data);
};

export const validateForm = (form: any, errors: any) => {
  let isValid = true;

  

  const contractValidation = validateContract(form.contract);
  if (!contractValidation.success) {
    errors.contract = contractValidation.error.format();
    isValid = false;
  } else {
    errors.contract = {};
  }

  const contractorValidation = validateContractor(form.contractor);
  if (!contractorValidation.success) {
    errors.contractor = contractorValidation.error.format();
    isValid = false;
  } else {
    errors.contractor = {};
  }

  const vehicleValidation = validateVehicle(form.vehicle);
  if (!vehicleValidation.success) {
    errors.vehicle = vehicleValidation.error.format();
    isValid = false;
  } else {
    errors.vehicle = {};
  }

  const deviceValidation = validateDevice(form.device);
  if (!deviceValidation.success) {
    errors.device = deviceValidation.error.format();
    isValid = false;
  } else {
    errors.device = {};
  }

  return isValid;
};

export const validateStep = async (step: number, formData: any, errors: any): Promise<boolean> => {
    try {
        switch (step) {
            case 1:
                const contractValidation = validateContract(formData.contract);
                if (!contractValidation.success) {
                    errors.contract = contractValidation.error.format();
                    return false;
                }
                errors.contract = {};
                return true;

            case 2:
                // First validate CNPJ
                try {
                    await cnpjValidator(formData.contractor.cnpj);
                } catch (error: any) {
                    errors.contractor = { cnpj: error.message };
                    return false;
                }
                
                // Then validate other contractor fields
                const contractorValidation = validateContractor(formData.contractor);
                if (!contractorValidation.success) {
                    errors.contractor = contractorValidation.error.format();
                    return false;
                }
                errors.contractor = {};
                return true;

            case 3:
                const vehicleValidation = validateVehicle(formData.vehicle);
                if (!vehicleValidation.success) {
                    errors.vehicle = vehicleValidation.error.format();
                    return false;
                }
                errors.vehicle = {};
                return true;

            case 4:
                const deviceValidation = validateDevice(formData.device);
                if (!deviceValidation.success) {
                    errors.device = deviceValidation.error.format();
                    return false;
                }
                errors.device = {};
                return true;

            default:
                return false;
        }
    } catch (error) {
        console.error('Validation error:', error);
        return false;
    }
};
