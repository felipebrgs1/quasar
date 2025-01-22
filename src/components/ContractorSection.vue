<template>
  <div>
    <q-input
      filled
      v-model="form.name"
      label="RAZÃO SOCIAL/NOME EMPRESARIAL"
      :rules="[(val) => val.length > 0 || 'Necessário']"
    />

    <q-input
      filled
      v-model="form.cnpj"
      label="CNPJ Nº"
      mask="##.###.###/####-##"
      :rules="[(val) => (val.length = 18 || 'São 18 caracteres')]"
    />

    <q-input
      filled
      v-model="form.stateRegistration"
      label="INSCRIÇÃO ESTADUAL Nº"
      mask="##.###.###-#"
      :rules="[(val) => (val.length = 12 || 'São 12 caracteres')]"
    />

    <q-input
      filled
      v-model="form.municipalRegistration"
      label="INSCRIÇÃO MUNICIPAL Nº"
      mask="########"
      :rules="[(val) => (val.length = 8 || 'São 8 caracteres')]"
    />

    <q-input
      filled
      v-model="form.address"
      label="ENDEREÇO RESIDENCIAL"
      :rules="[(val) => val.length > 0 || 'Necessário']"
    />

    <q-input
      filled
      v-model="form.neighborhood"
      label="BAIRRO"
      :rules="[(val) => val.length > 0 || 'Necessário']"
    />

    <q-input filled v-model="form.complement" label="COMPLEMENTO" />

    <q-input
      filled
      v-model="form.zip"
      label="CEP"
      mask="#####-###"
      :rules="[(val) => (val.length = 9 || 'São 9 caracteres')]"
    />

    <q-input
      filled
      v-model="form.city"
      label="CIDADE"
      :rules="[(val) => val.length > 0 || 'Necessário']"
    />

    <q-input
      filled
      v-model="form.state"
      label="UF"
      mask="AA"
      :rules="[(val) => (val.length = 2 || 'São 2 caracteres')]"
    />

    <q-input
      filled
      v-model="form.email"
      label="E-MAIL(S)"
      :rules="[(val) => val.length > 0 || 'Necessário']"
    />

    <q-input
      filled
      v-model="form.legalRepresentative"
      label="REPRESENTANTE LEGAL"
      :rules="[(val) => val.length > 0 || 'Necessário']"
    />

    <q-input
      filled
      v-model="form.cpf"
      label="CPF Nº"
      mask="###.###.###-##"
      :rules="[(val) => (val.length = 14 || 'São 14 caracteres')]"
    />

    <q-input
      filled
      v-model="form.phone"
      label="(DDD) TELEFONE FIXO (opcional)"
    />

    <q-input
      filled
      v-model="form.mobile"
      label="(DDD) CELULAR"
      mask="(##) #####-####"
      :rules="[(val) => (val.length = 15 || 'São 14 caracteres')]"
    />

    <q-input
      filled
      v-model="form.whatsapp"
      label="(DDD) WHATSAPP"
      mask="(##) #####-####"
      :rules="[(val) => (val.length = 15 || 'São 14 caracteres')]"
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
