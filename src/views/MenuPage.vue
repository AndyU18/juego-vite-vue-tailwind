<template>
  <FondoInicio>
    <div class="menu">
      <h1>Bienvenido al Menú</h1>
      <p>Aquí puedes navegar a diferentes secciones.</p>
      <button @click="goToJugar">Jugar</button>
      <button @click="goToConfiguraciones">Configuraciones</button>
      <button @click="goToGracias">Gracias</button>
      <button @click="goToInicio">Regresar a Inicio</button>
    </div>
  </FondoInicio>
</template>

<script setup>
// Importa useRouter desde vue-router
import { useRouter } from 'vue-router';

// Obtén el router
const router = useRouter();

// Define las funciones para navegar a diferentes páginas
const goToInicio = () => {
  router.push('/'); // Ruta a la página de inicio
};

const goToJugar = () => {
  router.push('/game'); // Corrige la ruta a la página de Jugar (Game.vue en views/)
};

const goToConfiguraciones = () => {
  router.push('/configuraciones'); // Ruta a la página de Configuraciones (Configuraciones.vue en views/)
};

const goToGracias = () => {
  router.push('/gracias'); // Ruta a la página de Gracias (Gracias.vue en views/)
};
</script>

<style scoped>
.menu {
  text-align: center;
  margin-top: 50px;
}

button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
}
</style>
