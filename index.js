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

let map = [
  ["-", "-", "-", "-", "-", "-"],
  ["-", " ", " ", " ", " ", "-"],
  ["-", " ", " ", " ", " ", "-"],
  ["-", "-", "-", "-", "-", "-"]
]

let boundaries = []

map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    console.log(symbol)
    switch(symbol) {
      case "-":
        positionX = 40*j
        positionY = 40*i
        boundaries.push(new Boundary({x:positionX, y:positionY}))
        break
    }
  })
})

boundaries.forEach(boundary => {
  boundary.draw()
})