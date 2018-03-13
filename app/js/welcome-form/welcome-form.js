;'use strict';

(function welcomeForm() {

  let welcome = $('.welcome-form');
  let link = $('.welcome__link');
  let anim = 'run-index-animation';
  let backf = 'back';

  link.click(function (e) {
    e.preventDefault();
    welcome.each(function () {
      if ($(this).hasClass(anim)) {
        $(this).removeClass(anim);
      }
      if ($(this).hasClass(backf)) {
        $(this).removeClass(backf);
      }
      else {
        $(this).addClass(backf);
        $(this).addClass(anim);
      }
    });

    $.when( link.animate({ opacity: 0.0 }, 700) ).then(function(){
      link.hide();
    });

  });

})();
