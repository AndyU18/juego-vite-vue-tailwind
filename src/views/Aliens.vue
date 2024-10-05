<template>
    <div></div>
  </template>
  
  <script>
  export default {
    props: ['context', 'alienArray', 'alienImg'],
    mounted() {
      this.alienImg.src = '/alien.png'; // Ruta a la imagen
    },
    methods: {
      updateAliens() {
        for (let alien of this.alienArray) {
          if (alien.alive) {
            alien.x += this.$parent.alienVelocityX;
            this.context.drawImage(this.alienImg, alien.x, alien.y, this.$parent.tileSize * 2, this.$parent.tileSize);
          }
        }
      }
    }
  };
  </script>
  