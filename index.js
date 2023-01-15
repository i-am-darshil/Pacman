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

class Player {
  constructor(position, velocity) {
    this.position = position
    this.velocity = velocity
    this.radius = 15
  }

  draw() {
    c.beginPath()
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    c.fillStyle = "yellow"
    c.fill()
    c.closePath()
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
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
// let player = new Player({x:40, y:40}, {x:0, y: 0})
let player = new Player({x:BOUNDARY_WIDTH + BOUNDARY_WIDTH/2, y:BOUNDARY_HEIGHT + BOUNDARY_HEIGHT/2}, {x:0, y: 0})


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

function animate() {
  window.requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  boundaries.forEach(boundary => {
    boundary.draw()

    let playerTop = player.position.y - player.radius
    let playerBottom = player.position.y + player.radius
    let playerLeft = player.position.x - player.radius
    let playerRight = player.position.x + player.radius

    let boundaryTop = boundary.position.y
    let boundaryBottom = boundary.position.y + BOUNDARY_HEIGHT
    let boundaryLeft = boundary.position.x
    let boundaryRight = boundary.position.x + BOUNDARY_WIDTH

    if (
      playerTop <= boundaryBottom &&
      playerBottom >= boundaryTop &&
      playerLeft <= boundaryRight &&
      playerRight >= boundaryLeft
    ) {
      console.log("COLLISION")
      player.velocity.x = 0
      player.velocity.y = 0
    }



  })
  player.update()
}

animate()




window.addEventListener('keydown', (event) => {
  let key = event.key.toLowerCase()
  console.log("Key pressed", event, key)

  switch(key) {
    case "w":
      player.velocity.x = 0
      player.velocity.y = -1
      break;
    case "a":
      player.velocity.x = -1
      player.velocity.y = 0
      break;
    case "s":
      player.velocity.x = 0
      player.velocity.y = 1
      break;
    case "d":
      player.velocity.x = 1
      player.velocity.y = 0
      break;
  }

  console.log(player.velocity)
})