export default class Player {
  constructor(x, y, velocidad) {
    this.x = x
    this.y = y
    this.velocidad = velocidad
    this.width = 50 // Tamaño del jugador
    this.height = 50
  }

  draw(ctx) {
    // Dibuja al jugador en el canvas
    ctx.fillStyle = 'white'
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  moveLeft() {
    // Mueve al jugador a la izquierda
    if (this.x > 0) {
      this.x -= this.velocidad
    }
  }

  moveRight() {
    // Mueve al jugador a la derecha
    if (this.x + this.width < 800) {  // Ajustado para un canvas de 800 de ancho
      this.x += this.velocidad
    }
  }
}
