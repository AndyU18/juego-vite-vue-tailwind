<template>
  <div class="center">
    <h1 class="digital-clock">GALAGEX</h1>

    <vs-button class="menu-button" @click="handlePlay">
      Jugar
      <template #animate>
        <i class='bx bx-game'></i>
      </template>
    </vs-button>

    <vs-button
      flat
      success
      class="menu-button"
      animation-type="vertical"
      @click="handleSettings"
    >
      Configuraciones
      <template #animate>
        <i class='bx bx-cog'></i>
      </template>
    </vs-button>

    <vs-button
      gradient
      style="min-width: 60px"
      warn
      class="menu-button"
      animation-type="scale"
      @click="handleHowToPlay"
    >
      Cómo Jugar
      <template #animate>
        <i class='bx bx-help-circle'></i>
      </template>
    </vs-button>

    <vs-button
      icon
      relief
      danger
      class="menu-button"
      animation-type="rotate"
      @click="handleExit"
    >
      Salir
      <template #animate>
        <i class='bx bx-exit'></i>
      </template>
    </vs-button>

    <!-- Botones de control para la música -->
    <div class="mt-4">
      <button @click="playMusic" class="bg-green-500 text-white px-4 py-2 rounded">Play Música</button>
      <button @click="pauseMusic" class="bg-red-500 text-white px-4 py-2 rounded">Pause Música</button>
    </div>

    <!-- Reproductor de música oculto -->
    <audio id="musicaFondo" ref="musicaFondo" src="@/assets/musica.mp3" loop></audio>
  </div>
</template>

<script setup>
// Importa useRouter desde vue-router
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';  // Importa funciones de Vue

const router = useRouter();  // Obtén una instancia del router

// Funciones para manejar la navegación
const handlePlay = () => {
  router.push('/play');  // Redirige a la página de juego
};

const handleSettings = () => {
  router.push('/settings');  // Redirige a la página de configuraciones
};

const handleHowToPlay = () => {
  router.push('/instructions');  // Redirige a la página de instrucciones
};

const handleExit = () => {
  router.push('/');  // Redirige a la página de inicio
};

// Refs para el audio
const musicaFondo = ref(null); 

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
.center {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.digital-clock {
  font-family: 'Digital', monospace; /* Cambia esto por la fuente que desees */
  font-size: 70px;
  margin-bottom: 35px;
}

.menu-button {
  margin: 18px 0; /* Ajusta este valor para aumentar o disminuir el espaciado */
}

.mt-4 {
  margin-top: 16px;
}

button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
}
</style>
