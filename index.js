let canvas = document.querySelector('canvas')
console.log(canvas)

let c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

BOUNDARY_WIDTH = 40
BOUNDARY_HEIGHT = 40


class Boundary {
  constructor(position) {
    this.position = position
    this.width = BOUNDARY_WIDTH
    this.height = BOUNDARY_HEIGHT
  }

  draw() {
    c.fillStyle = "blue"
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

let map = [
  ["-", "-", "-", "-", "-", "-"],
  ["-", " ", " ", " ", " ", "-"],
  ["-", " ", "-", "-", " ", "-"],
  ["-", " ", " ", " ", " ", "-"],
  ["-", "-", "-", "-", "-", "-"]
]

let boundaries = []

map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    console.log(symbol)
    switch(symbol) {
      case "-":
        positionX = BOUNDARY_WIDTH*j
        positionY = BOUNDARY_HEIGHT*i
        boundaries.push(new Boundary({x:positionX, y:positionY}))
        break
    }
  })
})

boundaries.forEach(boundary => {
  boundary.draw()
})