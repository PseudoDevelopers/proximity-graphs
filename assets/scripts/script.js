const MAX_DISTANCE_FOR_CONNECTION = 200
const MIN_DISTANCE_FOR_MAX_ALPHA = 50
const CANVAS_MIDDLE = V(width / 2, height / 2)

const ctx = canvas.getContext('2d')

const nodes = []

let prevTime = 0
let requestAnimationFrameID
const SINGLE_FRAME_TIME = 5
let dt

createNodes()
startAnimation()

function animate() {
    let now = performance.now()
    dt = now - prevTime
    prevTime = now
    dt = SINGLE_FRAME_TIME

    frame()

    if (!paused) requestAnimationFrameID = requestAnimationFrame(animate)
}

function frame() {
    nodes.forEach(node => {
        node.chkEdgeBounce()
        node.move(dt)
    })
    draw()
}
function draw() {
    clearCanvas()

    if (lines) drawConnections()
    for (let node of nodes)
        node.draw()
}

function drawConnections() {
    nodes.forEach(node1 => {
        nodes.forEach(node2 => {
            if (node1 !== node2)
                drawConnection(node1, node2)
        })
    })
}
function drawConnection(node1, node2) {
    let displacement = node2.position.minus(node1.position)
    let distance = displacement.norm()
    // if (distance >= 300)
    //     return

    const alpha = rescale(MAX_DISTANCE_FOR_CONNECTION, MIN_DISTANCE_FOR_MAX_ALPHA, distance)
    const color = `hsla(180, 90%, 60%, ${alpha})`
    drawLine(node2.position, node1.position, color)

    // if (distance < MIN_DISTANCE_FOR_MAX_ALPHA)
    //     return

    node1.velocity.add(acceleration(node2.mass, displacement))
}

function createNodes() {
    // for (let i = 0; i < noOfNodes; i++) {
    //     nodes.push(createNode({
    //         mass: 1e13,
    //         position: V(0, 0).randomize(lerp(0, width / 2, Math.random())).add(CANVAS_MIDDLE),
    //         velocity: V(0, 0).randomize(lerp(0.05, 0.2, Math.random()))
    //     }))
    // }
    nodes.push(createNode({ mass: 1e13, position: V(800, 700), velocity: V(0, -0.2) }))
    nodes.push(createNode({ mass: 1e13, position: V(1050, 400), velocity: V(0, 0.2) }))
}


function startAnimation() {
    prevTime = performance.now()
    requestAnimationFrameID = requestAnimationFrame(animate)
}
function stopAnimation() {
    cancelAnimationFrame(requestAnimationFrameID)
}
function playNextFrame() {
    prevTime = performance.now() - SINGLE_FRAME_TIME
    animate()
}
function playPrevFrame() {
    // 
}
