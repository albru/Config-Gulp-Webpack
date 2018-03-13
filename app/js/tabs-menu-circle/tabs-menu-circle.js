;'use strict';

(function tabMenuCircle() {
  let circle = $('.blog__content-tab-circle');
  let menu = $('.blog__content-tab-cont');
  let clientWidth = $(window).width();
  let menuWidthValue = menu.width();

  function changeMenuWidth(width) {
    let editMenuWidth = menu.css('width', width);
    return $(this);
  }

  if (clientWidth >= 1200 && !menuWidthValue) {
    changeMenuWidth('20%');
  }

  if (clientWidth < 1200) {
    circle.click(function (e) {
      if (clientWidth < 801) {
        changeMenuWidth(400);
        circle.css('opacity', '0');
        circle.hide();
      }
      if (clientWidth > 801) {
        changeMenuWidth(600);
        circle.css('opacity', '0');
        circle.hide();
      }
    });

    $(document).click(function (e) { // событие клика по веб-документу;
      if (!menu.is(e.target) // если клик был не по нашему блоку
        && menu.has(e.target).length === 0) { // и не по его дочерним элементам
        changeMenuWidth(0);
        circle.show();
        circle.animate({opacity: 1}, 700);
      }
    });
  }

  return $(this);
})();