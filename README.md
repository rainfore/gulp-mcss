# gulp-mcss [![NPM version][npm-image]][npm-url]
> [MCSS] plugin for gulp

## Usage
Install:
```shell
npm install --save-dev gulp_mcss
```
Then, in your gulpfile.js:
```javascript
var mcss = require('gulp_mcss');

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
```
> All input files' extension will change to `.css`

You can pass any valid option to `mcss()`, see [MCSS].

[npm-url]: https://npmjs.org/package/gulp_mcss
[npm-image]: https://img.shields.io/npm/v/gulp_mcss.svg
[MCSS]: https://github.com/leeluolee/mcss
