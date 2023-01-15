let canvas = document.querySelector('canvas')
console.log(canvas)

let c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight


class Boundary {
  constructor(position) {
    this.position = position
    this.width = 40
    this.height = 40
  }

  draw() {
    c.fillStyle = "blue"
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

let boundary = new Boundary({x: 0, y: 0})
boundary.draw()