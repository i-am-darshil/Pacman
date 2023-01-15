let canvas = document.querySelector('canvas')
console.log(canvas)

let c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

BOUNDARY_WIDTH = 40
BOUNDARY_HEIGHT = 40

PLAYER_SPEED = 2

class Boundary {
  constructor(position, image) {
    this.position = position
    this.width = BOUNDARY_WIDTH
    this.height = BOUNDARY_HEIGHT
    this.image = image
  }

  draw() {
    // c.fillStyle = "blue"
    // c.fillRect(this.position.x, this.position.y, this.width, this.height)
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}

class Player {
  constructor(position, velocity) {
    this.position = position
    this.velocity = velocity
    this.radius = 18
    /*
    Relationship between Velocity and radius of player
    size of each cell (BOUNDARY_WIDTH or BOUNDARY_HEIGHT) = 2 * radius + veloctiy
     */
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
  ["-", "-", "-", "-", "-", "-", "-"],
  ["-", " ", " ", " ", " ", " ", "-"],
  ["-", " ", "-", " ", "-", " ", "-"],
  ["-", " ", " ", " ", " ", " ", "-"],
  ["-", " ", "-", " ", "-", " ", "-"],
  ["-", " ", " ", " ", " ", " ", "-"],
  ["-", "-", "-", "-", "-", "-", "-"]
]

let keys = {
  w : {
    pressed: false
  },
  a : {
    pressed: false
  },
  s : {
    pressed: false
  },
  d : {
    pressed: false
  }
}

let last_key = ""

let boundaries = []
let player = new Player({x:BOUNDARY_WIDTH + BOUNDARY_WIDTH/2, y:BOUNDARY_HEIGHT + BOUNDARY_HEIGHT/2}, {x:0, y: 0})

let image = new Image()
image.src = "./img/pipeHorizontal.png"

map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    console.log(symbol)
    switch(symbol) {
      case "-":
        positionX = BOUNDARY_WIDTH*j
        positionY = BOUNDARY_HEIGHT*i
        boundaries.push(
          new Boundary({x:positionX, y:positionY}, image)
        )
        break
    }
  })
})

function circleCollidesWithSquare(circle, square) {
  let circleTop = circle.position.y - circle.radius
  let circleBottom = circle.position.y + circle.radius
  let circleLeft = circle.position.x - circle.radius
  let circleRight = circle.position.x + circle.radius

  let squareTop = square.position.y
  let squareBottom = square.position.y + BOUNDARY_HEIGHT
  let squareLeft = square.position.x
  let squareRight = square.position.x + BOUNDARY_WIDTH

  return (
    circleTop + circle.velocity.y <= squareBottom &&
    circleBottom + circle.velocity.y >= squareTop &&
    circleLeft + circle.velocity.x <= squareRight &&
    circleRight + circle.velocity.x >= squareLeft
  )
}

function animate() {
  window.requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  if (keys.w.pressed && last_key == "w") {
    for(let i = 0; i < boundaries.length; i++) {
      let boundary = boundaries[i]
      if (circleCollidesWithSquare({...player, velocity: {x: 0, y: -PLAYER_SPEED}}, boundary)) {
        player.velocity.y = 0
        break
      } else {
        player.velocity.y = -PLAYER_SPEED
      }
    }
  } else if (keys.a.pressed && last_key == "a") {
    for(let i = 0; i < boundaries.length; i++) {
      let boundary = boundaries[i]
      if (circleCollidesWithSquare({...player, velocity: {x: -PLAYER_SPEED, y: -0}}, boundary)) {
        player.velocity.x = 0
        break
      } else {
        player.velocity.x = -PLAYER_SPEED
      }
    }
  } else if (keys.s.pressed && last_key == "s") {
    for(let i = 0; i < boundaries.length; i++) {
      let boundary = boundaries[i]
      if (circleCollidesWithSquare({...player, velocity: {x: 0, y: PLAYER_SPEED}}, boundary)) {
        player.velocity.y = 0
        break
      } else {
        player.velocity.y = PLAYER_SPEED
      }
    }
  } else if (keys.d.pressed && last_key == "d") {
    for(let i = 0; i < boundaries.length; i++) {
      let boundary = boundaries[i]
      if (circleCollidesWithSquare({...player, velocity: {x: PLAYER_SPEED, y: -0}}, boundary)) {
        player.velocity.x = 0
        break
      } else {
        player.velocity.x = PLAYER_SPEED
      }
    }
  }


  boundaries.forEach(boundary => {
    boundary.draw()

    if (circleCollidesWithSquare(player, boundary)) {
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
  last_key = key

  switch(key) {
    case "w":
      keys.w.pressed = true
      break;
    case "a":
      keys.a.pressed = true
      break;
    case "s":
      keys.s.pressed = true
      break;
    case "d":
      keys.d.pressed = true
      break;
  }

  console.log(player.velocity)
})

window.addEventListener('keyup', (event) => {
  let key = event.key.toLowerCase()
  console.log("Key pressed up", event, key)

  switch(key) {
    case "w":
      keys.w.pressed = false
      break;
    case "a":
      keys.a.pressed = false
      break;
    case "s":
      keys.s.pressed = false
      break;
    case "d":
      keys.d.pressed = false
      break;
  }

  console.log(player.velocity)
})