var gulp = require('gulp');
var mcss = require('../index.js');

gulp.task('mcss', function() {
    return gulp.src('./*.mcss')
    .pipe(mcss())
    .pipe(gulp.dest('.'));
});

gulp.task('default', ['mcss']);