const game   = document.getElementById("game")
const player = document.createElement("div")
player.id    = "player"

const step    = 10
const centerX = 142
const centerY = 150

const links  = {
  up:    { title: "", url: "https://www.xarlakkheavyindustries.com/" },
  left:  { title: "", url: "https://www.xarlakkheavyindustries.com/xhi-mmxxv" },
  right: { title: "", url: "https://www.xarlakkheavyindustries.com/contact" },
  down:  { title: "", url: "https://www.xarlakkheavyindustries.com/iota" },
}

const bounds = {
  up:    60,
  down:  230,
  left:  70,
  right: 250,
}

let facing = "right"
let frame  = 1

function move(dir) {
  let x = player.offsetLeft
  let y = player.offsetTop

  if (dir === "up"    && x === centerX && y > bounds.up)    y -= step
  if (dir === "down"  && x === centerX && y < bounds.down)  y += step
  if (dir === "left"  && y === centerY && x > bounds.left)  x -= step
  if (dir === "right" && y === centerY && x < bounds.right) x += step

  player.style.left = x + "px"
  player.style.top  = y + "px"

  updateSprite(dir)
  checkEnd(dir, x, y)
}

function checkEnd(dir, x, y) {
  if (
    (dir === "up"    && y <= bounds.up)   ||
    (dir === "down"  && y >= bounds.down) ||
    (dir === "left"  && x <= bounds.left) ||
    (dir === "right" && x >= bounds.right)
  ) {
    window.open(links[dir].url, "_blank")
    reset()
  }
}

function reset() {
  player.style.left = centerX + "px"
  player.style.top  = centerY + "px"
}

function updateSprite(dir) {
  if (dir === "left")  facing = "left"
  if (dir === "right") facing = "right"

  frame = frame === 1 ? 2 : 1

  player.style.backgroundImage =
    `url("images/sprite_${facing}_${frame}.png")`
}

document.addEventListener("keydown", (e) => {
  const map = {
    ArrowUp:    "up",
    ArrowDown:  "down",
    ArrowLeft:  "left",
    ArrowRight: "right",
  }

  if (map[e.key]) {
    move(map[e.key])
  }
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
