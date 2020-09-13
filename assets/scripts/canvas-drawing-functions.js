function drawLine(p1, p2, clr) {
    ctx.strokeStyle = clr
    ctx.beginPath()
    ctx.moveTo(p1.x, p1.y)
    ctx.lineTo(p2.x, p2.y)
    ctx.stroke()
}

function drawCircle(x, y, r, color) {
    ctx.fillStyle = color
    ctx.lineWidth = 0.5
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.fill()
}

function clearCanvas() {
    ctx.clearRect(0, 0, width, height)
}
