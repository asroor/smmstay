const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const cleanCss = require('gulp-clean-css');
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat');
const sourceMap = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');
const size = require('gulp-size');
const webp = require('gulp-webp');
const postcss = require('gulp-postcss');
const autoprefixer2 = require('autoprefixer');
const purgecss = require('gulp-purgecss')
const svgmin = require('gulp-svgmin');
const paths = {
	html: {
		src: 'src/*.html',
		dest: 'dist/',
	},
	css: {
		src: 'src/scss/*.scss',
		dest: 'dist/css/'
	},
	js: {
		src: 'src/js/*.js',
		dest: 'dist/js/'
	},
	images: {
		src: 'src/images/*.{jpg,png,svg}',
		dest: 'dist/images/'
	}
}


// html minify 
function html() {
	return gulp.src(paths.html.src)
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(size({
			showFiles: true
		}))
		.pipe(gulp.dest(paths.html.dest))
}
// build styles
function css() {
	return gulp.src(paths.css.src)
		.pipe(sourceMap.init())
		.pipe(sass())
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(cleanCss()) // CSS ni minify qilish
		.pipe(postcss([autoprefixer2()])) // PostCSS bilan ishlash
		.pipe(rename({
			basename: 'main',
			suffix: '.min'
		}))
		.pipe(sourceMap.write('.'))
		.pipe(size({
			showFiles: true
		}))
		.pipe(gulp.dest(paths.css.dest))
}

// build Scripts 
function js() {
	return gulp.src(paths.js.src)
		.pipe(sourceMap.init())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(concat('main.min.js'))
		.pipe(sourceMap.write('.'))
		.pipe(size({
			showFiles: true
		}))
		.pipe(gulp.dest(paths.js.dest))
}
gulp.task('purge', () => {
	return gulp.src('dist/css/*.min.css')
		.pipe(purgecss({
			content: [paths.html.src],
		}))
		.pipe(gulp.dest(paths.css.dest));
});

// optimize images and convert to webp format
function images() {
	return gulp.src(paths.images.src)
		.pipe(svgmin())
		.pipe(webp())
		.pipe(gulp.dest(paths.images.dest));
}
function watch() {
	gulp.watch(paths.css.src, css);
	gulp.watch(paths.html.src, html);
	gulp.watch(paths.js.src, js);
	gulp.watch(paths.images.src, images);
}
const build = gulp.series(gulp.parallel(css, js, html, images), watch);

exports.css = css;
exports.js = js;
exports.html = html;
exports.images = images;
exports.build = build;
exports.default = build