// Tutorial Link:   https://www.youtube.com/watch?v=jK0l2s5R1tM

function lerp(min, max, val) {
    return min + (max - min) * val
}

function rescale(min, max, val) {
    return (val - min) / (max - min)
}
