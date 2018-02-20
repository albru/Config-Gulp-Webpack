"use strict";

const
    gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    sass = require('gulp-sass'),
    scss = require('gulp-scss'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    spritesmith = require('gulp.spritesmith'),
    upmodul = require("gulp-update-modul"),
    uncss = require('gulp-uncss'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'), //
    groupMediaQueries = require('gulp-group-css-media-queries'),
    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin'),
    cheerio = require('gulp-cheerio'),
    size = require('gulp-size'),
    buffer = require('vinyl-buffer'),
    merge = require('merge-stream'),
    htmlmin = require('gulp-htmlmin');

// SOURCES

const src = {
    baseApp: 'app',
    baseDist: 'dist',
    htmlTake: 'app/*.html',
    scssTake: 'app/sass/**/*.scss',
    jsTake: 'app/js/*.js',
    phpTake: 'app/*.php',
    fontsTake: 'app/fonts/**/*',
    imgTake: [
        'app/img/**/**',
        '!app/img/sprites/*.scss',
        '!app/img/forsprite/**/**'
    ],
    pngTake: 'app/img/forsprite/png/*',
    svgTake: 'app/img/forsprite/svg/*',
    cssTake: [
        'app/css/main.css',
        'app/css/libs.min.css'
    ],
    cssLibsTake: [
        'app/libs/normalize-css/normalize.css',
        'app/libs/magnific-popup/baseDist/magnific-popup.css'
    ],
    jsLibsTake: [
        'app/libs/jquery/baseDist/jquery.min.js',
        'app/libs/magnific-popup/baseDist/jquery.magnific-popup.min.js'
    ],

    svgPut: 'app/img/sprites/',
    pngPut: 'app/img/sprites/',
    cssPut: 'app/css',
    jsPut: 'app/js',

    imgDist: 'dist/img',
    jsDist: 'dist/js',
    cssDist: 'dist/css',
    fontsDist: 'dist/fonts'
};

// HTML

gulp.task('html', function () {
    return gulp.src(src.htmlTake)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(src.baseDist));
});

// CSS

gulp.task('scss', function () {
    return gulp.src(src.scssTake)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(scss())
        .pipe(groupMediaQueries())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(cssnano())
        .pipe(gulp.dest(src.cssPut))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('css-libs', ['scss'], function () {
    return gulp.src(src.cssLibsTake)
        .pipe(concat('libs.min.css'))
        .pipe(cssnano())
        .pipe(rename('libs.min.css'))
        .pipe(gulp.dest(src.cssPut));
});

// gulp.task('unscss', function() {
//     return gulp.src('app/sass/**/*.scss')
//         .pipe(uncss({
//             html: ['app/**/*.html']
//         }))
//         .pipe(gulp.dest('app/sass'))
// });

// JS

gulp.task('scripts', function () {
    return gulp.src(src.jsTake)
        .pipe(plumber())
        .pipe(babel({
            presets: ['env']
        }))
        // .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(src.jsDist))
});


gulp.task('jslibs', function () {
    return gulp.src(src.jsLibsTake)
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(src.jsPut));
});

// WATCH & AUTO UPDATE

gulp.task('watch', ['browser-sync', 'css-libs', 'jslibs'], function () {
    gulp.watch(src.scssTake, ['scss']);
    gulp.watch(src.htmlTake, browserSync.reload);
    gulp.watch(src.phpTake, browserSync.reload);
    gulp.watch(src.jsTake, browserSync.reload);
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: src.baseApp
        },
        notify: true
    });
});

// MINIFY IMGS

gulp.task('img', function () {
    return gulp.src(src.imgTake)
    // .pipe(cache(imagemin({ // С кешированием
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(src.baseDist + '/img'));
});

// BUILD

gulp.task('clean', function () {
    return del.sync(src.baseDist);
});

gulp.task('build', ['clean', 'html', 'scss', 'jslibs', 'scripts', 'img'], function () {

    var buildCss = gulp.src(src.cssTake)
        .pipe(gulp.dest(src.cssDist));

    var buildFonts = gulp.src(src.fontsTake)
        .pipe(gulp.dest(src.fontsDist));

    // var buildJs = gulp.src(
    //     src.jsTake)
    //     .pipe(gulp.dest(src.jsDist));

    // var buildHtml = gulp.src(src.htmlTake)
    //     .pipe(gulp.dest(src.htmlDist));

    var buildPhp = gulp.src(src.phpTake)
        .pipe(gulp.dest(src.baseDist));

});

// SPRITES

gulp.task('sprite:png', function (callback) {
    del(src.pngPut + '*.png');

    let spriteData = gulp.src(src.pngTake)
        .pipe(spritesmith({
            imgName: 'sprite-png.png',
            cssName: 'sprite-png.scss',
            padding: 35,
            imgPath: src.pngPut
        }));
    let imgStream = spriteData.img
        .pipe(buffer())
        .pipe(imagemin({
            use: [pngquant()]
        }))
        .pipe(gulp.dest(src.pngPut));
    let cssStream = spriteData.css
        .pipe(gulp.dest(src.pngPut));
    return merge(imgStream, cssStream);
});

gulp.task('sprite:svg', function (callback) {
    return gulp.src(src.svgTake)
        .pipe(svgmin(function (file) {
            return {
                plugins: [{
                    cleanupIDs: {
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore({inlineSvg: true}))
        .pipe(cheerio({
            run: function ($) {
                // $('path').removeAttr('fill');
                // $('g').removeAttr('fill');
                $('svg').attr('style', 'display:none');
            },
            parserOptions: {
                xmlMode: true
            }
        }))
        .pipe(rename('sprite-svg.svg'))
        .pipe(size({
            title: 'Размер svg спрайта',
            showFiles: true,
            showTotal: false
        }))
        .pipe(gulp.dest(src.svgPut));
});

// ОЧИСТКА КЭША

gulp.task('clear', function (callback) {
    return cache.clearAll();
});

// DEFAULT TASK

gulp.task('default', ['watch']);

// АВТО ОБНОВЛЕНИЕ ПЛАГИНОВ

gulp.task('update', function () {
    gulp.src('package.json')
        .pipe(upmodul('latest', 'false'));
});