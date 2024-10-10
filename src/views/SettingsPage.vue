<template>
    <div class="settings">
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
  
      <button @click="goBack" class="btn-primary">Volver al Menú</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  // Definimos las variables reactivas para el volumen
  const volume = ref(50); // Volumen inicial al 50%
  
  // Función para volver al menú
  const goBack = () => {
    router.push('/menu'); // Redirige al menú
  };
  </script>
  
  <style scoped>
  /* Estilos base */
  .settings {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    text-align: center;
  }
  
  /* Personalización del control deslizante */
  input[type="range"] {
    appearance: none;
    -webkit-appearance: none;
    width: 100%;
    height: 8px;
    background: #ddd;
    border-radius: 5px;
    outline: none;
  }
  
  input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #4a90e2;
    cursor: pointer;
  }
  
  input[type="range"]::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #4a90e2;
    cursor: pointer;
  }
  
  /* Estilos para el botón */
  .btn-primary {
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    margin-top: 20px;
    cursor: pointer;
  }
  
  .btn-primary:hover {
    background-color: #357ab7;
  }
  
  /* Diseño responsivo */
  @media (max-width: 768px) {
    .settings {
      padding: 15px;
    }
  
    .btn-primary {
      width: 100%;
      font-size: 14px;
    }
  
    input[type="range"] {
      height: 6px;
    }
  
    input[type="range"]::-webkit-slider-thumb {
      width: 15px;
      height: 15px;
    }
  
    input[type="range"]::-moz-range-thumb {
      width: 15px;
      height: 15px;
    }
  }
  </style>
  