const G = 6.67408e-11   // Gravitational Constant


// Calculate the acceleration of object
// Due to gravitational force of other object
function acceleration(massOfOtherNode, displacement) {
    let distance = displacement.norm()

    const dv = displacement.normalize()
    dv.multiply((G * massOfOtherNode) / (distance * distance))

    return dv
}
