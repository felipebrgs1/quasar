<template>
  <div>
    <q-input
      filled
      v-model="form.contract"
      label="CONTRATO Nº"
      mask="##############.####"
      :rules="[(val) => val.length == 19 || 'São 19 caracteres']"
    />

    <q-input
      filled
      v-model="form.version"
      label="VERSÃO"
      mask="##.##-##"
      :rules="[(val) => val.length == 8 || 'São 8 caractere']"
    />

    <q-input
      filled
      v-model="form.unit"
      label="UNIDADE"
      :rules="[(val) => val.length > 0 || 'Necessário']"
    />

    <q-input filled v-model="form.consultant" label="CONSULTOR(A)" />
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

<style scoped>
/* Estilos adicionais, se necessário */
</style>
