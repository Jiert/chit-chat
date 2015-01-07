var gulp = require('gulp');
var browserify = require('browserify');

gulp.task('default', function() {
  return browserify('./init.js').bundle();
  // place code for your default task here
});

// gulp.task('browserify', function() {
//     return browserify('./src/javascript/app.js')
//         .bundle()
//         //Pass desired output filename to vinyl-source-stream
//         .pipe(source('bundle.js'))
//         // Start piping stream to tasks!
//         .pipe(gulp.dest('./build/'));
// });