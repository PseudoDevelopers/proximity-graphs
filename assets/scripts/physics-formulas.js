const G = 6.67408e-11   // Gravitational Constant

function gravitationalForce(m1, m2, r) {
    return (G * m1 * m2) / (r * r)
}
