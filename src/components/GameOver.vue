<template>
    <div class="game-over">
      <h1>Game Over</h1>
      <img src="../assets/danger-icon.svg" alt="Peligro" class="danger-icon">
      <p>Suerte para la Próxima</p>
      <p>Tus estadísticas son:</p>
      <ul>
        <li>Vidas: {{ vidas }}</li>
        <li>Tiempo: {{ tiempoConDecimales }} s</li>
        <li>Puntaje: {{ puntaje }}</li>
      </ul>
      <input v-model="nickname" placeholder="Introduce tu nombre/nickname">
      <button @click="salir">Salir</button>
    </div>
  </template>
  
  <script>
  export default {
    props: ['vidas', 'tiempoConDecimales', 'puntaje'],
    data() {
      return {
        nickname: ''
      };
    },
    methods: {
      salir() {
        // Lógica para guardar las estadísticas y redirigir al menú principal
        this.$router.push({ name: 'MenuPage' });
      }
    }
  };
  </script>
  
  <style>
  .game-over {
    text-align: center;
    padding: 20px;
  }
  .danger-icon {
    width: 100px;
    height: 100px;
  }
  </style>