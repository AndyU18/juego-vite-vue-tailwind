<template>
  <div></div>
</template>

<script>
export default {
  props: ['context', 'score'], // La puntuación es pasada como prop
  methods: {
    drawScore() {
      // Estilo del texto de la puntuación
      this.context.font = '30px Arial'; // Tamaño y tipo de fuente
      this.context.fillStyle = '#ffffff'; // Color del texto
      
      // Dibuja la puntuación en la esquina superior izquierda
      this.context.fillText('Score: ' + this.score, 20, 40);
    }
  }
};
</script>
