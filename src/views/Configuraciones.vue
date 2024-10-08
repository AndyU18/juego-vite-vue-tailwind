<template>
    <div class="configuraciones">
      <h1 class="text-2xl font-bold mb-4">Configuraciones del Juego</h1>
  
      <div class="mb-6">
        <label for="volume" class="block mb-2">Volumen</label>
        <input
          type="range"
          id="volume"
          min="0"
          max="100"
          v-model="volume"
          class="w-full"
        />
        <p>Volumen: {{ volume }}%</p>
      </div>
  
      <div class="mb-6">
        <label for="difficulty" class="block mb-2">Dificultad</label>
        <select id="difficulty" v-model="difficulty" class="w-full">
          <option value="easy">Fácil</option>
          <option value="medium">Medio</option>
          <option value="hard">Difícil</option>
        </select>
      </div>
  
      <button @click="saveSettings" class="bg-blue-500 text-white px-4 py-2 rounded">
        Guardar Configuraciones
      </button>
  
      <button @click="goBack" class="ml-4 bg-gray-500 text-white px-4 py-2 rounded">
        Regresar
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  // Definimos las variables reactivas para las configuraciones
  const volume = ref(50); // Volumen inicial al 50%
  const difficulty = ref('medium'); // Dificultad inicial a "medium"
  
  // Función para guardar configuraciones
  const saveSettings = () => {
    // Aquí puedes guardar las configuraciones en un lugar persistente
    // como LocalStorage, una API, etc.
    console.log(`Configuraciones guardadas: Volumen - ${volume.value}, Dificultad - ${difficulty.value}`);
    alert('Configuraciones guardadas!');
  };
  
  // Función para volver al menú
  const goBack = () => {
    router.push('/menu'); // Regresa al menú
  };
  </script>
  
  <style scoped>
  .configuraciones {
    text-align: center;
    margin-top: 50px;
  }
  
  button {
    margin: 10px;
    padding: 10px 20px;
    font-size: 16px;
  }
  </style>
  