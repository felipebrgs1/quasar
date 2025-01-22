// utils/validators.ts
import { z } from 'zod';

export const validateContract = (data: any) => {
  const schema = z.object({
    contract: z.string().nonempty(),
    version: z.string().nonempty(),
    unit: z.string().nonempty(),
    consultant: z.string().nonempty(),
    contractorId: z.string().uuid(),
    vehicleId: z.string().uuid(),
    deviceId: z.string().uuid(),
  });

  return schema.safeParse(data);
};

export const validateContractor = (data: any) => {
  const schema = z.object({
    name: z.string().nonempty(),
    cnpj: z.string().nonempty(),
    stateRegistration: z.string().optional(),
    municipalRegistration: z.string().optional(),
    address: z.string().nonempty(),
    neighborhood: z.string().nonempty(),
    complement: z.string().optional(),
    zip: z.string().nonempty(),
    city: z.string().nonempty(),
    state: z.string().nonempty(),
    email: z.string().email().nonempty(),
    legalRepresentative: z.string().default(""),
    cpf: z.string().nonempty(),
    phone: z.string().default(""),
    mobile: z.string().nonempty(),
    whatsapp: z.string().optional(),
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
