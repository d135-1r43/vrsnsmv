
const gulp = require('gulp')
const browsersync = require('browser-sync').create()

const webpack = require('webpack')
const webpackStream =  require('webpack-stream')

function bootstrap() {
	return gulp.src([
		'./node_modules/bootstrap/dist/**/*',
		'!./node_modules/bootstrap/dist/css/bootstrap-grid*',
		'!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
	]).pipe(gulp.dest('./vendor/bootstrap'))
}

function jquery() {
	return gulp.src([
		'./node_modules/jquery/dist/*',
		'!./node_modules/jquery/dist/core.js'
	]).pipe(gulp.dest('./vendor/jquery'))
}

function pack() {
	const mode = process.env.NODE_ENV || 'development';

	return gulp.src('svelte.js')
		.pipe(webpackStream({
			output: {
				filename: 'svelte.js'
			},
			module: {
				rules: [
					{
						test: /\.svelte$/,
						exclude: /node_modules/,
						use: 'svelte-loader'
					}
				]
			},
			mode
		}, webpack))
		.pipe(gulp.dest('./js/gen/'))
}

function browserSync(done) {
	browsersync.init({
		server: {
			baseDir: './'
		},
		notify: false,
		port: 3000
	});
	done();
}

function watchFiles() {
	gulp.watch(['./svelte.js', './*.svelte']).on('change', gulp.series(pack, browsersync.reload))
	gulp.watch(['./**/*.html']).on('change', browsersync.reload)
}

// Define tasks
const watch = gulp.parallel(watchFiles, browserSync)
const vendor = gulp.parallel(bootstrap, jquery)

// Export tasks
exports.watch = watch
exports.pack = pack
exports.vendor = vendor