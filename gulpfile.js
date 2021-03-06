var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    gulpcopy = require('gulp-copy'),
    del = require('del');

/*==========================================================
============================================================  CLEAN
============================================================
*/
gulp.task('clean', function() {
    return del(['dist/**/*']);
});

/*==========================================================
============================================================  SCSS
============================================================
*/
gulp.task('scss', function() {
  return sass('src/scss/app.scss', { style: 'expanded' })
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(notify('SCSS task complete'));
});
/*==========================================================
============================================================  COPY
============================================================
*/
gulp.task('copy', ['scss'], function () {
    return gulp.src(['src/*.html'], {
        base: 'src'
    }).pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean'], function() {
    gulp.start('copy');
});

/*==========================================================
============================================================  WATCH
============================================================
*/
gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch('src/scss/**/*.scss', ['scss']);
  // Create LiveReload server
  livereload.listen();
  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);
});
