<template>
    <div class="instructions-page">
      <h1 class="text-3xl font-bold mb-4">Instrucciones del Juego</h1>
  
      <div class="instructions-content">
        <p class="instruction-text">
          Bienvenido al juego. Aquí están los controles y cómo jugar:
        </p>
        <ul class="instruction-list">
          <li><strong>Controles del Juego:</strong> Usa las TECLAS DE DIRECCION para mover al personaje y ESPACIO para disparar.</li>
          <li><strong>Objetivo:</strong> Elimina a los enemigos y alcanza la puntuación más alta posible.</li>
        </ul>
  
        <!-- Botón para volver al menú -->
        <button @click="goBackToMenu" class="btn-go-back mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Volver al Menú
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  // Función para regresar al menú principal
  const goBackToMenu = () => {
    router.push('/menu'); // Cambia '/menu' por la ruta correspondiente de tu menú
  };
  </script>
  
  <style scoped>
  /* Estilos base */
  .instructions-page {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    text-align: center;
  }
  
  .instructions-content {
    padding: 20px;
    background-color: #000000;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .instruction-text {
    font-size: 18px;
    margin-bottom: 20px;
  }
  
  .instruction-list {
    list-style: none;
    padding: 0;
  }
  
  .instruction-list li {
    font-size: 16px;
    margin-bottom: 10px;
  }
  
  /* Estilos del botón */
  .btn-go-back {
    display: inline-block;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
  }
  
  /* Diseño responsivo */
  @media (min-width: 768px) {
    .instructions-page {
      padding: 40px;
    }
  }
  
  @media (max-width: 767px) {
    .instructions-page {
      padding: 20px;
    }
  }
  </style>
  