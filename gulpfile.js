"use strict"

var 
  gulp         = require('gulp'), // Подключаем Gulp
	sass         = require('gulp-sass'), //Подключаем Sass пакет,
	scss				 = require('gulp-scss'), //Подключаем Scss пакет,
	browserSync  = require('browser-sync'), // Подключаем Browser Sync
	concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
	uglify       = require('gulp-uglify'), // Подключаем gulp-uglifyjs (для сжатия JS)
	cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
	rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
	imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
	pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
	cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
	autoprefixer = require('gulp-autoprefixer'), // Подключаем библиотеку для автоматического добавления префиксов
	spritesmith  = require('gulp.spritesmith'), // Подключаем библиотеку для автоматического создания спрайтов
	upmodul      = require("gulp-update-modul"), // Подключаем библиотеку для обновления плагинов
	uncss				 = require('gulp-uncss'); // Подключаем библиотеку для автоматического удаления не используемого кода CSS

// **************** ПРОВЕРЯЕМ И УДАЛЯЕМ НЕ ИСПОЛЬЗУЕМЫЙ CSS КОД

gulp.task('unscss', function() {
	return gulp.src([
		'app/sass/**/*.scss',
		'app/css/**/*.css'
		])
		.pipe(uncss({
     html: ['app/**/*.html']
     }))
		.pipe(gulp.dest('app/sass'))
});

// **************** КОМПИЛИРУЕМ SASS В CSS

gulp.task('scss', function(){ // Создаем таск Sass
	return gulp.src('app/sass/**/*.scss') // Берем источник
		.pipe(scss()) // Преобразуем Scss в CSS посредством gulp-scss
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
		.pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

// gulp.task('sass', function(){ // Создаем таск Sass
// 	return gulp.src('app/sass/**/*.sass') // Берем источник
// 		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
// 		.pipe(sass().on('error', sass.logError))
// 		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
// 		.pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
// 		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
// });
// 

// **************** АВТО ОБНОВЛЕНИЕ ПЛАГИНОВ

gulp.task('update', function () {
    gulp.src('package.json')
    .pipe(upmodul('latest', 'false')); //update all modules latest version. 
});

// **************** АВТО СОЗДАНИЕ СПРАЙТОВ

gulp.task('sprite', function() {
    var spriteData = 
        gulp.src('app/img/forsprite/**/*') // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.css',
            }));

    spriteData.img.pipe(gulp.dest('app/img/sprite')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('app/css')); // путь, куда сохраняем стили
});

// **************** АВТО ОБНОВЛЕНИЕ БРАУЗЕРОВ

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'app' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});

// **************** СЖАТИЕ БИБЛИОТЕК JS / CSS

gulp.task('scripts', function() {
	return gulp.src([ // Берем все необходимые библиотеки
		'app/libs/jquery/dist/jquery.min.js', // Берем jQuery
		'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js' // Берем Magnific Popup
		])
		.pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});

gulp.task('css-libs', ['scss'], function() {
	return gulp.src([
		'app/libs/normalize-css/normalize.css',
		'app/libs/magnific-popup/dist/magnific-popup.css'
		]) // Выбираем файл для минификации
		.pipe(concat('libs.min.css')) // Собираем их в кучу в новом файле libs.min.js
		.pipe(cssnano()) // Сжимаем
		.pipe(rename('libs.min.css')) // Сохраняем (Добавляем суффикс .min ({suffix: '.min'}))
		.pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});

// **************** СЛЕЖЕНИЕ ЗА ФАЙЛАМИ
 
gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function() {
	gulp.watch('app/sass/**/*.scss', ['scss']); // Наблюдение за sass файлами в папке sass
	gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('app/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
});

// **************** УДАЛЕНИЕ DIST ПЕРЕД СБОРКОЙ

gulp.task('clean', function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});

// **************** СЖАТИЕ ИЗОБРАЖЕНИЙ

gulp.task('img', function() {
	return gulp.src(['!app/img/forsprite/**/*', 'app/img/**/*']) // Берем все изображения из app
		.pipe(cache(imagemin({ // С кешированием
		// .pipe(imagemin({ // Сжимаем изображения без кеширования
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))/**/)
		.pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

// **************** ИТОГОВЫЙ BUILD

gulp.task('build', ['clean', 'img', 'unscss', 'scss', 'scripts'], function() {

	var buildCss = gulp.src([ // Переносим библиотеки в продакшен
		'app/css/main.css',
		'app/css/libs.min.css'
		])
	.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
	.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
	.pipe(gulp.dest('dist'));

});

// **************** ОЧИСТКА КЭША

gulp.task('clear', function (callback) {
	return cache.clearAll(); // Чистим кэш
})

// **************** DEFAULT TASK

gulp.task('default', ['watch']);