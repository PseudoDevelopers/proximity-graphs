// Tutorial Link:   https://www.youtube.com/watch?v=jK0l2s5R1tM

const MAX_DISTANCE_FOR_CONNECTION = 200
const MIN_DISTANCE_FOR_MAX_ALPHA = 50
const CANVAS_MIDDLE = V(width / 2, height / 2)

const ctx = canvas.getContext('2d')

const nodes = []

let prevTime = 0

createNodes()
animate()

function animate() {
    let now = performance.now()
    let Δt = now - prevTime
    prevTime = now
    requestAnimationFrame(animate)

    frame(Δt)
}

function frame(Δt) {
    nodes.forEach(node => {
        node.chkEdgeBounce()
        node.move(Δt)
    })
    draw()
}
function draw() {
    clearCanvas()

    drawConnections()
    for (let node of nodes)
        node.draw()
}

function drawConnections() {
    for (let i = 0; i < nodes.length; i++) {
        let node1 = nodes[i]
        for (let j = 0; j < nodes.length; j++) {
            let node2 = nodes[j]
            drawConnection(node1, node2)
        }
    }
}
function drawConnection(node1, node2) {
    let displacement = node2.position.minus(node1.position)
    let distance = displacement.norm()
    if (distance >= 300)
        return

    const alpha = rescale(MAX_DISTANCE_FOR_CONNECTION, MIN_DISTANCE_FOR_MAX_ALPHA, distance)
    const color = `hsla(180, 90%, 60%, ${alpha})`
    drawLine(node2.position, node1.position, color)

    if (distance < MIN_DISTANCE_FOR_MAX_ALPHA)
        return

    let nudge = displacement.normalize().times(-10 / (distance * distance))
    node2.velocity.add(nudge)
    node1.velocity.subtract(nudge)
}

function createNodes() {
    for (let i = 0; i < 100; i++) {
        let node = createNode()
        node.position.randomize(lerp(0, width / 2, Math.random())).add(CANVAS_MIDDLE)
        node.velocity.randomize(lerp(0.05, 0.2, Math.random()))
        nodes.push(node)
    }
}
function createNode() {
    return {
        radius: 5,
        position: V(300, 200),
        velocity: V(0.3, 0.4),
        color: 'crimson',
        move(dt) {
            // Position = Initial position + v * Δt
            this.position.add(this.velocity.times(dt))
        },
        draw() {
            drawCircle(this.position.x, this.position.y, this.radius, this.color)
        },
        chkEdgeBounce() {
            if/***/ (this.position.x >= width - this.radius) this.velocity.x *= -1     // right wall
            else if (this.position.x <= this.radius)/******/ this.velocity.x *= -1     // left wall

            if/***/ (this.position.y >= height - this.radius) this.velocity.y *= -1    // Bottom
            else if (this.position.y <= this.radius)/*******/ this.velocity.y *= -1    // Top
        }
    }
}
