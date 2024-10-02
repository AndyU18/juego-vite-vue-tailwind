<template>
  <div class="game-container relative mx-auto" :style="{ width: '890px', height: '900px', backgroundColor: '#000' }">
    <!-- Pantalla del juego donde están las naves -->
    <div class="game-area relative mx-auto" :style="{ width: '100%', height: '100%' }">
      <!-- Nave del jugador -->
      <div
        class="nave bg-white absolute"
        :style="{ left: nave.x + 'px', top: nave.y + 'px', width: nave.width + 'px', height: nave.height + 'px' }"
      ></div>

      <!-- Disparos del jugador -->
      <div
        v-for="(disparo, index) in disparos"
        :key="index"
        class="disparo bg-red-500 absolute"
        :style="{ left: disparo.x + 'px', top: disparo.y + 'px', width: '5px', height: '15px' }"
      ></div>

      <!-- Enemigos -->
      <div
        v-for="(enemy, index) in enemigos"
        :key="enemy.id"
        class="enemy absolute"
        :style="{ left: enemy.x + 'px', top: enemy.y + 'px', width: '40px', height: '40px', backgroundColor: getEnemyColor(enemy.tipo) }"
      ></div>
    </div>

    <!-- Estadísticas sobre la pantalla del juego -->
    <div class="stats absolute top-0 left-0 p-4 text-white sixtyfour-convergence">
      <p>Vidas: {{ vidas }}</p>
      <p>Tiempo: {{ tiempoConDecimales }} s</p>
      <p>Puntaje: {{ puntaje }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nave: { x: 400, y: 820, width: 40, height: 40, velocidad: 5 }, // Ajustado para estar un poco arriba del borde inferior
      enemigos: [],
      disparos: [], // Almacena los disparos activos
      vidas: 3,
      tiempo: 0,
      puntaje: 0,
      direccionEnemigos: 1, // 1 = derecha, -1 = izquierda
      intervaloDisparos: null, // Control para los disparos
    };
  },
  computed: {
    tiempoConDecimales() {
      return (this.tiempo / 100).toFixed(2); // Mostrar el tiempo con dos decimales
    },
  },
  created() {
    this.crearEnemigos();
    this.startGameLoop();
    window.addEventListener('keydown', this.moverNave);
    window.addEventListener('keydown', this.disparar);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.moverNave);
    window.removeEventListener('keydown', this.disparar);
  },
  methods: {
    // Crear naves enemigas en diferentes filas y tipos
    crearEnemigos() {
      const filasEnemigos = [
        { cantidad: 5, tipo: 'A', y: 50 }, // Ajustado a 5 naves, se centrará
        { cantidad: 7, tipo: 'B', y: 100 }, // Mantener igual
        { cantidad: 7, tipo: 'B', y: 150 }, // Mantener igual
        { cantidad: 6, tipo: 'C', y: 200 }, // Ajustado a 6 naves, se centrará
        { cantidad: 6, tipo: 'C', y: 250 }, // Ajustado a 6 naves, se centrará
      ];

      filasEnemigos.forEach((fila, index) => {
        const espacio = (890 - fila.cantidad * 40) / 2; // Centramos la fila según el número de naves
        for (let i = 0; i < fila.cantidad; i++) {
          this.enemigos.push({
            id: `enemy-${index}-${i}`,
            tipo: fila.tipo,
            x: espacio + i * 60, // Espaciado entre naves
            y: fila.y,
          });
        }
      });
    },
    // Obtener color del enemigo según su tipo
    getEnemyColor(tipo) {
      switch (tipo) {
        case 'A':
          return 'red';
        case 'B':
          return 'blue';
        case 'C':
          return 'green';
        default:
          return 'gray';
      }
    },
    // Mover la nave del jugador
    moverNave(event) {
      if (event.key === 'ArrowLeft') {
        this.nave.x = Math.max(0, this.nave.x - this.nave.velocidad); // Límite izquierdo
      } else if (event.key === 'ArrowRight') {
        this.nave.x = Math.min(850, this.nave.x + this.nave.velocidad); // Límite derecho
      }
    },
    // Disparar con la tecla espacio
    disparar(event) {
      if (event.key === ' ') {
        this.crearDisparo();
      }
    },
    // Crear un disparo desde la posición de la nave del jugador
    crearDisparo() {
      const disparo = {
        x: this.nave.x + this.nave.width / 2 - 2.5, // Centrar el disparo en la nave
        y: this.nave.y - 15, // Aparece encima de la nave
        velocidad: 7,
      };
      this.disparos.push(disparo);
    },
    // Bucle principal del juego
    startGameLoop() {
      setInterval(() => {
        this.moverEnemigos();
        this.moverDisparos();
        this.detectarColisiones();
        this.tiempo += 1; // Suma el tiempo en centésimas de segundo
      }, 1000 / 60); // 60 FPS
    },
    // Mover disparos hacia arriba y eliminar los que salen de la pantalla
    moverDisparos() {
      this.disparos.forEach((disparo, index) => {
        disparo.y -= disparo.velocidad;
        if (disparo.y < 0) {
          this.disparos.splice(index, 1); // Eliminar disparo cuando sale de la pantalla
        }
      });
    },
    // Mover naves enemigas de izquierda a derecha, y viceversa
    moverEnemigos() {
      const bordeDerecho = 850; // Límite derecho de la pantalla
      const bordeIzquierdo = 0; // Límite izquierdo de la pantalla

      // Mover los enemigos en la dirección actual
      this.enemigos.forEach((enemy) => {
        enemy.x += this.direccionEnemigos * 2; // Velocidad de los enemigos
      });

      // Verificar si algún enemigo ha alcanzado el borde
      const haTocadoBordeDerecho = this.enemigos.some((enemy) => enemy.x >= bordeDerecho);
      const haTocadoBordeIzquierdo = this.enemigos.some((enemy) => enemy.x <= bordeIzquierdo);

      if (haTocadoBordeDerecho) {
        this.direccionEnemigos = -1; // Cambiar dirección hacia la izquierda
        this.bajarFilaEnemigos();
      } else if (haTocadoBordeIzquierdo) {
        this.direccionEnemigos = 1; // Cambiar dirección hacia la derecha
        this.bajarFilaEnemigos();
      }
    },
    // Bajar los enemigos una fila hacia abajo cuando alcanzan los bordes
    bajarFilaEnemigos() {
      this.enemigos.forEach((enemy) => {
        enemy.y += 20; // Bajar 20px
      });
    },
    // Detectar colisiones entre disparos y enemigos
    detectarColisiones() {
      this.disparos.forEach((disparo, disparoIndex) => {
        this.enemigos.forEach((enemy, enemyIndex) => {
          if (
            disparo.x < enemy.x + 40 &&
            disparo.x + 5 > enemy.x &&
            disparo.y < enemy.y + 40 &&
            disparo.y + 15 > enemy.y
          ) {
            // Colisión detectada
            this.enemigos.splice(enemyIndex, 1); // Eliminar enemigo
            this.disparos.splice(disparoIndex, 1); // Eliminar disparo
            this.puntaje += 100; // Aumentar puntaje
          }
        });
      });
    },
  },
};
</script>

<style scoped>
.game-container {
  position: relative;
}

.nave {
  background-color: white;
}

.disparo {
  background-color: red;
}

.enemy {
  background-color: blue;
}

.sixtyfour-convergence {
  font-family: 'SixtyFourPixelated', sans-serif;
}
</style>
