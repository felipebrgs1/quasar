<template>
  <div>
    <q-input filled v-model="form.brand" label="MARCA" />
    <q-input filled v-model="form.model" label="MODELO" />
    <q-input filled v-model="form.serialNumber" label="Nº DE SÉRIE/IMEI" />
    <q-input filled v-model="form.operator" label="OPERADORA TELEFÔNICA" />
    <q-input filled v-model="form.lineNumber" label="Nº LINHA M2M" />
    <q-checkbox v-model="form.hasIButton" label="LEITOR I-BUTTON" />
    <q-input filled v-model="form.iButtonQuantity" label="QUANT. I-BUTTON" />
    <q-checkbox v-model="form.hasRfidReader" label="LEITOR CARTÃO RFID" />
    <q-input filled v-model="form.rfidCardQuantity" label="QUANT. CARTÕES" />
    <q-checkbox v-model="form.hasCamera" label="CÂMERA" />
    <q-input filled v-model="form.cameraQuantity" label="QUANT. CÂMERAS" />
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
