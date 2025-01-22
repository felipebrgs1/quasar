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

      <q-step :name="4" title="Dispositivo" icon="devices">
        <device-section v-model="form.device" :errors="errors.device" />
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

<script>
import { contractService } from '../services/contractService';
import { validateForm } from '../utils/validators';
import { ref } from 'vue';
import ContractSection from '../components/ContractSection.vue';
import ContractorSection from '../components/ContractorSection.vue';
import VehicleSection from '../components/VehicleSection.vue';
import DeviceSection from '../components/DeviceSection.vue';

export default {
  name: 'ContractForm',

  components: {
    ContractSection,
    ContractorSection,
    VehicleSection,
    DeviceSection,
  },

  setup() {
    return {
      errors: ref({
        contract: {},
        contractor: {},
        vehicle: {},
        device: {},
      }),
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
          version: '',
          unit: '',
          consultant: '',
        },
        contractor: {
          name: '',
          cnpj: '',
          stateRegistration: '',
          municipalRegistration: '',
          address: '',
          neighborhood: '',
          complement: '',
          zip: '',
          city: '',
          state: '',
          email: '',
          legalRepresentative: '',
          cpf: '',
          phone: '',
          mobile: '',
          whatsapp: '',
        },
        vehicle: {
          renavam: '',
          plate: '',
          yearManufacture: '',
          yearModel: '',
          crvNumber: '',
          securityCode: '',
          cat: '',
          model: '',
          species: '',
          previousPlate: '',
          chassis: '',
          color: '',
          fuel: '',
          observations: '',
          category: '',
          capacity: '',
          power: '',
          engine: '',
          cmt: '',
          axles: '',
          body: '',
          owner: '',
          ownerCpfCnpj: '',
          additionalInfo: '',
        },
        device: {
          brand: '',
          model: '',
          serialNumber: '',
          operator: '',
          lineNumber: '',
          hasIButton: false,
          iButtonQuantity: 0,
          hasRfidReader: false,
          rfidCardQuantity: 0,
          hasCamera: false,
          cameraQuantity: 0,
        },
      },
    };
  },

  methods: {
    validateAndNext(currentStep) {
      const sectionName = ['contract', 'contractor', 'vehicle', 'device'][
        currentStep - 1
      ];
      const sectionErrors = validateForm(this.form[sectionName], sectionName);

      this.errors[sectionName] = sectionErrors;

      if (Object.keys(sectionErrors).length === 0) {
        this.step++;
      }
    },

    prevStep() {
      this.step--;
    },

    showNotification(title, message) {
      this.notification = {
        show: true,
        title,
        message,
      };
    },

    async submitForm() {
      const deviceErrors = validateForm(this.form.device, 'device');
      this.errors.device = deviceErrors;

      if (Object.keys(deviceErrors).length > 0) {
        return;
      }

      try {
        this.loading = true;
        const result = await contractService.create(this.form);

        this.showNotification('Sucesso', 'Contrato criado com sucesso!');

        await this.$router.push({
          name: 'ContractDetails',
          params: { id: result.id },
        });
      } catch (error) {
        console.error('Erro ao criar contrato:', error);
        this.showNotification(
          'Erro',
          error.message ||
            'Ocorreu um erro ao criar o contrato. Tente novamente.',
        );
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
