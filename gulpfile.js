var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('default', function() {
  return browserify('./init.js')
      .bundle()
      .pipe(source('bundle.js'));
});

// var browserify = require('browserify');
// var gulp = require('gulp');
// var source = require('vinyl-source-stream');
 
// gulp.task('browserify', function() {
//     return browserify('./src/javascript/app.js')
//         .bundle()
//         //Pass desired output filename to vinyl-source-stream
//         .pipe(source('bundle.js'))
//         // Start piping stream to tasks!
//         .pipe(gulp.dest('./build/'));
// });