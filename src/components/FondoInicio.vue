<template>
    <div ref="vantaNet" class="vanta-background">
      <!-- Aquí puedes agregar más contenido si lo deseas -->
      <slot />
    </div>
</template>
  
<script>
  export default {
    mounted() {
      // Cargar Three.js y Vanta.js
      const loadScripts = async () => {
        const threeScript = document.createElement('script');
        threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
        document.body.appendChild(threeScript);
  
        threeScript.onload = () => {
          const vantaScript = document.createElement('script');
          vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta/dist/vanta.net.min.js';
          document.body.appendChild(vantaScript);
  
          vantaScript.onload = () => {
            // Iniciar Vanta.js
            this.initVantaNet();
          };
        };
      };
  
      loadScripts();
    },
    methods: {
      initVantaNet() {
        this.vantaEffect = window.VANTA.NET({
          el: this.$refs.vantaNet,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0xa9637b,
          backgroundColor: 0x341e5b,
          points: 13.00,
          maxDistance: 28.00,
          spacing: 18.00
        });
      }
    },
    beforeDestroy() {
      // Destruir el efecto de Vanta.js al destruir el componente
      if (this.vantaEffect) this.vantaEffect.destroy();
    }
  };
</script>
  
<style>

  .vanta-background {
    width: 100%;
    height: 100vh; /* O el tamaño que desees */
    position: relative;
    
  }
</style>
  