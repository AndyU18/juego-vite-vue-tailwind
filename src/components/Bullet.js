export default class Bullet {
  constructor(x, y, velocidad) {
    this.x = x
    this.y = y
    this.velocidad = velocidad
  }

  draw(ctx) {
    // Dibuja la bala en el canvas
    ctx.fillStyle = 'yellow'
    ctx.fillRect(this.x, this.y, 5, 10)  // Una bala pequeña
  }

  update() {
    // Mueve la bala hacia arriba o hacia abajo según su velocidad
    this.y += this.velocidad
  }
}
