<!-- Codigo Funcional y bueno no Responsivo-->
<template>
  <div>
    <!-- Botón para regresar al menú -->
    <button @click="irAlMenu" class="btn-regresar absolute top-0 left-0 m-4 p-2 bg-gray-800 text-white">
      Regresar al Menú
    </button>

    <div class="game-container relative mx-auto" :style="{ width: '890px', height: '900px', backgroundColor: '#000' }">
      <!-- Pantalla del juego donde están las naves -->
      <div class="game-area relative mx-auto" :style="{ width: '100%', height: '100%' }">
        <!-- Nave del jugador -->
        <div
          class="nave absolute"
          :style="{ left: nave.x + 'px', top: nave.y + 'px', width: nave.width + 'px', height: nave.height + 'px', backgroundColor: nave.color }"
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
          :style="{ left: enemy.x + 'px', top: enemy.y + 'px', width: '35px', height: '35px', backgroundColor: getEnemyColor(enemy.tipo) }"
        ></div>

        <!-- Disparos de enemigos -->
        <div
          v-for="(disparoEnemigo, index) in disparosEnemigos"
          :key="index"
          class="disparo-enemigo absolute"
          :style="{ left: disparoEnemigo.x + 'px', top: disparoEnemigo.y + 'px', width: disparoEnemigo.width + 'px', height: disparoEnemigo.height + 'px', backgroundColor: disparoEnemigo.color }"
        ></div>
      </div>

      <!-- Estadísticas sobre la pantalla del juego -->
      <div class="stats absolute top-0 left-0 p-4 text-white stats-font">
        <p>Vidas: {{ vidas }}</p>
        <p>Tiempo: {{ tiempoConDecimales }} s</p>
        <p>Puntaje: {{ puntaje }}</p>
      </div>
    </div>
  </div>
</template>  
  <script>

  import colisionSound from '../assets/sounds/colision.mp3';
  import disparoJugadorSound from '../assets/sounds/disparo_jugador.mp3';
  import disparoEnemigoSound from '../assets/sounds/disparo_enemigo.mp3';
  export default {
    data() {
      return {
        nave: { x: 400, y: 820, width: 40, height: 40, velocidad: 5, color: 'white' }, // Ajustado para estar un poco arriba del borde inferior
        enemigos: [],
        disparos: [], // Almacena los disparos del jugador
        disparosEnemigos: [], // Almacena los disparos de los enemigos
        vidas: 3,
        tiempo: 0,
        puntaje: 0,
        direccionEnemigos: 1, // 1 = derecha, -1 = izquierda
        intervaloDisparos: null, // Control para los disparos
        gameLoopInterval: null, // Control para el bucle del juego
        juegoActivo: true,
      };
    },
    computed: {
      tiempoConDecimales() {
        return (this.tiempo / 100).toFixed(2); // Mostrar el tiempo con dos decimales
      },
    },
    created() {
      this.resetGameState();
      this.crearEnemigos();
      this.startGameLoop();
      this.iniciarAtaquesEnemigos(); // Iniciar ataques cada 3 segundos
      window.addEventListener('keydown', this.moverNave);
      window.addEventListener('keydown', this.disparar);
    },
    beforeDestroy() {
        console.log('beforeDestroy called');
      // Limpiar intervalos y detener lógica del juego
      
      clearInterval(this.gameLoopInterval);
      clearInterval(this.intervaloDisparos);
      window.removeEventListener('keydown', this.moverNave);
      window.removeEventListener('keydown', this.disparar);
    },
    methods: {
        checkCollision() {
            const naveJugador = this.$refs.naveJugador; // Asumiendo que tienes una referencia a la nave del jugador
            const naveJugadorRect = naveJugador.getBoundingClientRect();

            this.enemigos.forEach(enemigo => {
                const enemigoRect = enemigo.getBoundingClientRect();
                //Verificar colision
                const colision = !(
                  enemigoRect.right < naveJugadorRect.left ||
                  enemigoRect.left > naveJugadorRect.right ||
                  enemigoRect.bottom < naveJugadorRect.top ||
                  enemigoRect.top > naveJugadorRect.bottom
                );
                if(colision){
                  this.juegoTerminado();
                  this.finalizarJuego();
                }
            });
            },
        resetGameState() {
            this.nave = { x: 400, y: 820, width: 40, height: 40, velocidad: 5, color: 'white' };
            this.enemigos = [];
            this.disparos = [];
            this.disparosEnemigos = [];
            this.vidas = 3;
            this.tiempo = 0;
            this.puntaje = 0;
            this.direccionEnemigos = 1;
            this.juegoActivo = true; // Reiniciar la bandera de juego activo
        },
      // Crear naves enemigas en diferentes filas y tipos
      crearEnemigos() {
        const filasEnemigos = [
          { cantidad: 5, tipo: 'A', y: 50 },
          { cantidad: 7, tipo: 'B', y: 100 },
          { cantidad: 7, tipo: 'B', y: 150 },
          { cantidad: 6, tipo: 'C', y: 200 },
          { cantidad: 6, tipo: 'C', y: 250 },
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
        // Método para regresar al menú
        irAlMenu() {
            this.juegoActivo = false;

            // Limpiar intervalos y detener lógica del juego
            clearInterval(this.gameLoopInterval);
            clearInterval(this.intervaloDisparos);
            
            window.removeEventListener('keydown', this.moverNave);
            window.removeEventListener('keydown', this.disparar);

            // Navegar al MenuPage
            this.$router.push({ name: 'MenuPage' });
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

        // Reproducir sonido de disparo del jugador
        const audio = new Audio(disparoJugadorSound);
        audio.play();
      },
      // Bucle principal del juego
      startGameLoop() {
        this.gameLoopInterval = setInterval(() => {
            if (!this.juegoActivo) return;
            // Lógica del bucle del juego
            this.moverEnemigos();
            this.moverDisparos();
            this.moverDisparosEnemigos();
            //detectar colisiones
            this.detectarColisiones();

            //verificar colisiones con el jugador
            this.enemigos.forEach((enemigo) =>{
              this.checkCollision(this.nave, enemigo);
            });
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
      // Mover disparos enemigos hacia abajo y eliminarlos cuando salen de la pantalla
      moverDisparosEnemigos() {
        this.disparosEnemigos.forEach((disparo, index) => {
          disparo.y += disparo.velocidad;
          if (disparo.y > 900) {
            this.disparosEnemigos.splice(index, 1); // Eliminar disparo enemigo cuando sale de la pantalla
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
      // Bajar las naves enemigas una fila cuando cambian de dirección
      bajarFilaEnemigos() {
        this.enemigos.forEach((enemy) => {
          enemy.y += 20; // Bajamos 20 píxeles
        });
      },
      // Iniciar ataques enemigos
      iniciarAtaquesEnemigos() {
        this.intervaloDisparos = setInterval(() => {
          if (!this.juegoActivo) return;

          const navesVivas = this.enemigos.filter((enemy) => !enemy.destruido);
          if (navesVivas.length === 0) return;
  
          // Seleccionar 2 naves vivas aleatoriamente para disparar
          const navesSeleccionadas = [];
          while (navesSeleccionadas.length < 2) {
            const naveAleatoria = navesVivas[Math.floor(Math.random() * navesVivas.length)];
            if (!navesSeleccionadas.includes(naveAleatoria)) {
              navesSeleccionadas.push(naveAleatoria);
            }
          }
  
          // Hacer que las naves seleccionadas disparen
          navesSeleccionadas.forEach((nave) => this.disparoEnemigo(nave));
        }, 4500); // Cada 3 segundos
      },
      // Generar disparos según el tipo de nave enemiga
      disparoEnemigo(nave) {
        if (nave.tipo === 'A') {
          // Disparo de bala pequeña y rápida
          this.disparosEnemigos.push({
            x: nave.x + 20, // Centrar el disparo en la nave
            y: nave.y + 40,
            velocidad: 6,
            width: 5,
            height: 10,
            color: 'yellow',
          });
        } else if (nave.tipo === 'B') {
          // Disparo de torpedo
          this.disparosEnemigos.push({
            x: nave.x + 20,
            y: nave.y + 40,
            velocidad: 4,
            width: 5,
            height: 20,
            color: 'orange',
          });
        } else if (nave.tipo === 'C') {
          // Disparo de escopeta (3 balas con ángulos diferentes)
          const baseX = nave.x + 20;
          const baseY = nave.y + 40;
  
          // Bala central
          this.disparosEnemigos.push({
            x: baseX,
            y: baseY,
            velocidad: 5,
            width: 5,
            height: 15,
            color: 'lightgreen',
          });
  
          // Bala con ángulo a la derecha (30 grados)
          this.disparosEnemigos.push({
            x: baseX + 10,
            y: baseY,
            velocidad: 5,
            width: 5,
            height: 15,
            color: 'lightgreen',
          });
  
          // Bala con ángulo a la izquierda (30 grados)
          this.disparosEnemigos.push({
            x: baseX - 10,
            y: baseY,
            velocidad: 5,
            width: 5,
            height: 15,
            color: 'lightgreen',
          });
        }

        // Reproducir sonido de disparo enemigo
        const audio = new Audio(disparoEnemigoSound);
        audio.play();
      },
      // Detectar colisiones entre disparos del jugador y enemigos, y entre disparos enemigos y la nave del jugador
      detectarColisiones() {
        // Colisiones entre disparos del jugador y enemigos
        this.disparos.forEach((disparo, disparoIndex) => {
          this.enemigos.forEach((enemy, enemyIndex) => {
            if (
              disparo.x < enemy.x + 40 &&
              disparo.x + 5 > enemy.x &&
              disparo.y < enemy.y + 40 &&
              disparo.y + 15 > enemy.y
            ) {
              // Colisión detectada: eliminar enemigo y disparo
              this.enemigos.splice(enemyIndex, 1);
              this.disparos.splice(disparoIndex, 1);
              this.puntaje += 100; // Aumentar puntaje

              // Reproducir sonido de colisión
              const audio = new Audio(colisionSound);
              audio.play();

                // Detener el sonido después de 1 segundo
                setTimeout(() => {
                    audio.pause();
                    audio.currentTime = 0;
                }, 1000);
            }
           
          });
        });
  
        // Colisiones entre disparos enemigos y la nave del jugador
        this.disparosEnemigos.forEach((disparoEnemigo, disparoEnemigoIndex) => {
          if (
            disparoEnemigo.x < this.nave.x + this.nave.width &&
            disparoEnemigo.x + disparoEnemigo.width > this.nave.x &&
            disparoEnemigo.y < this.nave.y + this.nave.height &&
            disparoEnemigo.y + disparoEnemigo.height > this.nave.y
          ) {
            // Colisión detectada: eliminar disparo enemigo y reducir vida del jugador
            this.disparosEnemigos.splice(disparoEnemigoIndex, 1);
            this.vidas -= 1;

            // Reproducir sonido de colisión
            const audio = new Audio(colisionSound);
            audio.play();
  
            // Cambiar color de la nave a rojo temporalmente
            this.nave.color = 'red';
            setTimeout(() => {
              this.nave.color = 'white';
            }, 200);
          }
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
  
  .disparo-enemigo {
    background-color: yellow;
  }
  
  .stats-font {
    font-family: 'SixtyFourPixelated', sans-serif;
  }
  </style>
  