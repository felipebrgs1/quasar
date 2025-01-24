<template>
  <q-page class="q-pa-md">
    <q-stepper v-model="step" vertical color="primary" animated>
      <q-step :name="1" title="Contrato" icon="description" :done="step > 1">
        <contract-section v-model="form.contract" :errors="errors.contract" />
        <div class="q-mt-md">
          <q-btn @click="validateAndNext(1)" color="primary" label="Próximo" />
        </div>
      </q-step>

      <q-step :name="2" title="Contratante" icon="business" :done="step > 2">
        <contractor-section
          v-model="form.contractor"
          :errors="errors.contractor"
        />
        <div class="q-mt-md">
          <q-btn flat @click="prevStep" label="Voltar" class="q-mr-sm" />
          <q-btn @click="validateAndNext(2)" color="primary" label="Próximo" />
        </div>
      </q-step>

      <q-step :name="3" title="Veículo" icon="directions_car" :done="step > 3">
        <vehicle-section v-model="form.vehicle" :errors="errors.vehicle" />
        <div class="q-mt-md">
          <q-btn flat @click="prevStep" label="Voltar" class="q-mr-sm" />
          <q-btn @click="validateAndNext(3)" color="primary" label="Próximo" />
        </div>
      </q-step>

      <q-step :name="4" title="Dispositivo" icon="devices" :done="step > 4">
        <device-section v-model="form.device" :errors="errors.device" />
        <div class="q-mt-md">
          <q-btn flat @click="prevStep" label="Voltar" class="q-mr-sm" />
          <q-btn @click="validateAndNext(4)" color="primary" label="Próximo" />
        </div>
      </q-step>

      <q-step :name="5" title="Plano" icon="payments">
        <plan-section v-model="form.plan" :errors="errors.plan" />
        <div class="q-mt-md">
          <q-btn flat @click="prevStep" label="Voltar" class="q-mr-sm" />
          <q-btn
            @click="submitForm"
            color="primary"
            label="Finalizar"
            :loading="loading"
            :disable="loading"
          />
        </div>
      </q-step>
    </q-stepper>

    <q-dialog v-model="notification.show">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ notification.title }}</div>
          <div class="q-mt-sm">{{ notification.message }}</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { validateForm } from '../utils/validators';
import contractService from '../services/contractService';
import ContractSection from '../components/ContractSection.vue';
import ContractorSection from '../components/ContractorSection.vue';
import VehicleSection from '../components/VehicleSection.vue';
import DeviceSection from '../components/DeviceSection.vue';
import PlanSection from '../components/PlanSection.vue';
import { validateStep } from '../utils/validators';

export default defineComponent({
  name: 'ContractForm',

  components: {
    ContractSection,
    ContractorSection,
    VehicleSection,
    DeviceSection,
    PlanSection,
  },

  setup() {
    const errors = ref({
      contract: {},
      contractor: {},
      vehicle: {},
      device: {},
      plan: {},
    });

    return {
      errors,
    };
  },

  data() {
    return {
      step: 1,
      loading: false,
      notification: {
        show: false,
        title: '',
        message: '',
      },
      form: {
        contract: {
          contract: '12345678901234567890',
          version: '1.0',
          unit: 'Unidade 1',
          consultant: 'Consultor A',
          contractorId: '123e4567-e89b-12d3-a456-426614174000',
          vehicleId: '123e4567-e89b-12d3-a456-426614174001',
          deviceId: '123e4567-e89b-12d3-a456-426614174002',
        },
        contractor: {
          name: 'Empresa X',
          cnpj: '12345678000195',
          stateRegistration: '123456789',
          municipalRegistration: '987654321',
          address: 'Rua Exemplo, 123',
          neighborhood: 'Centro',
          complement: 'Sala 45',
          zip: '12345-678',
          city: 'Cidade Exemplo',
          state: 'SP',
          email: 'contato@empresa.com',
          legalRepresentative: 'José da Silva',
          cpf: '12345678909',
          phone: '(11) 1234-5678',
          mobile: '(11) 98765-4321',
          whatsapp: '(11) 98765-4321',
        },
        vehicle: {
          renavam: '123456789123',
          plate: 'ABC-1234',
          yearManufacture: '2020',
          yearModel: '2021',
          crvNumber: '1234567890',
          securityCode: '123',
          cat: '',
          model: 'Modelo X',
          species: 'Automóvel',
          previousPlate: 'XYZ-9876',
          chassis: '1A2B3C4D5E6F7G8H9',
          color: 'Preto',
          fuel: 'Gasolina',
          observations: 'Sem observações.',
          category: 'Categoria A',
          capacity: '5 pessoas',
          power: '200 HP',
          engine: 'V6',
          cmt: '2000 kg',
          axles: '2',
          body: 'Sedan',
          owner: 'João Silva',
          ownerCpfCnpj: '12345678909',
          additionalInfo: 'Nenhuma informação adicional.',
        },
        device: {
          brand: 'Marca X',
          model: 'Modelo Y',
          serialNumber: 'SN123456789',
          operator: 'Operadora A',
          lineNumber: '1234567890',
          hasIButton: true,
          iButtonQuantity: '5',
          hasRfidReader: true,
          rfidCardQuantity: '10',
          hasCamera: false,
          cameraQuantity: '0',
        },
        plan: {
          plan: 'AVANÇADO II',
          planValue: 'R$1.318,80',
          dataPlan: '18/12/2024',
          endPlan: '36 MESES',
          carenciaPlan: '12 MESES',
          payment: 'ANUAL',
          MonthlyPayment: 'R$109,90',
          vencimento: '20',
          paymentMethod: 'BOLETO',
        },
      },
    };
  },

  methods: {
    async validateAndNext(step: number) {
      try {
        this.loading = true;
        console.log('Validating step:', this.errors);
        const isValid = await validateStep(step, this.form, this.errors);
        if (isValid) {
          this.step = step + 1;
        }
      } catch (error) {
        console.error('Validation error:', error);
        this.notification.show = true;
        this.notification.title = 'Erro';
        this.notification.message = 'Erro na validação do formulário';
      } finally {
        this.loading = false;
      }
    },

    prevStep() {
      this.step = this.step - 1;
    },

    async submitForm() {
      try {
        this.loading = true;

        // Validate final step first
        const stepValid = await validateStep(this.step, this.form, this.errors);
        if (!stepValid) {
          return;
        }

        const response = await contractService.create(this.form);
        this.notification.show = true;
        this.notification.title = 'Sucesso';
        this.notification.message = 'Contrato criado com sucesso!';
      } catch (error: any) {
        this.notification.show = true;
        this.notification.title = 'Erro';
        this.notification.message = error.message || 'Erro ao criar contrato';
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>
