<template>
  <div>
    <q-input
      filled
      v-model="form.plan"
      label="PLANO"
      :error="!!errors?.plan?._errors"
      :error-message="errors?.plan?._errors?.join(', ')"
    />

    <q-input
      filled
      v-model="form.planValue"
      label="VALOR DO PLANO"
      :error="!!errors?.planValue?._errors"
      :error-message="errors?.planValue?._errors?.join(', ')"
    />

    <q-input
      filled
      v-model="form.dataPlan"
      label="DATA DE VIGÊNCIA"
      :error="!!errors?.dataPlan?._errors"
      :error-message="errors?.dataPlan?._errors?.join(', ')"
    />

    <q-input
      filled
      v-model="form.endPlan"
      label="FIM DA VIGÊNCIA"
      :error="!!errors?.endPlan?._errors"
      :error-message="errors?.endPlan?._errors?.join(', ')"
    />

    <q-input
      filled
      v-model="form.carenciaPlan"
      label="CARÊNCIA"
      :error="!!errors?.carenciaPlan?._errors"
      :error-message="errors?.carenciaPlan?._errors?.join(', ')"
    />

    <q-select
      filled
      v-model="form.payment"
      label="PAGAMENTO"
      :options="['MENSAL', 'ANUAL']"
      :error="!!errors?.payment?._errors"
      :error-message="errors?.payment?._errors?.join(', ')"
    />

    <q-input
      filled
      v-model="form.MonthlyPayment"
      label="PAGAMENTO MENSAL"
      :error="!!errors?.MonthlyPayment?._errors"
      :error-message="errors?.MonthlyPayment?._errors?.join(', ')"
    />

    <q-input
      filled
      v-model="form.vencimento"
      label="VENCIMENTO"
      :error="!!errors?.vencimento?._errors"
      :error-message="errors?.vencimento?._errors?.join(', ')"
    />

    <q-select
      filled
      v-model="form.paymentMethod"
      label="FORMA DE PAGAMENTO"
      :options="['PIX', 'CARTÃO DEBITO', 'CARTAO CREDITO', 'BOLETO']"
      :error="!!errors?.paymentMethod?._errors"
      :error-message="errors?.paymentMethod?._errors?.join(', ')"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'PlanSection',
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    errors: {
      type: Object,
      default: () => ({}),
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
