export default class Bullet {
  constructor(x, y, velocidad) {
    this.x = x
    this.y = y
    this.velocidad = velocidad
  }

  draw(ctx) {
    ctx.fillStyle = 'yellow'
    ctx.fillRect(this.x, this.y, 5, 10)  // Una bala pequeña
  }

  update() {
    this.y += this.velocidad
  }
}
