function lerp(min, max, val) {
    return min + (max - min) * val
}

function rescale(min, max, val) {
    return (val - min) / (max - min)
}
