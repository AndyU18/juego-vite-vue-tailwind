<template>
    <div class="gracias">
      <h1 class="text-3xl font-bold mb-4">¡Gracias por jugar!</h1>
      <p class="mb-6">Esperamos que hayas disfrutado del juego.</p>
      
      <div class="developers">
        <h2 class="text-xl font-semibold">Desarrolladores:</h2>
        <ul class="list-disc list-inside">
          <li>Desarrollador 1: Juan Pérez</li>
          <li>Desarrollador 2: Ana Gómez</li>
          <li>Desarrollador 3: Luis Rodríguez</li>
          <!-- Agrega más desarrolladores según sea necesario -->
        </ul>
      </div>
  
      <button @click="goToMenu" class="bg-blue-500 text-white px-4 py-2 rounded">
        Regresar al Menú
      </button>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  // Función para volver al menú
  const goToMenu = () => {
    router.push('/menu'); // Regresa al menú
  };
  </script>
  
  <style scoped>
  .gracias {
    text-align: center;
    margin-top: 50px;
  }
  
  button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
  }
  </style>
  