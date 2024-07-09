import { createRouter, createWebHistory } from 'vue-router';
import Contracts from '../views/Contracts.vue';
import ContractDetails from '../components/ContractDetails.vue';
import EditContract from '../components/EditContract.vue';

const routes = [
  { path: '/', redirect: '/contracts' },
  { path: '/contracts', component: Contracts },
  { path: '/contracts/:id', component: ContractDetails },
  { path: '/contracts/:id/edit', component: EditContract },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
