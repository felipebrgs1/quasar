import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Formulario',
    component: () => import('../views/Form.vue'),
  },
  {
    path: '/empresa',
    name: 'Empresa',
    component: () => import('../views/FormEmpresa.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
