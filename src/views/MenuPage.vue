<template>
  <div>
    <h1>Bienvenido al Menú</h1>
    <p>Aquí puedes navegar a diferentes secciones.</p>
    <button @click="goToInicio">Regresar a Inicio</button>
  </div>
</template>

<script setup>
// Importa useRouter desde vue-router
import { useRouter } from 'vue-router';

// Obtén el router
const router = useRouter();

// Define la función para navegar a la página de inicio
const goToInicio = () => {
  router.push('/'); // Usa la ruta correcta
};
</script>

<style scoped>
/* Estilos específicos para MenuPage */
</style>
