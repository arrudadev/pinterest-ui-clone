const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const order = require("gulp-order");
const concat = require("gulp-concat");

const sassFolderPath = './scss';
const sassFilesPath = './scss/*.scss';
const sassBundleFileName = 'bundle.scss';

const cssFolderDevelopment = './css';
const cssFolderProduction = './build/css';

const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

gulp.task('concat-sass', function () {
  return gulp      
    .src(sassFilesPath)
    .pipe(order([
      'scss/reset.scss',
      'scss/variables.scss',
      'scss/animations.scss',
      'scss/header.scss',
      'scss/heading.scss',
      'scss/grid.scss',
      'scss/page-scroll-arrows.scss',
    ], { base: __dirname }))
    .pipe(concat(sassBundleFileName))
    .pipe(gulp.dest(sassFolderPath));
});

gulp.task('compile-sass-development', function () {
  return gulp      
    .src(`${sassFolderPath}/${sassBundleFileName}`)
    .pipe(sass(sassOptions).on('error', sass.logError))    
    .pipe(autoprefixer())
    .pipe(gulp.dest(cssFolderDevelopment));
});

gulp.task('compile-sass-production', function () {
  return gulp
    .src(`${sassFolderPath}/${sassBundleFileName}`)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(cssFolderProduction));
});

gulp.task('development', gulp.series('concat-sass', 'compile-sass-development'));

gulp.task('build', gulp.series('concat-sass', 'compile-sass-production'));
