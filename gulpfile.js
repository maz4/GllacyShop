'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const path = require('path');
const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const inject = require('gulp-inject');
const webp = require('gulp-webp');
const MQpacker = require('css-mqpacker');
const del = require('del');
const runSequence = require('run-sequence');

var paths = {
  src: './**/*',
  srcHTML: './*.html',
  srcSASS: './sass/**/*.scss',
  srcJS: './js/*.js',
  srcIMG: './img/**',

  tmp: './tmp',
  tmpHTML: './tmp/**/*.html',
  tmpCSS: './tmp/**/*.css',
  tmpCSSdest: './tmp/css',
  tmpJS: './tmp/**/*.js',
  tmpJSdest: './tmp/js',
  tmpIMG: './tmp/img',
};

/**
 * DEVELOPMENT
 */

 // Copy HTML
gulp.task('devHTML', function () {
  return gulp.src(paths.srcHTML)
    .pipe(gulp.dest(paths.tmp));
});

// Copy images
gulp.task('devIMG', function () {
  return gulp.src(paths.srcIMG)
    .pipe(plumber())
    .pipe(gulp.dest(paths.tmpIMG))
    .pipe(webp())
    .pipe(gulp.dest(paths.tmpIMG));
});

// Copy and compile CSS
gulp.task('devCSS', function () {
  return gulp.src(paths.srcSASS)
    .pipe(plumber())
    .pipe(sass({
        includePaths: path.join(__dirname, '/node_modules/normalize.scss/')
      })
      .on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({
        browsers: 'last 2 versions'
      }),
    ]))
    .pipe(gulp.dest(paths.tmpCSSdest))
    .pipe(browserSync.stream());
});

// Copy JS
gulp.task('devJS', function () {
  return gulp.src([
      // './src/js/scroll.js',
      // './src/js/menu.js',
      // './src/js/main.js',
    ])
    .pipe(concat('main.js'))
    .pipe(gulp.dest(paths.tmpJSdest))
    .pipe(browserSync.stream());
});

// Injects CSS and JS paths into HTML // not used in DEV at the moment
gulp.task('devInject', function () {
  var css = gulp.src(paths.tmpCSS);
  var js = gulp.src(paths.tmpJS);

  return gulp.src(paths.tmpHTML)
    .pipe(inject(css, {
      relative: true
    }))
    .pipe(inject(js, {
      relative: true
    }))
    .pipe(gulp.dest(paths.tmp));
});

// Clean tmp folder
gulp.task('devClean', function () {
  return del([
    'tmp/**', '!tmp'
  ]);
});

// Creates development copy
gulp.task('buildDev', function (done) {
  // runSequence('devClean', ['devHTML', 'devIMG', 'devCSS', 'devJS'], 'devInject', done);
  runSequence('devClean', ['devHTML', 'devIMG', 'devCSS', 'devJS'], done);
});

//  Sets local development server
gulp.task('devServer', ['buildDev'], function () {
  browserSync.init({
    server: paths.tmp
  });

  gulp.watch(paths.srcSASS, ['devCSS']);
  gulp.watch(paths.srcJS, ['devJS']);
  gulp.watch(paths.srcHTML, function () {
    // runSequence('devHTML', 'devInject', browserSync.reload)
    runSequence('devHTML', browserSync.reload)
  });
  gulp.watch(paths.srcIMG, ['devIMG']);
});

/*
 * DEVELOPMENT ENDS
 */