<template>
  <div></div>
</template>

<script>
export default {
  props: ['context', 'bulletArray'],
  methods: {
    updateBullets() {
      // Recorre el arreglo de balas y actualiza la posición
      for (let i = this.bulletArray.length - 1; i >= 0; i--) {
        let bullet = this.bulletArray[i];
        bullet.y -= 10;  // Mueve la bala hacia arriba

        // Dibuja la bala
        this.context.fillStyle = "white";
        this.context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

        // Elimina balas que ya no están visibles
        if (bullet.y + bullet.height < 0) {
          this.bulletArray.splice(i, 1); // Elimina la bala del array
        }
      }
    }
  }
};
</script>
