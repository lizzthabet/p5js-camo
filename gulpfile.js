var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');

gulp.task('serve', function() {
  var port = parseInt(process.env.PORT);
  process.env.PORT = port - 1000;
  nodemon({
    script: 'server/bin/www',
    watch: 'server'
  });
  browserSync.init({
    proxy: 'localhost:' + process.env.PORT,
    port: port,
    open: false
  });
  gulp.watch('public/**/*.css').on('change', function() {
    gulp.src('public/**/*.css').pipe(browserSync.stream());
  });
  gulp.watch([
    'public/**/*.html',
    'public/**/*.js'
  ]).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
