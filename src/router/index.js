import { createRouter, createWebHistory } from 'vue-router';
import InicioPage from '../views/InicioPage.vue'; // Importa tu componente InicioPage
import MenuPage from '../views/MenuPage.vue'; // Importa tu componente MenuPage
import Game from '../views/Game.vue'; // Importa el componente del juego
import Configuraciones from '../views/Configuraciones.vue'; // Importa el componente de configuraciones
import Gracias from '../views/Gracias.vue'; // Importa el componente de gracias

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
    path: '/game',
    name: 'Game',
    component: Game // Agrega la ruta para el juego
  },
  {
    path: '/configuraciones',
    name: 'Configuraciones',
    component: Configuraciones // Agrega la ruta para configuraciones
  },
  {
    path: '/gracias',
    name: 'Gracias',
    component: Gracias // Agrega la ruta para la página de gracias
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
