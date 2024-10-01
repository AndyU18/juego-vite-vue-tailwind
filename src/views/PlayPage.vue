<template>
    <div class="h-screen w-screen bg-black flex flex-col justify-center items-center">
      <div class="text-white text-lg mb-4">
        Tiempo de juego: {{ tiempoJuego }} segundos
        Puntaje: {{ puntaje }}
        Vidas: {{ vidas }}
      </div>
      <canvas ref="canvas" width="800" height="600" class="border border-white"></canvas>
  
      <!-- Dibujar enemigos -->
      <Enemy v-for="enemy in enemigos" :key="enemy.id" :enemy="enemy" />
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted } from 'vue'
  import Enemy from '../components/Enemy'
  
  export default {
    components: {
      Enemy
    },
    setup() {
      const canvas = ref(null)
      const ctx = ref(null)
      const tiempoJuego = ref(0)
      const puntaje = ref(0)
      const vidas = ref(3)
      const nave = ref({ x: 400, y: 550, velocidad: 5, width: 50, height: 50 })
      const balasJugador = ref([])
      const enemigos = ref([])
      const balasEnemigos = ref([])
  
      let intervalo
  
      onMounted(() => {
        ctx.value = canvas.value.getContext('2d')
        iniciarJuego()
  
        // Crear enemigos después de 5 segundos
        setTimeout(() => {
          crearEnemigos()
        }, 5000)
      })
  
      onUnmounted(() => {
        clearInterval(intervalo)
      })
  
      const iniciarJuego = () => {
        intervalo = setInterval(() => {
          actualizarJuego()
        }, 1000 / 60)
      }
  
      const actualizarJuego = () => {
        ctx.value.clearRect(0, 0, 800, 600)
        dibujarNave()
        dibujarBalas()
        dibujarEnemigos()
        actualizarTiempoJuego()
        actualizarPuntaje()
        actualizarVidas()
        verificarColisiones()
      }
  
      const dibujarNave = () => {
        ctx.value.fillStyle = 'white'
        ctx.value.fillRect(nave.value.x, nave.value.y, nave.value.width, nave.value.height)
      }
  
      const dibujarBalas = () => {
        // Dibujar balas del jugador
        balasJugador.value.forEach((bala) => {
          ctx.value.fillStyle = 'white'
          ctx.value.fillRect(bala.x, bala.y, 10, 10)
          bala.y -= 5
          if (bala.y < 0) {
            balasJugador.value.splice(balasJugador.value.indexOf(bala), 1)
          }
        })
  
        // Dibujar balas de los enemigos
        balasEnemigos.value.forEach((bala) => {
          ctx.value.fillStyle = 'red'
          ctx.value.fillRect(bala.x, bala.y, 10, 10)
          bala.y += 3
          if (bala.y > 600) {
            balasEnemigos.value.splice(balasEnemigos.value.indexOf(bala), 1)
          }
        })
      }
  
      const dibujarEnemigos = () => {
        enemigos.value.forEach((enemy) => {
          ctx.value.fillStyle = enemy.tipo === 1 ? 'blue' : enemy.tipo === 2 ? 'green' : 'red'
          ctx.value.fillRect(enemy.x, enemy.y, 40, 40)
  
          // Mover a los enemigos ligeramente
          enemy.x += enemy.velocidad
          if (enemy.x > 760 || enemy.x < 0) {
            enemy.velocidad *= -1
          }
  
          // Los enemigos disparan ocasionalmente
          if (Math.random() < 0.01) {
            balasEnemigos.value.push({ x: enemy.x + 20, y: enemy.y + 40 })
          }
        })
      }
  
      const actualizarTiempoJuego = () => {
        tiempoJuego.value += 1 / 60
      }
  
      const actualizarPuntaje = () => {
        // Actualizar puntaje según la cantidad de enemigos eliminados
      }
  
      const actualizarVidas = () => {
        // Actualizar vidas si una bala enemiga toca la nave
      }
  
      const moverNave = (direccion) => {
        if (direccion === 'izquierda') {
          nave.value.x -= nave.value.velocidad
        } else if (direccion === 'derecha') {
          nave.value.x += nave.value.velocidad
        }
      }
  
      const disparar = () => {
        balasJugador.value.push({ x: nave.value.x + 20, y: nave.value.y })
      }
  
      const verificarColisiones = () => {
        // Colisiones entre balas del jugador y enemigos
        balasJugador.value.forEach((bala, balaIndex) => {
          enemigos.value.forEach((enemy, enemyIndex) => {
            if (
              bala.x < enemy.x + 40 &&
              bala.x + 10 > enemy.x &&
              bala.y < enemy.y + 40 &&
              bala.y + 10 > enemy.y
            ) {
              // Colisión detectada
              balasJugador.value.splice(balaIndex, 1)
              enemigos.value.splice(enemyIndex, 1)
              puntaje.value += 10
            }
          })
        })
  
        // Colisiones entre balas de enemigos y la nave
        balasEnemigos.value.forEach((bala, balaIndex) => {
          if (
            bala.x < nave.value.x + nave.value.width &&
            bala.x + 10 > nave.value.x &&
            bala.y < nave.value.y + nave.value.height &&
            bala.y + 10 > nave.value.y
          ) {
            // Colisión detectada
            balasEnemigos.value.splice(balaIndex, 1)
            vidas.value -= 1
            if (vidas.value === 0) {
              alert('Game Over')
              clearInterval(intervalo)
            }
          }
        })
      }
  
      const crearEnemigos = () => {
        let id = 1
  
        // Crear fila de enemigos tipo 1 (5 enemigos)
        for (let i = 0; i < 5; i++) {
          enemigos.value.push({
            id: id++,
            x: 100 + i * 120,
            y: 50,
            tipo: 1,
            velocidad: 1,
            vida: 1,
            balas: [],
            disparoMultiple: true
          })
        }
  
        // Crear dos filas de enemigos tipo 2 (8 enemigos por fila)
        for (let fila = 1; fila <= 2; fila++) {
          for (let i = 0; i < 8; i++) {
            enemigos.value.push({
              id: id++,
              x: 50 + i * 90,
              y: 100 + fila * 60,
              tipo: 2,
              velocidad: 1.5,
              vida: 2,
              balas: [],
              disparoMultiple: false
            })
          }
        }
  
        // Crear dos filas de enemigos tipo 3 (10 enemigos por fila)
        for (let fila = 1; fila <= 2; fila++) {
          for (let i = 0; i < 10; i++) {
            enemigos.value.push({
              id: id++,
              x: 30 + i * 75,
              y: 220 + fila * 60,
              tipo: 3,
              velocidad: 2,
              vida: 3,
              balas: [],
              disparoMultiple: false
            })
          }
        }
      }
  
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          moverNave('izquierda')
        } else if (e.key === 'ArrowRight') {
          moverNave('derecha')
        } else if (e.key === ' ') {
          disparar()
        }
      })
  
      return {
        tiempoJuego,
        puntaje,
        vidas,
        nave,
        enemigos,
        balasJugador,
        balasEnemigos
      }
    }
  }
  </script>
  
  <style scoped>
  /* Agrega estilos si lo necesitas */
  </style>
  