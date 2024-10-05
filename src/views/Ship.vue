<template>
    <div></div>
  </template>
  
  <script>
  export default {
    props: ['x', 'y', 'width', 'height', 'context'],
    data() {
      return {
        shipImg: new Image(),
      };
    },
    mounted() {
      this.shipImg.src = '/ship.png'; // Ruta a la imagen
    },
    methods: {
      updateShip() {
        this.context.drawImage(this.shipImg, this.x, this.y, this.width, this.height);
      },
      moveShip(e) {
        if (e.code === "ArrowLeft" && this.x > 0) {
          this.x -= this.$parent.ship.velocityX;
        } else if (e.code === "ArrowRight" && this.x + this.width < this.$parent.boardWidth) {
          this.x += this.$parent.ship.velocityX;
        }
      }
    }
  };
  </script>
  