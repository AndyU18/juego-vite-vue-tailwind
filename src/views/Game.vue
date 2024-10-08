<template>
  <div class="game-container">
    <canvas id="gameCanvas" ref="gameCanvas"></canvas>
    <!-- Componentes para modularizar las partes del juego -->
    <Bullet :context="context" :bulletArray="bulletArray" />
    <Alien :context="context" :alienArray="alienArray" :alienImg="alienImg" />
    <Ship :context="context" :ship="ship" />
    <Score :context="context" :score="score" />
  </div>
</template>

<script>
import Bullet from './Bullet.vue';
import Alien from './Alien.vue';
import Ship from './Ship.vue';
import Score from './Score.vue';

export default {
  components: {
    Bullet,
    Alien,
    Ship,
    Score,
  },
  data() {
    return {
      context: null,
      tileSize: 32,
      rows: 16,
      columns: 16,
      ship: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        velocityX: 5, // Velocidad de la nave
        img: new Image(),
      },
      bulletArray: [], // Array para almacenar las balas disparadas
      alienArray: [],  // Array para almacenar los aliens
      alienImg: new Image(),
      score: 0,  // Puntaje inicial
      gameOver: false,  // Estado del juego
    };
  },
  mounted() {
    // Configurar el canvas y cargar los recursos al montar el componente
    this.initializeCanvas();
    this.initializeGameObjects();
    requestAnimationFrame(this.gameLoop);  // Inicia el ciclo del juego
    window.addEventListener('keydown', this.handleKeyDown);
  },
  methods: {
    initializeCanvas() {
      // Inicializa el canvas
      const canvas = this.$refs.gameCanvas;
      canvas.width = this.tileSize * this.columns;
      canvas.height = this.tileSize * this.rows;
      this.context = canvas.getContext('2d');
    },
    initializeGameObjects() {
      // Inicializa la nave
      this.ship.x = (this.columns * this.tileSize) / 2 - this.tileSize;
      this.ship.y = this.rows * this.tileSize - this.tileSize * 2;
      this.ship.width = this.tileSize * 2;
      this.ship.height = this.tileSize;
      this.ship.img.src = './ship.png';  // Ruta de la imagen de la nave

      // Inicializa los aliens
      this.alienImg.src = './alien.png';  // Ruta de la imagen de los aliens
      this.createAliens();
    },
    createAliens() {
      // Crear un grupo inicial de aliens
      const alienRows = 2;
      const alienColumns = 3;
      for (let c = 0; c < alienColumns; c++) {
        for (let r = 0; r < alienRows; r++) {
          this.alienArray.push({
            x: this.tileSize + c * this.tileSize * 2,
            y: this.tileSize + r * this.tileSize,
            width: this.tileSize * 2,
            height: this.tileSize,
            alive: true,
          });
        }
      }
    },
    gameLoop() {
      if (this.gameOver) return;  // Si el juego terminó, no continuar

      // Limpiar el canvas antes de redibujar
      this.context.clearRect(0, 0, this.$refs.gameCanvas.width, this.$refs.gameCanvas.height);

      // Actualizar y dibujar los componentes del juego
      this.$refs.ship.updateShip();  // Actualizar la nave
      this.$refs.alien.updateAliens();  // Actualizar los aliens
      this.$refs.bullet.updateBullets();  // Actualizar las balas
      this.$refs.score.drawScore();  // Mostrar la puntuación

      // Continuar el ciclo del juego
      requestAnimationFrame(this.gameLoop);
    },
    handleKeyDown(e) {
      // Manejar las teclas para mover la nave o disparar balas
      if (e.code === 'ArrowLeft' && this.ship.x > 0) {
        this.ship.x -= this.ship.velocityX;  // Mover la nave hacia la izquierda
      } else if (e.code === 'ArrowRight' && this.ship.x + this.ship.width < this.tileSize * this.columns) {
        this.ship.x += this.ship.velocityX;  // Mover la nave hacia la derecha
      } else if (e.code === 'Space') {
        // Disparar balas al presionar la barra espaciadora
        this.bulletArray.push({
          x: this.ship.x + this.ship.width / 2 - 2,
          y: this.ship.y,
          width: 5,
          height: 20,
          used: false,
        });
      }
    },
  },
  beforeDestroy() {
    // Remover el evento de teclado cuando el componente se destruye
    window.removeEventListener('keydown', this.handleKeyDown);
  },
};
</script>

<style scoped>
.game-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

canvas {
  background-color: black;
  border: 2px solid white;
}
</style>
