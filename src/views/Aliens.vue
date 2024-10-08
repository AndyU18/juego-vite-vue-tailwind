<template>
  <div></div>
</template>

<script>
export default {
  props: ['context', 'alienArray', 'alienImg', 'alienVelocityX', 'tileSize'], // Pasamos más props desde el padre
  mounted() {
    // Pre-cargar la imagen del alienígena y verificar que esté lista antes de usarla
    this.alienImg.src = './alien.png'; // Ruta a la imagen
    this.alienImg.onload = () => {
      console.log("Imagen del alien cargada");
    };
  },
  methods: {
    updateAliens() {
      // Recorre el array de alienígenas y actualiza su posición
      for (let alien of this.alienArray) {
        if (alien.alive) {
          alien.x += this.alienVelocityX; // Mover alien a lo largo del eje X
          
          // Dibujar la imagen del alien en el canvas
          this.context.drawImage(this.alienImg, alien.x, alien.y, this.tileSize * 2, this.tileSize);

          // Condición para evitar que los alienígenas salgan de la pantalla (si es necesario)
          if (alien.x + this.tileSize * 2 < 0 || alien.x > this.context.canvas.width) {
            alien.alive = false; // Marcar como "muerto" o realizar alguna otra acción
          }
        }
      }

      // Filtrar los alienígenas muertos para que no se sigan dibujando
      this.alienArray = this.alienArray.filter(alien => alien.alive);
    }
  }
};
</script>
