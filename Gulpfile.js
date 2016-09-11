var gulp = require('gulp'),
    sass = require('gulp-sass'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync').create();

// Sass
gulp.task('sass:dev', function() {
    return gulp.src('src/scss/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

// Scripts
gulp.task('uglify:dev', function() {
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

// Images
gulp.task('images', () =>
    gulp.src('src/images/*.jpg')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);

gulp.task('fonts', function() {
  gulp.src('src/fonts/*.*')
    .pipe(gulp.dest('dist/fonts/'))
});

// Clean
gulp.task('clean', function() {
    return del(['dist']);
});

gulp.task('default', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.start('clean', 'fonts', 'sass:dev', 'uglify:dev', 'images');

    gulp.watch("src/scss/**/*.scss", ['sass:dev']);
    gulp.watch("src/js/*.js", ['uglify:dev']);
    gulp.watch("src/images/*", ['images']);
    gulp.watch("*.html").on('change', browserSync.reload);
});
