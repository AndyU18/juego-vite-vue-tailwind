<template>
  <div></div>
</template>

<script>
export default {
  props: ['context', 'ship', 'shipImg', 'canvasWidth', 'canvasHeight'], // Props necesarias
  mounted() {
    // Precargar la imagen de la nave
    this.shipImg.src = '/ship.png'; // Ruta a la imagen de la nave
    this.shipImg.onload = () => {
      console.log("Imagen de la nave cargada");
    };
  },
  methods: {
    updateShip() {
      // Asegurar que la nave no salga de los límites del canvas
      if (this.ship.x < 0) {
        this.ship.x = 0;
      } else if (this.ship.x + this.ship.width > this.canvasWidth) {
        this.ship.x = this.canvasWidth - this.ship.width;
      }

      if (this.ship.y < 0) {
        this.ship.y = 0;
      } else if (this.ship.y + this.ship.height > this.canvasHeight) {
        this.ship.y = this.canvasHeight - this.ship.height;
      }

      // Dibujar la nave en su posición actual
      this.context.drawImage(this.shipImg, this.ship.x, this.ship.y, this.ship.width, this.ship.height);
    },

    // Método para mover la nave (se puede invocar desde el controlador de teclado)
    moveShip(direction) {
      const speed = 10; // Velocidad de movimiento de la nave
      if (direction === 'left') {
        this.ship.x -= speed;
      } else if (direction === 'right') {
        this.ship.x += speed;
      } else if (direction === 'up') {
        this.ship.y -= speed;
      } else if (direction === 'down') {
        this.ship.y += speed;
      }

      // Asegurarse de que la nave no se salga de los límites (ya validado en `updateShip`)
      this.updateShip();
    }
  }
};
</script>
