"use strict";

const
    gulp = require('gulp'), // Подключаем Gulp
    sass = require('gulp-sass'), //Подключаем Sass пакет,
    scss = require('gulp-scss'), //Подключаем Scss пакет,
    browserSync = require('browser-sync'), // Подключаем Browser Sync
    concat = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify = require('gulp-uglify'), // Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del = require('del'), // Подключаем библиотеку для удаления файлов и папок
    imagemin = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    cache = require('gulp-cache'), // Подключаем библиотеку кеширования
    autoprefixer = require('gulp-autoprefixer'), // Подключаем библиотеку для автоматического добавления префиксов
    spritesmith = require('gulp.spritesmith'), // Подключаем библиотеку для автоматического создания спрайтов
    upmodul = require("gulp-update-modul"), // Подключаем библиотеку для обновления плагинов
    uncss = require('gulp-uncss'), // Подключаем библиотеку для автоматического удаления не используемого кода CSS
    plumber = require('gulp-plumber'), // Подключаем пакет для отображения ошибок(чтобы не выкидывало)
    sourcemaps = require('gulp-sourcemaps'), // Соурсмапы
    babel = require('gulp-babel'), // Переписывает модный джс в старый
    groupMediaQueries = require('gulp-group-css-media-queries');

//

const src = {
    baseApp: 'app',
    baseDist: 'dist',
    htmlTake: 'app/*.html',
    scssTake: 'app/sass/**/*.scss',
    jsTake: 'app/js/**/*',
    phpTake: 'app/js/**/*.js',
    fontsTake: 'app/fonts/**/*',
    imgTake: 'app/img/**/**',
    pngTake: 'app/img/forsprite/png/*',
    cssTake:
        [
            'app/css/main.css',
            'app/css/libs.min.css'
        ],
    cssLibsTake:
        [
            'app/libs/normalize-css/normalize.css',
            'app/libs/magnific-popup/baseDist/magnific-popup.css'
        ],
    jsLibsTake:
        [
            'app/libs/jquery/baseDist/jquery.min.js',
            'app/libs/magnific-popup/baseDist/jquery.magnific-popup.min.js'
        ],

    pngPut: 'app/img/sprites/png',
    cssPut: 'app/css',
    jsPut: 'app/js',


    imgDist: 'dist/img',
    jsDist: 'dist/js',
    cssDist: 'dist/css',
    fontsDist: 'dist/fonts',
    htmlDist: 'dist/'
};

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

// gulp.task('scripts', function () {
//     return gulp.src(src.jsTake)
//         .pipe(plumber())
//         .pipe(babel({
//             presets: ['env']
//         }))
//         // .pipe(uglify())
//         // .pipe(concat('script.min.js'))
//         .pipe(gulp.dest(src.jsDist))
// });


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

gulp.task('build', ['clean', 'scss', 'jslibs', 'img'], function () {

    var buildCss = gulp.src(src.cssTake)
        .pipe(gulp.dest(src.cssDist));

    var buildFonts = gulp.src(src.fontsTake)
        .pipe(gulp.dest(src.fontsDist));

    var buildJs = gulp.src(
        src.jsTake)
        .pipe(gulp.dest(src.jsDist));

    var buildHtml = gulp.src(src.htmlTake)
        .pipe(gulp.dest(src.htmlDist));

});

// SPRITES

gulp.task('sprite:png', function () {
    var spriteData =
        gulp.src(src.pngTake)
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.css'
            }));

    spriteData.img.pipe(gulp.dest(src.pngPut));
    spriteData.css.pipe(gulp.dest(src.cssPut));
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