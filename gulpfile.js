const gulp = require("gulp");

const $gp = require("gulp-load-plugins")();

const browserSync = require("browser-sync").create();
const reload = browserSync.reload;
const webpack = require("webpack");
const webpackConfig = require("./webpack.config.js");
const moduleImporter = require("sass-module-importer");
const del = require("del");

const SRC_DIR = "src";
const DIST_DIR = "build/assets";
const ROOT_PATH = `./build`;

gulp.task("styles", () => {
  return gulp
    .src(`${SRC_DIR}/styles/app.scss`)
    .pipe($gp.plumber())
    .pipe($gp.sassGlob())
    .pipe($gp.sourcemaps.init())
    .pipe(
      $gp.sass({
        outputStyle: "compressed",
        includePaths: require('node-normalize-scss').includePaths,
        importer: moduleImporter()
      })
    )
    .pipe(
      $gp.autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe($gp.sourcemaps.write())
    .pipe($gp.rename({ suffix: ".min" }))
    .pipe(gulp.dest(`${DIST_DIR}/styles/`))
    .pipe(reload({ stream: true }));
});

gulp.task("fonts", () => {
  return gulp.src(`${SRC_DIR}/fonts/**`).pipe(gulp.dest(`${DIST_DIR}/fonts/`));
});

gulp.task("clean", () => {
  return del(ROOT_PATH);
});

gulp.task("scripts", () => {
  return gulp
    .src(`${SRC_DIR}/scripts/app.js`)
    .pipe($gp.plumber())
    .pipe($gp.webpack(webpackConfig, webpack))
    .pipe(gulp.dest(`${DIST_DIR}/scripts`))
    .pipe(reload({ stream: true }));
});

gulp.task("nodemon", done => {
  let started = false;
  $gp
    .nodemon({
      script: "server.js",
      env: { NODE_ENV: "development" },
      watch: "server.js"
    })
    .on("start", () => {
      if (started) return;
      done();
      started = true;
    });
});

gulp.task(
  "server",
  gulp.series("nodemon", done => {
    browserSync.init({
      proxy: "http://localhost:3000",
      port: 8080,
      open: false
    });
  })
);

gulp.task("svg", done => {
  const prettySvgs = () => {
    return gulp
      .src(`${SRC_DIR}/images/svg/*.svg`)
      .pipe(
        $gp.svgmin({
          js2svg: {
            pretty: true
          }
        })
      )
      .pipe(
        $gp.cheerio({
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
      .pipe($gp.replace("&gt;", ">"));
  };

  prettySvgs()
    .pipe(
      $gp.svgSprite({
        mode: {
          symbol: {
            sprite: "../sprite.svg"
          }
        }
      })
    )
    .pipe(gulp.dest(`${DIST_DIR}/images`));

  done();
});

gulp.task("images", () => {
  return gulp
    .src(`${SRC_DIR}/images/img/**/*.*`)
    .pipe(gulp.dest(`${DIST_DIR}/images/`));
});

gulp.task("watch", () => {
  gulp.watch(`${SRC_DIR}/styles/**/*.scss`, gulp.series("styles"));
  gulp.watch(`${SRC_DIR}/images/**/*.*`, gulp.series("images"));
  gulp.watch(`${SRC_DIR}/scripts/**/*.*`, gulp.series("scripts"));
  gulp.watch(`${SRC_DIR}/fonts/*`, gulp.series("fonts"));
  gulp.watch(`views/pages/*`).on('change', reload);
});

gulp.task(
  "default",
  gulp.series(
    "clean",
    gulp.parallel("styles", "images", "fonts", "scripts", "svg"),
    gulp.parallel("watch", "server")
  )
);