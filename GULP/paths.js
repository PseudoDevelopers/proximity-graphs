const PATHS = Object.freeze({
    html: {
        dir: 'html/',
        indexHTML: 'html/index.html',
        dest: '../'
    },

    scripts: {
        dir: 'scripts/',
        dest: '../assets/scripts/'
    }
})


const SCRIPTS_FOR_INDEX_HTML = Object.freeze([
    'accessories.js',
    'vector.js',
    'functions.js',
    'physics-formulas.js',
    'node.js',
    'canvas-drawing-functions.js',
    'script.js'
]).map(script => PATHS.scripts.dir + script)


module.exports = {
    PATH: PATHS,
    SCRIPTS_FOR_INDEX_HTML: SCRIPTS_FOR_INDEX_HTML
}
