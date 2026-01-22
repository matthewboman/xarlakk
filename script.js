const game   = document.getElementById("game")
const player = document.createElement("div")
player.id    = "player"

const step   = 20
const center = 142

const links  = {
  up:    { title: "Gallery",   url: "https://www.xarlakkheavyindustries.com/" },
  down:  { title: "Store",     url: "https://www.xarlakkheavyindustries.com/xhi-mmxxv" },
  left:  { title: "Customize", url: "https://www.xarlakkheavyindustries.com/contact" },
  right: { title: "∞",         url: "https://www.youtube.com/watch?v=Aq5WXmQQooo&list=RDAq5WXmQQooo&start_radio=1" },
}

const bounds = {
  up:    0,
  down:  284,
  left:  0,
  right: 284,
}

function move(dir) {
  let x = player.offsetLeft
  let y = player.offsetTop

  if (dir === "up"    && x === center && y > bounds.up)    y -= step
  if (dir === "down"  && x === center && y < bounds.down)  y += step
  if (dir === "left"  && y === center && x > bounds.left)  x -= step
  if (dir === "right" && y === center && x < bounds.right) x += step

  player.style.left = x + "px"
  player.style.top  = y + "px"

  checkEnd(dir, x, y)
}

function checkEnd(dir, x, y) {
  if (
    (dir === "up"    && (y - 2) <= bounds.up)   ||
    (dir === "down"  && (y + 2) >= bounds.down) ||
    (dir === "left"  && (x - 2) <= bounds.left) ||
    (dir === "right" && (x + 2) >= bounds.right)
  ) {
    window.open(links[dir].url, "_blank")
    reset()
  }
}

function reset() {
  player.style.left = center + "px"
  player.style.top  = center + "px"
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

const vPath     = document.createElement("div")
vPath.id        = "path-vertical"
vPath.className = "path"

const hPath     = document.createElement("div")
hPath.id        = "path-horizontal"
hPath.className = "path"

game.appendChild(vPath)
game.appendChild(hPath)

Object.entries(links).forEach(([dir, data]) => {
  const label = document.createElement("div")

  label.className   = `label ${dir}`
  label.textContent = data.title

  game.appendChild(label)
})

game.appendChild(player)
reset()
