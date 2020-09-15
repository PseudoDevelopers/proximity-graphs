function createNode() {
    return {
        radius: 5,
        position: V(300, 200),
        velocity: V(0.3, 0.4),
        color: 'crimson',
        move(Δt) {
            // Position = Initial position + v * Δt
            this.position.add(this.velocity.times(Δt))
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
