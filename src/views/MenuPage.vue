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
  </div>
</template>

<script setup>
const handlePlay = () => {
  // lógica para el botón Jugar
};

const handleSettings = () => {
  // lógica para el botón Configuraciones
};

const handleHowToPlay = () => {
  // lógica para el botón Cómo Jugar
};

const handleExit = () => {
  // lógica para el botón Salir
};
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
</style>
