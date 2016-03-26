var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename');
    ;

module.exports = function sassTask () {
  return gulp.src('public/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      indentType : 'tab',
      indentWidth : 1
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(rename(function (path) {
      path.dirname = path.dirname.replace('scss','css');
    }))
    .pipe(gulp.dest('public/'));
}
