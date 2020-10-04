var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var ftp = require('vinyl-ftp');
var logger = require('gulplog');

gulp.task('dev', function () {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
	gulp.watch("index.html").on('change', browserSync.reload);
});

gulp.task('deploy', function () {

	var conn = ftp.create({
		host: 'vrsnsmv.com',
		user: '398303-ftp',
		password: 'QFjqZ4DmaFyWQbjynJc',
		parallel: 10,
		log: logger.info
	});

	var globs = [
		'css/**',
		'font/**',
		'img/**',
		'js/**',
		'index.html'
	];

	return gulp.src(globs, { base: '.', buffer: false })
		.pipe(conn.newer('/'))
		.pipe(conn.dest('/vrsnsmv'));
});