"use strict";

// ONE PAGE SCROLL

const currentWidth = document.body.offsetWidth;
const tabletWidth = 768;

$('[data-index]').on('click', function (e) {
    const target = parseInt($(e.currentTarget).attr('data-index'));
    $.fn.moveTo(target);
})

$(".main").onepage_scroll({
    sectionContainer: "section",     // sectionContainer accepts any kind of selector in case you don't want to use section
    easing: "ease",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",// "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
    animationTime: 500,             // AnimationTime let you define how long each section takes to animate
    pagination: true,                // You can either show or hide the pagination. Toggle true for show, false for hide.
    updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
    beforeMove: function (index) {
    },  // This option accepts a callback function. The function will be called before the page moves.
    afterMove: function (index) {
    },   // This option accepts a callback function. The function will be called after the page moves.
    loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
    keyboard: true,                  // You can activate the keyboard controls
    responsiveFallback: 768,        // You can fallback to normal page scroll by defining the width of the browser in which
    // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
    // the browser's width is less than 600, the fallback will kick in.
    direction: "vertical"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".
});

$('.btn').on('click', function () {
    if (currentWidth <= tabletWidth) {
        $('.btn').attr('href', '#contacts');
    }
    else {
        $('.btn').removeAttr('href', '#contacts');
    }
});

$('.btn-down__link').on('click', function () {
    if (currentWidth <= tabletWidth) {
        $('.btn-down__link').attr('href', '#features');
    }
    else {
        $('.btn-down__link').removeAttr('href', '#features');
    }
});

// MOBILE MENU

const mobileMenuCheck = document.querySelector('#checkbox');
const mobileMenuCont = document.querySelector('#mobile-cont');
const mobileMenuLink = document.getElementsByClassName('mobile-menu-link');
const mobileMenuBtn = document.querySelector('#mobile-btn');

mobileMenuCheck.addEventListener('click', function () {
    let activeClass = mobileMenuCont.classList.contains('mobile-menu-container--active');
    if (!activeClass) {
        mobileMenuCont.classList.add('mobile-menu-container--active');
        document.body.style.overflow = 'hidden';
        mobileMenuBtn.classList.add('mobile-menu-btn--active:after');
        mobileMenuBtn.classList.add('mobile-menu-btn--active:before');
        mobileMenuBtn.classList.add('mobile-menu-btn--active');
    }
    if (activeClass) {
        mobileMenuCont.classList.remove('mobile-menu-container--active');
        document.body.style.overflow = 'auto';
        mobileMenuBtn.classList.remove('mobile-menu-btn--active:after');
        mobileMenuBtn.classList.remove('mobile-menu-btn--active:before');
        mobileMenuBtn.classList.remove('mobile-menu-btn--active');
    }
});

for (let i = 0; i < mobileMenuLink.length; i++) {
    mobileMenuLink[i].addEventListener('click', function () {
        mobileMenuCont.classList.remove('mobile-menu-container--active');
        document.body.style.overflow = 'auto';
        mobileMenuBtn.classList.remove('mobile-menu-btn--active:after');
        mobileMenuBtn.classList.remove('mobile-menu-btn--active:before');
        mobileMenuBtn.classList.remove('mobile-menu-btn--active');

    });
}

// TEAM ACCO

const accoTeam = document.getElementsByClassName('accordeon-team__desc-people');

for (let i = 0; i < accoTeam.length; i++) {
    accoTeam[i].addEventListener('click', function () {
        let activeClass = this.classList.contains('accordeon-team__desc-people--active');
        if (!activeClass) {
            for (let y = 0; y < accoTeam.length; y++) {
                accoTeam[y].classList.remove('accordeon-team__desc-people--active');
                accoTeam[i].classList.add('accordeon-team__desc-people--active');
            }
        }
        if (activeClass) {
            this.classList.remove('accordeon-team__desc-people--active');
        }
    });
}

// MENU ACCO

const accoMenuBtn = document.getElementsByClassName('accordeon-menu__list-btn');
const accoMenuDesc = document.getElementsByClassName('accordeon-menu__hidden-desc');


for (let i = 0; i < accoMenuBtn.length; i++) {
    accoMenuBtn[i].addEventListener('click', function () {
        for (let y = 0; y < accoMenuDesc.length; y++) {
            let activeClass = accoMenuDesc[i].classList.contains('accordeon-menu__hidden-desc--active');
            if (!activeClass) {
                for (let x = 0; x < accoMenuDesc.length; x++) {
                    accoMenuDesc[x].classList.remove('accordeon-menu__hidden-desc--active');
                    accoMenuDesc[i].classList.add('accordeon-menu__hidden-desc--active');
                }
            }
            if (activeClass) {
                accoMenuDesc[i].classList.remove('accordeon-menu__hidden-desc--active');
            }
        }
    })
}

// BURGER MENU

const burgerMenu = document.getElementsByClassName('carousel-burgers__menu');
const burgerMenuList = document.getElementsByClassName('carousel-burgers__menu-list');

for (let i = 0; i < burgerMenu.length; i++) {
    burgerMenu[i].addEventListener('click', function () {
            for (let y = 0; y < burgerMenuList.length; y++) {
                let activeClass = burgerMenuList[i].classList.contains('carousel-burgers__menu-list--active');
                if (!activeClass) {
                    for (let x = 0; x < burgerMenuList.length; x++) {
                        burgerMenuList[i].classList.add('carousel-burgers__menu-list--active');
                    }
                }
                if (activeClass) {
                    burgerMenuList[i].classList.remove('carousel-burgers__menu-list--active');
                }
            }
        }
    );
}


// POPUP COMMENTS

const getBtnMore = document.querySelectorAll('.btn__more');
const closeBtn = document.querySelectorAll('.full-review__close');
const fullReview = document.querySelectorAll('#full-review');
const textTitle = document.querySelectorAll('.comments__title');
const textItem = document.querySelectorAll('.comments__text');
const addTextItem = document.querySelector('.full-review__content-item');
const addTitleItem = document.querySelector('.full-review__title');
const commentItem = document.querySelectorAll('.comments__item');

$(commentItem).click(function () {
    let getText = $(this).find(textItem).text();
    let getTitle = $(this).find(textTitle).text();
    $(addTextItem).text(getText);
    $(addTitleItem).text(getTitle);
});

for (let i = 0; i < getBtnMore.length; i++) {
    getBtnMore[i].addEventListener('click', function () {
        let activeClass = getBtnMore[i].classList.contains('full-review--active');
        if (!activeClass) {
            for (let x = 0; x < fullReview.length; x++) {
                fullReview[x].classList.add('full-review--active');
                document.body.style.overflow = 'hidden';
            }
        }
    });
    for (let y = 0; y < closeBtn.length; y++) {
        closeBtn[y].addEventListener('click', function () {
            fullReview[i].classList.remove('full-review--active');
            document.body.style.overflow = 'auto';
        });
    }
}

// ADD SLIDER

slidr.create('best-burgers__slider').start();

// SEND ORDER FORM

$('#order-form').on('submit', submitForm);

function submitForm(ev) {
    ev.preventDefault();

    var form = $(ev.target),
        data = form.serialize(),
        url = form.attr('action'),
        type = form.attr('method');

    ajaxForm(form).done(function (msg) {
        var mes = msg.mes,
            status = msg.status;

        if (status === 'OK') {
            form.append('<p class="success">' + mes + '</p>');
        } else {
            form.append('<p class="error">' + mes + '</p>');
        }
    }).fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });

}

// Универсальная функция для работы с формами
var ajaxForm = function (form) {
    var data = form.serialize(),
        url = form.attr('action');

    return $.ajax({
        type: 'POST',
        url: url,
        dataType: 'JSON',
        data: data
    })
};

// MAPS

ymaps.ready(init);

let placemarks = [{
        latitude: 59.97,
        longitude: 30.31,
        hintContent: '<div class="map__hint">ул. Литераторов, д. 19</div>',
        balloonContent: [
            '<div class="map__balloon">',
            '<img class="map__burger-img" src="../img/forsprite/png/burger-promo.png" alt="Бургер"/>',
            'Самые вкусные бургеры у нас! Заходите по адресу: ул. Литераторов, д. 19',
            '</div>'
        ]
    },
        {
            latitude: 59.94,
            longitude: 30.25,
            hintContent: '<div class="map__hint">Малый проспект В О, д 64</div>',
            balloonContent: [
                '<div class="map__balloon">',
                '<img class="map__burger-img" src="../img/forsprite/png/burger-promo.png" alt="Бургер"/>',
                'Самые вкусные бургеры у нас! Заходите по адресу: Малый проспект В О, д 64',
                '</div>'
            ]
        },
        {
            latitude: 59.93,
            longitude: 30.34,
            hintContent: '<div class="map__hint">наб. реки Фонтанки, д. 56</div>',
            balloonContent: [
                '<div class="map__balloon">',
                '<img class="map__burger-img" src="../img/forsprite/png/burger-promo.png" alt="Бургер"/>',
                'Самые вкусные бургеры у нас! Заходите по адресу: наб. реки Фонтанки, д. 56',
                '</div>'
            ]
        }
    ],
    geoObjects = [];

function init() {
    const map = new ymaps.Map('map', {
        center: [59.94, 30.32],
        zoom: 12,
        controls: ['zoomControl'],
        behaviors: []
    });

    for (let i = 0; i < placemarks.length; i++) {
        geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude], {
            hintContent: placemarks[i].hintContent,
            balloonContent: placemarks[i].balloonContent.join('')
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/sprites/map-marker.svg',
            iconImageSize: [46, 57],
            iconImageOffset: [-23, -57]
        });
    }

    const clusterer = new ymaps.Clusterer({
        clusterIcons: [{
            href: 'img/burger-promo.png',
            size: [100, 100],
            offset: [-50, -50]
        }],
        clusterIconContentLayout: null
    });

    map.geoObjects.add(clusterer);
    clusterer.add(geoObjects);
}

