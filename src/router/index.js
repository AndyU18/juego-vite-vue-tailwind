import { createRouter, createWebHistory } from 'vue-router';
import InicioPage from '../views/InicioPage.vue'; // Importa tu nuevo componente
import MenuPage from '../views/MenuPage.vue';

const routes = [
  {
    path: '/',
    name: 'InicioPage',
    component: InicioPage
  },
  {
    path: '/menu',
    name: 'MenuPage',
    component: MenuPage
  },
  // Otras rutas pueden ir aquí
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
