Сборка gulp-webpack
=============================

Thank you for choosing Yii - a high-performance component-based PHP framework.

[![Build Status](https://secure.travis-ci.org/yiisoft/yii.png)](http://travis-ci.org/yiisoft/yii)



INSTALLATION
------------

Please make sure the release file is unpacked under a Web-accessible
directory. You shall see the following files and directories:

      demos/               demos
      framework/           framework source files
      requirements/        requirement checker
      CHANGELOG            describing changes in every Yii release
      LICENSE              license of Yii
      README               this file
      UPGRADE              upgrading instructions


REQUIREMENTS
------------

The minimum requirement by Yii is that your Web server supports
PHP 5.1.0 or above. Yii has been tested with Apache HTTP server
on Windows and Linux operating systems.

Please access the following URL to check if your Web server reaches
the requirements by Yii, assuming "YiiPath" is where Yii is installed:

      http://hostname/YiiPath/requirements/index.php


QUICK START
-----------

Yii comes with a command line tool called "yiic" that can create
a skeleton Yii application for you to start with.

On command line, type in the following commands:

        $ cd YiiPath/framework                (Linux)
        cd YiiPath\framework                  (Windows)

        $ ./yiic webapp ../testdrive          (Linux)
        yiic webapp ..\testdrive              (Windows)

The new Yii application will be created at "YiiPath/testdrive".
You can access it with the following URL:

        http://hostname/YiiPath/testdrive/index.php


WHAT'S NEXT
-----------

Please visit the project website for tutorials, class reference
and join discussions with other Yii users.



The Yii Developer Team
http://www.yiiframework.com



УСТАНОВКА
---

h2 Webpack собирает только js, всё остальное делает gulp
Основные команды для npm:

      yarn               Установка пакетов в npm
      gulp               Включение слежки за файлами, компиляция pug, scss, обновление браузера, пересборка библиотек 
      webpack        		 Включение слежки за js файлами и сборка в бандл
      sprite:svg (png)   Спрайты. Для png в папке sprites создастся scss файл со стилями
      gulp clear         Очистка кэша
      gulp build         Итоговый билд


Библиотеки css и js: 
Автоматически собираются при слежении в файлы libs.min.css и libs.min.js.

Билд:
gulp build
Перед установкой удаляется и создается папка dist, далее туда переносятся уже готовые файлы(обработанные, сжатые, минифицированые и тд).

> **HTML файлы копируются в одну папку, после билда их необходимо разложить по папкам как они лежали у вас в исходниках**
