<template>
  <div>
    <q-input
      filled
      v-model="form.renavam"
      label="CÓDIGO RENAVAM"
      mask="##.###.###-##"
      :rules="[(val) => val.length > 11 || 'São 11 caracteres']"
    />
    <q-input
      filled
      v-model="form.plate"
      label="PLACA"
      mask="AAA-####"
      :rules="[(val) => val.length == 8 || 'São 8 caracteres']"
    />
    <q-input
      filled
      v-model="form.yearManufacture"
      label="ANO FABRICAÇÃO"
      mask="####"
      :rules="[(val) => val.length == 4 || 'São 4 caracteres']"
    />
    <q-input
      filled
      v-model="form.yearModel"
      label="ANO MODELO"
      mask="####"
      :rules="[(val) => val.length == 4 || 'São 4 caracteres']"
    />
    <q-input
      filled
      v-model="form.crvNumber"
      label="NÚMERO DO CRV"
      mask="############"
      :rules="[(val) => val.length == 12 || 'São 12 caracteres']"
    />
    <q-input
      filled
      v-model="form.securityCode"
      label="CÓDIGO DE SEGURANÇA DO CLA"
      mask="###########"
      :rules="[(val) => val.length == 11 || 'São 11 caracteres']"
    />
    <q-input
      filled
      v-model="form.cat"
      label="CAT"
      :rules="[(val) => val.length >= 0 || 'Necessário']"
    />
    <q-input
      filled
      v-model="form.model"
      label="MARCA/MODELO/VERSÃO"
      :rules="[(val) => val.length > 0 || 'Necessário']"
    />
    <q-select
      filled
      v-model="form.species"
      label="ESPÉCIE"
      :options="classe"
      :rules="[(val) => !!val || 'Espécie é obrigatória']"
    />
    <q-input
      filled
      v-model="form.previousPlate"
      label="PLACA ANTERIOR/UF"
      :rules="[(val) => val.length > 0 || 'Necessário']"
    />
    <q-input
      filled
      v-model="form.chassis"
      label="CHASSI"
      :rules="[(val) => val.length > 0 || 'Necessário']"
    />
    <q-input
      filled
      v-model="form.color"
      label="COR PREDOMINANTE"
      :rules="[(val) => val.length > 0 || 'Necessário']"
    />
    <q-select
      filled
      v-model="form.fuel"
      label="COMBUSTÍVEL"
      :options="combustivel"
      :rules="[(val) => !!val || 'Combustível é obrigatório']"
    />
    <q-input
      filled
      v-model="form.observations"
      label="OBSERVAÇÕES DO VEÍCULO"
      :rules="[(val) => val.length > 0 || 'Necessário']"
    />
    <q-input
      filled
      v-model="form.category"
      label="CATEGORIA"
      :rules="[(val) => val.length > 0 || 'Necessário']"
    />
    <q-input
      filled
      v-model="form.capacity"
      label="CAPACIDADE"
      :rules="[(val) => val.length > 0 || 'Necessário']"
    />
    <q-input
      filled
      v-model="form.power"
      label="POTÊNCIA/CILINDRADA"
      :rules="[(val) => val.length > 0 || 'Necessário']"
    />
    <q-input
      filled
      v-model="form.engine"
      label="MOTOR"
      :rules="[(val) => val.length > 0 || 'Necessário']"
    />
    <q-input
      filled
      v-model="form.cmt"
      label="CMT"
      :rules="[(val) => val.length > 0 || 'Necessário']"
    />
    <q-input
      filled
      v-model="form.axles"
      label="EIXOS"
      :rules="[(val) => val.length > 0 || 'Necessário']"
    />
    <q-input
      filled
      v-model="form.body"
      label="CARROCERIA"
      :rules="[(val) => val.length > 0 || 'Necessário']"
    />
    <q-input
      filled
      v-model="form.owner"
      label="PROPRIETÁRIO(A)"
      :rules="[(val) => val.length > 0 || 'Necessário']"
    />
    <q-input
      filled
      v-model="form.ownerCpfCnpj"
      label="CPF/CNPJ"
      :rules="[(val) => val.length > 0 || 'Necessário']"
    />
    <q-input
      filled
      v-model="form.additionalInfo"
      label="INFORMAÇÕES COMPLEMENTARES"
    />
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      combustivel: [
        'GASOLINA',
        'ÁLCOOL',
        'DIESEL S10',
        'DIESEL S500',
        'DIESEL ',
        'GNV',
        'FLEX',
        'ELÉTRICO',
        'HÍBRIDO',
      ],
      classe: [
        'Veículo de passageiros',
        'Bicicleta',
        'Ciclomotor',
        'Motocicleta',
        'Triciclo',
        'Quadriciclo',
        'Automóvel',
        'Microônibus',
        'Ônibus',
        'Bonde',
        'Reboque ou semi-reboque',
        'Charrete',
        'Veículo de carga',
        'Motoneta',
        'Caminhonete',
        'Caminhão',
        'Carroça',
        'Carro-de-mão',
        'Veículo Misto',
        'Camioneta',
        'Utilitário',
        'Veículos de competição',
        'Veículo de tração',
        'Caminhão-trator',
        'Trator de rodas',
        'Trator de esteiras',
        'Trator misto',
        'Especial',
        'De coleção',
        'Esportivo',
        'Passeio',
        'Corrida',
      ],
    };
  },
  computed: {
    form: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
};
</script>
