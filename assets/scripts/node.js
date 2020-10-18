function createNode({ mass = 1e1, position = V(0, 0), velocity = V(0, 0) }) {
    return {
        mass: mass,
        radius: 20,
        position: position,
        velocity: velocity,
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
