export default class Enemy {
  constructor(x, y, velocidad, tipo) {
    this.x = x
    this.y = y
    this.velocidad = velocidad
    this.tipo = tipo  // Tipo de enemigo para diferenciar sus ataques
  }

  draw(ctx) {
    // Dibuja al enemigo en el contexto del canvas
    ctx.fillStyle = this.getColor()
    ctx.fillRect(this.x, this.y, 50, 50)  // Aquí también puedes usar imágenes
  }

  update() {
    // Actualiza la posición del enemigo
    this.y += this.velocidad
    // Lógica para cambiar la dirección de movimiento o atacar podría ir aquí
  }

  getColor() {
    // Define un color basado en el tipo de enemigo
    switch (this.tipo) {
      case 1:
        return 'red'
      case 2:
        return 'green'
      case 3:
        return 'blue'
      default:
        return 'white'
    }
  }
}
