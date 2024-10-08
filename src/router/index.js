import { createRouter, createWebHistory } from 'vue-router';
import InicioPage from '../views/InicioPage.vue'; // Importa tu nuevo componente
import MenuPage from '../views/MenuPage.vue';
import PlayPage from '../views/PlayPage.vue'; // De Edicion_base_kf (reemplaza Game.vue)
import SettingsPage from '../views/SettingsPage.vue'; // De Edicion_base_kf (reemplaza Configuraciones.vue)
import InstructionsPage from '../views/InstructionsPage.vue'; // Mantiene de Edicion_base_kf
import Gracias from '../views/Gracias.vue'; // Mantiene el componente de Gracias de master

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
    component: PlayPage // Mantiene PlayPage de Edicion_base_kf
  },
  {
    path: '/settings',
    name: 'SettingsPage',
    component: SettingsPage // Mantiene SettingsPage de Edicion_base_kf
  },
  {
    path: '/instructions',
    name: 'InstructionsPage',
    component: InstructionsPage // Mantiene InstructionsPage de Edicion_base_kf
  },
  {
    path: '/gracias',
    name: 'Gracias',
    component: Gracias // Mantiene el componente de Gracias de master
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
