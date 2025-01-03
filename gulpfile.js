const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');

function compileSass () {
    return gulp
        .src('./src/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            style: 'compressed'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('./build/styles'));
}

function minifyJavascript () {
    return gulp
    .src('./src/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/scripts'));
}

function minifyImages () {
    return gulp
    .src('./src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'));
}

exports.default = function () {
    gulp.watch('src/styles/*.scss', { ignoreInitial: false }, gulp.series(compileSass));
    gulp.watch('src/scripts/*.js', { ignoreInitial: false }, gulp.series(minifyJavascript));
    gulp.watch('src/images/*', { ignoreInitial: false }, gulp.series(minifyImages));
}