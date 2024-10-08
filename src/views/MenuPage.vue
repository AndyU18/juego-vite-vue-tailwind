<template>
  <FondoInicio>
    <div class="menu">
      <h1>Bienvenido al Menú</h1>
      <p>Aquí puedes navegar a diferentes secciones.</p>

      <button @click="goToJugar">Jugar</button>
      <button @click="goToConfiguraciones">Configuraciones</button>
      <button @click="goToGracias">Gracias</button>
      <button @click="goToInicio">Regresar a Inicio</button>
      
      <!-- Botones de control para la música -->
      <div class="mt-4">
        <button @click="playMusic" class="bg-green-500 text-white px-4 py-2 rounded">Play Música</button>
        <button @click="pauseMusic" class="bg-red-500 text-white px-4 py-2 rounded">Pause Música</button>
      </div>

      <!-- Reproductor de música oculto -->
      <audio id="musicaFondo" ref="musicaFondo" src="@/assets/musica.mp3" loop></audio>
    </div>
  </FondoInicio>
</template>

<script setup>
// Importa useRouter desde vue-router
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';  // Importa funciones de Vue

// Obtén el router
const router = useRouter();

// Refs para el audio
const musicaFondo = ref(null); 

// Funciones para manejar la navegación
const goToInicio = () => {
  router.push('/'); // Ruta a la página de inicio
};

const goToJugar = () => {
  router.push('/game'); // Ruta a la página de Jugar
};

const goToConfiguraciones = () => {
  router.push('/configuraciones'); // Ruta a la página de Configuraciones
};

const goToGracias = () => {
  router.push('/gracias'); // Ruta a la página de Gracias
};

// Funciones para controlar la música
const playMusic = () => {
  musicaFondo.value.play();
};

const pauseMusic = () => {
  musicaFondo.value.pause();
};

// Al cargar la página, la música se reproduce automáticamente
onMounted(() => {
  musicaFondo.value.play();
});
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
