<template>
  <div class="hero" @mousemove="changeColor">
    <div class="text-center">
      <p id="line1"></p>
      <p id="line2"></p>
    </div>
    <button @click="goToMenu" class="animated-button">Ir al Menú</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import TypeIt from "typeit";

const router = useRouter();

const changeColor = (event) => {
  const x = event.clientX;
  const y = event.clientY;
  const newColor = `rgb(${x % 255}, ${y % 255}, ${(x + y) % 255})`;
  
  // Cambia el borde del contenedor en lugar del fondo
  document.querySelector('.hero').style.borderColor = newColor;
};

const goToMenu = () => {
  router.push('/menu');
};

onMounted(() => {
  // Animación para la primera línea
  new TypeIt("#line1", {
    strings: ["Bienvenido Jugador, te estaba esperando"],
    speed: 50,
    waitUntilVisible: true
  }).go();

  // Animación para la segunda línea
  new TypeIt("#line2", {
    speed: 50,
    waitUntilVisible: true
  })
    .type("¿Estás listo?")
    .go();
});
</script>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(19, 19, 19, 0.7);
  border-radius: 12px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background: transparent;
  padding: 5% 3%;
  max-width: 90%;
  overflow: hidden;
}

.text-center {
  text-align: center;
  color: rgb(252, 252, 252);
  width: 100%; /* Asegura que el texto ocupe todo el ancho disponible */
}

#line1, #line2 {
  font-size: 4vw; /* Ajusta el tamaño de fuente con vw */
  margin: 5px 0;
  white-space: nowrap; /* Evita que el texto se desplace */
  overflow: hidden; /* Evita que el texto se desborde */
  text-overflow: ellipsis; /* Muestra puntos suspensivos si hay desbordamiento */
}

.animated-button {
  margin-top: 20px;
  padding: 2% 5%;
  font-size: 2vw; /* Tamaño del botón adaptable */
  border: 2px solid rgba(19, 19, 19, 0.7);
  border-radius: 12px;
  background: transparent;
  color: rgb(254, 253, 253);
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

@media (max-width: 1024px) {
  #line1, #line2 {
    font-size: 5vw; /* Ajusta el tamaño de fuente en pantallas más pequeñas */
  }
  
  .animated-button {
    font-size: 2.5vw; /* Ajusta el tamaño del botón */
  }
}

@media (max-width: 768px) {
  #line1, #line2 {
    font-size: 7vw; /* Ajusta el tamaño en pantallas más pequeñas */
  }
  
  .animated-button {
    font-size: 3vw; /* Ajusta el tamaño del botón */
  }
}

@media (max-width: 480px) {
  #line1, #line2 {
    font-size: 8vw; /* Aumenta más la reducción en pantallas muy pequeñas */
  }
  
  .animated-button {
    font-size: 4vw; /* Ajusta aún más el tamaño del botón */
  }
}

</style>
