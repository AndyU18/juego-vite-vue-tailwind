<template>
    <div></div>
  </template>
  
  <script>
  export default {
    props: ['context', 'bulletArray'],
    methods: {
      updateBullets() {
        for (let bullet of this.bulletArray) {
          bullet.y -= 10;
          this.context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        }
      }
    }
  };
  </script>
  