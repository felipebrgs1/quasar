<template>
  <div>
    <q-input filled v-model="form.renavam" label="CÓDIGO RENAVAM" />
    <q-input filled v-model="form.plate" label="PLACA" />
    <q-input filled v-model="form.yearManufacture" label="ANO FABRICAÇÃO" />
    <q-input filled v-model="form.yearModel" label="ANO MODELO" />
    <q-input filled v-model="form.crvNumber" label="NÚMERO DO CRV" />
    <q-input
      filled
      v-model="form.securityCode"
      label="CÓDIGO DE SEGURANÇA DO CLA"
    />
    <q-input filled v-model="form.cat" label="CAT" />
    <q-input filled v-model="form.model" label="MARCA/MODELO/VERSÃO" />
    <q-input filled v-model="form.species" label="ESPÉCIE/TIPO" />
    <q-input filled v-model="form.previousPlate" label="PLACA ANTERIOR/UF" />
    <q-input filled v-model="form.chassis" label="CHASSI" />
    <q-input filled v-model="form.color" label="COR PREDOMINANTE" />
    <q-input filled v-model="form.fuel" label="COMBUSTÍVEL" />
    <q-input
      filled
      v-model="form.observations"
      label="OBSERVAÇÕES DO VEÍCULO"
    />
    <q-input filled v-model="form.category" label="CATEGORIA" />
    <q-input filled v-model="form.capacity" label="CAPACIDADE" />
    <q-input filled v-model="form.power" label="POTÊNCIA/CILINDRADA" />
    <q-input filled v-model="form.engine" label="MOTOR" />
    <q-input filled v-model="form.cmt" label="CMT" />
    <q-input filled v-model="form.axles" label="EIXOS" />
    <q-input filled v-model="form.body" label="CARROCERIA" />
    <q-input filled v-model="form.owner" label="PROPRIETÁRIO(A)" />
    <q-input filled v-model="form.ownerCpfCnpj" label="CPF/CNPJ" />
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
