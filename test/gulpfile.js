var gulp = require('gulp');
var mcss = require('../index.js');

gulp.task('mcss', function() {
    return gulp.src('./*.mcss')
    .pipe(mcss({
    	include: [
    		'./include'
    	],
    	exclude: 'index2.mcss',
    	format: 1
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('default', ['mcss']);