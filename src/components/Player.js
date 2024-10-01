export default class Player {
  constructor(x, y, velocidad) {
    this.x = x
    this.y = y
    this.velocidad = velocidad
  }

  draw(ctx) {
    ctx.fillStyle = 'white'
    ctx.fillRect(this.x, this.y, 50, 50)  // Aquí puedes usar una imagen si lo prefieres
  }

  moveLeft() {
    if (this.x > 0) {
      this.x -= this.velocidad
    }
  }

  moveRight() {
    if (this.x < 750) {
      this.x += this.velocidad
    }
  }
}
