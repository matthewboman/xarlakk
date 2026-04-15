const game   = document.getElementById("game")
const player = document.createElement("div")
player.id    = "player"

const step   = 3
const pos    = {
  x: 50,
  y: 53,
}
const center = {
  x: 50,
  y: 53,
}
const bounds = {
  up:    20,
  down:  80,
  left:  20,
  right: 80,
}

const links  = {
  up:    { title: "", url: "https://www.xarlakkheavyindustries.com/archive" },
  left:  { title: "", url: "https://www.xarlakkheavyindustries.com/shoppe" },
  right: { title: "", url: "https://www.xarlakkheavyindustries.com/custom" },
  down:  { title: "", url: "https://www.xarlakkheavyindustries.com/iota" },
}

let facing = "right"
let frame  = 1

function renderPlayer() {
  player.style.left = `${pos.x}%`
  player.style.top  = `${pos.y}%`
}

function move(dir) {
  if (dir === "up" && nearlyEqual(pos.x, center.x) && pos.y > bounds.up) {
    pos.x = center.x
    pos.y -= step
  }

  if (dir === "down" && nearlyEqual(pos.x, center.x) && pos.y < bounds.down) {
    pos.x = center.x
    pos.y += step
  }

  if (dir === "left" && nearlyEqual(pos.y, center.y) && pos.x > bounds.left) {
    pos.y = center.y
    pos.x -= step
  }

  if (dir === "right" && nearlyEqual(pos.y, center.y) && pos.x < bounds.right) {
    pos.y = center.y
    pos.x += step
  }

  renderPlayer()
  updateSprite(dir)
  checkEnd(dir)
}

function nearlyEqual(a, b, epsilon = 0.5) {
  return Math.abs(a - b) < epsilon
}

function checkEnd(dir) {
  if (
    (dir === "up"    && pos.y <= bounds.up)   ||
    (dir === "down"  && pos.y >= bounds.down) ||
    (dir === "left"  && pos.x <= bounds.left) ||
    (dir === "right" && pos.x >= bounds.right)
  ) {
    window.open(links[dir].url, "_blank")
    reset()
  }
}

function reset() {
  pos.x = center.x
  pos.y = center.y
  renderPlayer()
}

function updateSprite(dir) {
  if (dir === "left")  facing = "left"
  if (dir === "right") facing = "right"

  frame = frame === 1 ? 2 : 1

  player.style.backgroundImage = `url("images/sprite_${facing}_${frame}.png")`
}

game.tabIndex = 0

game.addEventListener("click", () => game.focus())
game.addEventListener("touchstart", () => game.focus(), { passive: true })

game.addEventListener("keydown", (e) => {
  const map = {
    ArrowUp:    "up",
    ArrowDown:  "down",
    ArrowLeft:  "left",
    ArrowRight: "right",
  }

  const dir = map[e.key]
  
  if (!dir) return

  e.preventDefault()
  move(dir)
})

document.querySelectorAll("#controls button").forEach((btn) => {
  btn.addEventListener("click", () => move(btn.dataset.dir))
})

Object.entries(links).forEach(([dir, data]) => {
  const label = document.createElement("div")

  label.className   = `label ${dir}`
  label.textContent = data.title

  game.appendChild(label)
})

game.appendChild(player)
reset()

window.addEventListener("load", () => {
  game.focus()
})