<template>
    <div class="flex flex-col items-center">
      <h1 class="text-3xl font-bold mb-4">Space Invaders</h1>
      <canvas ref="board" class="border border-gray-500"></canvas>
      <Score :score="score" />
    </div>
  </template>
  
  <script>
  import Ship from './Ship.vue';
  import Aliens from './Aliens.vue';
  import Bullet from './Bullet.vue';
  import Score from './Score.vue';
  
  export default {
    components: { Ship, Aliens, Bullet, Score },
    data() {
      return {
        tileSize: 32,
        rows: 16,
        columns: 16,
        boardWidth: 32 * 16,
        boardHeight: 32 * 16,
        context: null,
        ship: { x: 32 * 16 / 2 - 32, y: 32 * 16 - 64, width: 64, height: 32, velocityX: 32 },
        bulletArray: [],
        alienArray: [],
        alienColumns: 3,
        alienRows: 2,
        alienVelocityX: 1,
        score: 0,
        gameOver: false
      };
    },
    mounted() {
      this.initializeGame();
      window.addEventListener("keydown", this.moveShip);
      window.addEventListener("keyup", this.shootBullet);
      requestAnimationFrame(this.updateGame);
    },
    methods: {
      initializeGame() {
        const canvas = this.$refs.board;
        canvas.width = this.boardWidth;
        canvas.height = this.boardHeight;
        this.context = canvas.getContext('2d');
        this.createAliens();
      },
      updateGame() {
        if (this.gameOver) return;
  
        this.context.clearRect(0, 0, this.boardWidth, this.boardHeight);
  
        // Actualizar nave, aliens y balas
        this.$refs.ship.updateShip();
        this.$refs.aliens.updateAliens();
        this.updateBullets();
  
        requestAnimationFrame(this.updateGame);
      },
      createAliens() {
        this.alienArray = [];
        for (let c = 0; c < this.alienColumns; c++) {
          for (let r = 0; r < this.alienRows; r++) {
            this.alienArray.push({ x: c * this.tileSize * 2, y: r * this.tileSize, alive: true });
          }
        }
      },
      moveShip(e) {
        this.$refs.ship.moveShip(e);
      },
      shootBullet(e) {
        if (e.code === "Space") {
          this.bulletArray.push({
            x: this.ship.x + this.ship.width / 2 - this.tileSize / 16,
            y: this.ship.y,
            width: this.tileSize / 8,
            height: this.tileSize / 2,
            used: false
          });
        }
      },
      updateBullets() {
        for (let i = 0; i < this.bulletArray.length; i++) {
          const bullet = this.bulletArray[i];
          bullet.y += -10;
          this.context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
          this.detectBulletCollision(bullet, i);
        }
        this.bulletArray = this.bulletArray.filter(b => !b.used && b.y > 0);
      },
      detectBulletCollision(bullet, index) {
        for (let alien of this.alienArray) {
          if (!bullet.used && alien.alive && this.detectCollision(bullet, alien)) {
            bullet.used = true;
            alien.alive = false;
            this.score += 100;
          }
        }
      },
      detectCollision(a, b) {
        return a.x < b.x + this.tileSize * 2 &&
               a.x + a.width > b.x &&
               a.y < b.y + this.tileSize &&
               a.y + a.height > b.y;
      }
    },
  };
  </script>
  
  <style scoped>
  canvas {
    background-color: black;
  }
  </style>
  