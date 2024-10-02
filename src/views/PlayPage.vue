<template>
  <div class="h-screen w-screen bg-black flex flex-col justify-center items-center relative overflow-hidden">
    <div class="text-white text-lg mb-4 absolute top-0 left-0 p-4">
      Tiempo de juego: {{ tiempoJuego }} segundos <br />
      Puntaje: {{ puntaje }} <br />
      Vidas: {{ vidas }}
    </div>
    
    <!-- Nave del jugador -->
    <div
      class="nave bg-white"
      :style="{ left: nave.x + 'px', top: nave.y + 'px', width: nave.width + 'px', height: nave.height + 'px' }"
    ></div>
    
    <!-- Balas del jugador -->
    <div
      v-for="(bala, index) in balasJugador"
      :key="index"
      class="bala bg-white"
      :style="{ left: bala.x + 'px', top: bala.y + 'px', width: '10px', height: '10px' }"
    ></div>

    <!-- Enemigos -->
    <div
      v-for="(enemy, index) in enemigos"
      :key="enemy.id"
      class="enemy"
      :style="{ left: enemy.x + 'px', top: enemy.y + 'px', width: '40px', height: '40px', backgroundColor: getEnemyColor(enemy.tipo) }"
    ></div>

    <!-- Balas de enemigos -->
    <div
      v-for="(bala, index) in balasEnemigos"
      :key="index"
      class="bala-enemiga bg-red-500"
      :style="{ left: bala.x + 'px', top: bala.y + 'px', width: '10px', height: '10px' }"
    ></div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  setup() {
    const tiempoJuego = ref(0);
    const puntaje = ref(0);
    const vidas = ref(3);
    const nave = ref({ x: 400, y: 550, velocidad: 10, width: 50, height: 50 });
    const balasJugador = ref([]);
    const enemigos = ref([]);
    const balasEnemigos = ref([]);

    let intervalo;

    onMounted(() => {
      iniciarJuego();
      crearEnemigos();
    });

    onUnmounted(() => {
      clearInterval(intervalo);
    });

    const iniciarJuego = () => {
      intervalo = setInterval(() => {
        moverBalas();
        moverEnemigos();
        verificarColisiones();
        tiempoJuego.value += 1 / 60;
      }, 1000 / 60);
    };

    const moverBalas = () => {
      // Mueve las balas del jugador
      balasJugador.value.forEach((bala, index) => {
        bala.y -= 5;
        if (bala.y < 0) balasJugador.value.splice(index, 1);
      });

      // Mueve las balas de los enemigos
      balasEnemigos.value.forEach((bala, index) => {
        bala.y += 3;
        if (bala.y > 600) balasEnemigos.value.splice(index, 1);
      });
    };

    const moverEnemigos = () => {
      enemigos.value.forEach((enemy) => {
        enemy.x += enemy.velocidad;
        if (enemy.x > 760 || enemy.x < 0) enemy.velocidad *= -1;
      });
    };

    const disparar = () => {
      balasJugador.value.push({ x: nave.value.x + 20, y: nave.value.y });
    };

    const verificarColisiones = () => {
      balasJugador.value.forEach((bala, balaIndex) => {
        enemigos.value.forEach((enemy, enemyIndex) => {
          if (
            bala.x < enemy.x + 40 &&
            bala.x + 10 > enemy.x &&
            bala.y < enemy.y + 40 &&
            bala.y + 10 > enemy.y
          ) {
            balasJugador.value.splice(balaIndex, 1);
            enemigos.value.splice(enemyIndex, 1);
            puntaje.value += 10;
          }
        });
      });
    };

    const crearEnemigos = () => {
      let id = 1;
      for (let i = 0; i < 5; i++) {
        enemigos.value.push({
          id: id++,
          x: 100 + i * 120,
          y: 50,
          tipo: 1,
          velocidad: 1,
        });
      }
    };

    const moverNave = (direccion) => {
      if (direccion === 'izquierda' && nave.value.x > 0) {
        nave.value.x -= nave.value.velocidad;
      } else if (direccion === 'derecha' && nave.value.x < 750) {
        nave.value.x += nave.value.velocidad;
      }
    };

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') moverNave('izquierda');
      if (e.key === 'ArrowRight') moverNave('derecha');
      if (e.key === ' ') disparar();
    });

    return {
      tiempoJuego,
      puntaje,
      vidas,
      nave,
      balasJugador,
      enemigos,
      balasEnemigos,
      getEnemyColor(tipo) {
        return tipo === 1 ? 'blue' : 'red';
      },
    };
  },
};
</script>

<style scoped>
.nave {
  position: absolute;
}

.enemy {
  position: absolute;
  border: 2px solid white;
}

.bala,
.bala-enemiga {
  position: absolute;
}
</style>
