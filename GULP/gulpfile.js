const gulp = require('gulp')
const fileinclude = require('gulp-file-include')
const rename = require('gulp-rename')
const concat = require('gulp-concat')

const strip = require('gulp-strip-comments')
const minify = require('gulp-minify')
const htmlmin = require('gulp-htmlmin')
const minifyInline = require('gulp-minify-inline')

const { PATH, SCRIPTS_FOR_INDEX_HTML } = require('./paths')


async function updateIndexHTML() {
    return gulp.src([PATH.html.indexHTML])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(strip())
        .pipe(minifyInline())
        .pipe(gulp.dest(PATH.html.dest))
}

async function updateIndexScript() {
    return gulp.src(SCRIPTS_FOR_INDEX_HTML)
        .pipe(concat('index.min.js'))
        .pipe(minify())
        .pipe(gulp.dest(PATH.scripts.dest))
}


gulp.watch(PATH.html.dir, updateIndexHTML)
gulp.watch(PATH.scripts.dir, updateIndexScript)


module.exports = {
    indexHTML: updateIndexHTML,
    indexScript: updateIndexScript
}
