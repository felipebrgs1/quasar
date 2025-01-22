export function validateForm(formData, sectionName) {
  const errors = {};

  const requiredFields = {
    contract: ['version', 'unit'],
    contractor: [
      'name',
      'cnpj',
      'stateRegistration',
      'municipalRegistration',
      'address',
      'city',
      'zip',
      'state',
      'email',
      'legalRepresentative',
      'cpf',
      'mobile',
      'whatsapp',
    ],
    vehicle: [
      'renavam',
      'plate',
      'yearManufacture',
      'yearModel',
      'chassis',
      'color',
      'fuel',
    ],
    device: ['brand', 'model', 'serialNumber', 'operator'],
  };

  const fieldsToValidate = requiredFields[sectionName] || [];

  fieldsToValidate.forEach((field) => {
    if (!formData[field] || formData[field].trim() === '') {
      errors[field] = 'Este campo é obrigatório.';
    }
  });

  return errors;
}