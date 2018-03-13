;'use strict';

(function mobileMenu() {
  const mobileMenuCheck = document.querySelector('#mobile-checkbox');
  const mobileMenuCont = document.querySelector('#mobile-cont');
  const mobileMenuLink = document.getElementsByClassName('mobile-menu__link');
  const mobileMenuBtn = document.querySelector('#mobile-btn');

  if (mobileMenuCheck) {
    mobileMenuCheck.addEventListener('click', function () {
      let activeClass = mobileMenuCont.classList.contains('mobile-menu__container--active');
      if (!activeClass) {
        mobileMenuCont.classList.add('mobile-menu__container--active');
        document.body.style.overflow = 'hidden';
        mobileMenuBtn.classList.add('mobile-menu__btn--active');
      }
      if (activeClass) {
        mobileMenuCont.classList.remove('mobile-menu__container--active');
        document.body.style.overflow = 'auto';
        mobileMenuBtn.classList.remove('mobile-menu__btn--active');
      }
    });

    for (let i = 0; i < mobileMenuLink.length; i++) {
      mobileMenuLink[i].addEventListener('click', function () {
        mobileMenuCont.classList.remove('mobile-menu__container--active');
        document.body.style.overflow = 'auto';
        mobileMenuBtn.classList.remove('mobile-menu__btn--active');
      })
    }
  }

  mobileMenuCont.addEventListener('click', function (e) {
      mobileMenuCont.classList.remove('mobile-menu__container--active');
      document.body.style.overflow = 'auto';
      mobileMenuBtn.classList.remove('mobile-menu__btn--active');
  })

})();
