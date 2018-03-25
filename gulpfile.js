const gulp = require('gulp');
const pug = require('gulp-pug');

const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');

const del = require('del');

const browserSync = require('browser-sync').create();

const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const paths = {
    root: './build',
    templates: {
        pages: 'src/templates/pages/*.pug',
        src: 'src/templates/**/*.pug'
    },
    styles: {
        src: 'src/styles/**/*.scss',
        dest: 'build/assets/styles/'
    },    
    images: {
        src: 'src/images/img/**/*.*',
        svg: 'src/images/svg/*.svg',
        dest: 'build/assets/images/'
    },
    scripts: {
        src: 'src/scripts/app.js',
        dest: 'build/assets/scripts/'
    },
    fonts: {
        src: 'src/fonts/**/*.*',
        dest: 'build/assets/fonts'
    }
}

function templates() {
    return gulp.src(paths.templates.pages)
        .pipe(pug({ pretty: '\t' }))
        .pipe(gulp.dest(paths.root));
}

function styles() {
    return gulp.src('./src/styles/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(
            {
                outputStyle: 'compressed', 
                includePaths: require('node-normalize-scss').includePaths
            }
        ))
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.styles.dest))
}

function fonts() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest))
}

function clean() {
    return del(paths.root);
}

function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(gulpWebpack(webpackConfig, webpack)) 
        .pipe(gulp.dest(paths.scripts.dest));
}

function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.templates.src, templates);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.scripts.src, scripts);
}

function server() {
    browserSync.init({
        server: paths.root
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

function images() {
    return gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest));
}

function svg(done) {
    const prettySvgs = () => {
      return gulp
        .src(paths.images.svg)
        .pipe(
          svgmin({
            js2svg: {
              pretty: true
            }
          })
        )
        .pipe(
          cheerio({
            run($) {
              $("[fill], [stroke], [style], [width], [height]")
                .removeAttr("fill")
                .removeAttr("stroke")
                .removeAttr("style")
                .removeAttr("width")
                .removeAttr("height");
            },
            parserOptions: { xmlMode: true }
          })
        )
        .pipe(replace("&gt;", ">"));
    };
  
    prettySvgs()
      .pipe(
        svgSprite({
          mode: {
            symbol: {
              sprite: "../sprite.svg"
            }
          }
        })
      )
      .pipe(gulp.dest(paths.images.dest));

    done();
}

exports.templates = templates;
exports.styles = styles;
exports.clean = clean;
exports.images = images;
exports.svg = svg;
exports.fonts = fonts;

gulp.task('default', gulp.series(
    clean,
    gulp.parallel(styles, templates, images, scripts, svg, fonts),
    gulp.parallel(watch, server)
));