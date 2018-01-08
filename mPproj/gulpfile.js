var gulp           = require('gulp');
		// gutil          = require('gulp-util' ),
	var	sass           = require('gulp-sass');
		// browserSync    = require('browser-sync'),
		// concat         = require('gulp-concat'),
		// uglify         = require('gulp-uglify'),
		// minifyCSS       = require('gulp-clean-css'),
		// rename         = require('gulp-rename'),
		// del            = require('del'),
		// imagemin       = require('gulp-imagemin'),
		// cache          = require('gulp-cache'),
		// autoprefixer   = require('gulp-autoprefixer'),
		// ftp            = require('vinyl-ftp'),
var	notify         = require("gulp-notify");

// Скрипты проекта

// gulp.task('common-js', function() {
// 	return gulp.src([
// 		'app/js/common.js'
// 		])
// 	.pipe(gulp.dest('app/js'));
// });

// gulp.task('js', ['common-js'], function() {
// 	return gulp.src([
//         // 'app/libs/js/maskedInput/jquery.mask.min.js',
//         'app/libs/js/jquery.mmenu.all.js',
// 		])
// 	.pipe(concat('scripts.min.js'))
// 	// .pipe(uglify()) // Минимизировать весь js (на выбор)
// 	.pipe(gulp.dest('app/js'))
// 	.pipe(browserSync.reload({stream: true}));
// });

// gulp.task('browser-sync', function() {
// 	browserSync({
// 		server: {
// 			baseDir: 'app'
// 		},
// 		notify: false,
// 		// tunnel: true,
// 		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
// 	});
// });

gulp.task('sass', function() {
    return gulp.src(['app/sass/*.sass', '!app/sass/libs.sass']) // ('!app/sass/**/*.+(sass|scss)') for scss
        .pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
        // .pipe(rename({suffix: 'Style', prefix : ''}))
        // .pipe(autoprefixer(['last 3 versions']))
        //.pipe(minifyCSS()) // минимизировать, закомментировать при выгрузке
        .pipe(gulp.dest('app/css'))
        // .pipe(browserSync.reload({stream: true}));
});

// gulp.task('libs-sass', function() {
//     return gulp.src('app/sass/libs.sass') // ('!app/sass/**/*.+(sass|scss)') for scss
//         .pipe(sass())
//         .pipe(rename({suffix: 'Min', prefix : ''}))
//         .pipe(minifyCSS()) // минимизировать, закомментировать при выгрузке
//         .pipe(gulp.dest('app/css'))
//         .pipe(browserSync.reload({stream: true}));
// });

// gulp.task('watch', ['sass', 'js', 'browser-sync', 'libs-sass'], function() {
gulp.task('watch', ['sass'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	// gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	// gulp.watch('app/*.html', browserSync.reload);
});

// gulp.task('imagemin', function() {
// 	return gulp.src('app/img/**/*')
// 	.pipe(cache(imagemin()))
// 	.pipe(gulp.dest('dist/img'));
// });

// gulp.task('build', ['removedist', 'imagemin', 'sass', 'js'], function() {
//
// 	var buildFiles = gulp.src([
// 		'app/*.html',
// 		'app/.htaccess',
// 		]).pipe(gulp.dest('dist'));
//
// 	var buildCss = gulp.src([
// 		'app/css/mainStyle.css',
// 		'app/css/libsMin.css',
// 		]).pipe(gulp.dest('dist/css'));
//
// 	var buildJs = gulp.src([
//         'app/js/jquery-3.2.1.min.js',
//         'app/js/scripts.min.js',
//         'app/js/common.js',
// 		]).pipe(gulp.dest('dist/js'));
//
// 	var buildFonts = gulp.src([
// 		'app/fonts/**/*',
// 		]).pipe(gulp.dest('dist/fonts'));
//
// });

// gulp.task('deploy', function() {
//
// 	var conn = ftp.create({
// 		host:      'hostname.com',
// 		user:      'username',
// 		password:  'userpassword',
// 		parallel:  10,
// 		log: gutil.log
// 	});
//
// 	var globs = [
// 	'dist/**',
// 	'dist/.htaccess',
// 	];
// 	return gulp.src(globs, {buffer: false})
// 	.pipe(conn.dest('/path/to/folder/on/server'));
//
// });

// gulp.task('removedist', function() { return del.sync('dist'); });
// gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);
