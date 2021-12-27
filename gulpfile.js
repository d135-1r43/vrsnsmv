const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const ftp = require('vinyl-ftp');
const logger = require('gulplog');

gulp.task('dev', function () {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
	gulp.watch("index.html").on('change', browserSync.reload);
});

gulp.task('deploy', function () {

	const conn = ftp.create({
		host: 'vrsnsmv.com',
		user: '398303-ftp',
		password: 'QFjqZ4DmaFyWQbjynJc',
		parallel: 10,
		log: logger.info
	});

	const globs = [
		'css/**',
		'font/**',
		'img/**',
		'js/**',
		'favicon/**',
		'index.html'
	];

	return gulp.src(globs, { base: '.', buffer: false })
		.pipe(conn.newer('/'))
		.pipe(conn.dest('/vrsnsmv'));
});