<template>
  <div>
    <q-input
      filled
      v-model="form.brand"
      label="MARCA"
      :rules="[(val) => val.length > 0 || 'Necessário']"
    />
    <q-input
      filled
      v-model="form.model"
      label="MODELO"
      :rules="[(val) => val.length > 0 || 'Necessário']"
    />
    <q-input
      filled
      v-model="form.serialNumber"
      label="Nº DE SÉRIE/IMEI"
      :rules="[(val) => val.length > 0 || 'Necessário']"
    />
    <q-input
      filled
      v-model="form.operator"
      label="OPERADORA TELEFÔNICA"
      :rules="[(val) => val.length > 0 || 'Necessário']"
    />
    <q-input
      filled
      v-model="form.lineNumber"
      label="Nº LINHA M2M"
      :rules="[(val) => val.length == 13 || 'Necessário']"
    />
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
