import { createRouter, createWebHistory } from 'vue-router';
import InicioPage from '../views/InicioPage.vue'; // Importa tu nuevo componente
import MenuPage from '../views/MenuPage.vue';
import PlayPage from '../views/PlayPage.vue';
import SettingsPage from '../views/SettingsPage.vue';
import InstructionsPage from '../views/InstructionsPage.vue';


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
  {
    path: '/play',
    name: 'PlayPage',
    component: PlayPage
  },
  {
    path: '/settings',
    name: 'SettingsPage',
    component: SettingsPage
  },
  {
    path: '/instructions',
    name: 'InstructionsPage',
    component: InstructionsPage
  }
  // Otras rutas pueden ir aquí
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
