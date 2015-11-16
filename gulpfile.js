var gulp = require('gulp')
var babel = require('gulp-babel');

var dest = './dest'
var entryPoint = './index.js'

function build() {
  return gulp.src(entryPoint)
    .pipe(babel)
    .pipe(gulp.dest(dest))
}

gulp.task('default', ['build']);
