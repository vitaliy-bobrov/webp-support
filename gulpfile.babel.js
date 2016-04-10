'use strict';

import gulp from 'gulp';
import autoprefixer from 'autoprefixer';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

function onError(error) {
  console.log(error.toString());
  this.emit('end');
}

// Compile and automatically prefix stylesheets
const styles = () => {
  const processors = [
    autoprefixer({cascade: false})
  ];

  return gulp.src('./*.scss')
    .pipe($.plumber({
      errorHandler: onError
    }))
    .pipe($.sass({
      outputStyle: 'expanded',
      precision: 10
    }))
    .pipe($.postcss(processors))
    .pipe($.if('*.css', $.cssnano({
      convertValues: false,
      autoprefixer: false
    })))
    .pipe($.size({title: 'styles'}))
    .pipe(gulp.dest('./'));
};

gulp.task('styles', styles);

// Lint JavaScript.
const lint = () => gulp.src('./ripple.babel.js')
  .pipe($.eslint())
  .pipe($.eslint.format());

gulp.task('lint', lint);

// Concatenate and minify JavaScript and transpiles ES2015 code to ES5.
const scripts = () => gulp.src('./ripple.babel.js')
  .pipe($.plumber({
    errorHandler: onError
  }))
  .pipe($.sourcemaps.init())
  .pipe($.babel())
  .pipe($.sourcemaps.write())
  .pipe($.concat('ripple.min.js'))
  .pipe($.uglify({preserveComments: 'some'}))
  .pipe($.size({title: 'scripts'}))
  .pipe($.sourcemaps.write('./'))
  .pipe(gulp.dest('./'));

gulp.task('scripts', scripts);

// Watch files change.
const watch = () => {
  gulp.watch(['./*.scss'], gulp.series('styles'));
  gulp.watch(['./*.js'], gulp.parallel('lint', 'scripts'));
};

gulp.task('watch', watch);

// Build production files
gulp.task('build', gulp.parallel('styles', 'lint', 'scripts'));

// Default task.
gulp.task('default', gulp.series('build', 'watch'));
