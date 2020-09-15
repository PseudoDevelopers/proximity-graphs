const gulp = require('gulp')
const fileinclude = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')

const paths = {
    html: '../html',
    indexFile: '../html/index.html',
    dest: '../'
}

async function updateIndexFile() {
    return gulp.src([paths.indexFile])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        // .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(paths.dest))
}

gulp.watch(paths.html, updateIndexFile)


exports.default = updateIndexFile
