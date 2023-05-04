// burger menu

function burgerClick() {
  const body = document.querySelector('body');
  const burgerBtn = document.querySelector('.burger');
  const menu = document.querySelector('.header');
  const cta = document.querySelector('.cta');
  const menuLinks = document.querySelectorAll('.header__menu-link');

  burgerBtn.addEventListener('click', () => {
    let burgerBtnActive = burgerBtn.classList.contains('active');

    if (!burgerBtnActive) {
      burgerBtn.classList.add('active');
      menu.classList.add('active');
      body.classList.add('lock');
    } else {
      if (window.scrollY > 0) {
        burgerBtn.classList.remove('active');
        burgerBtn.classList.remove('cta__active');
        menu.classList.remove('active');
        body.classList.remove('lock');
        cta.classList.remove('active');
      } else {
        burgerBtn.classList.remove('active');
        menu.classList.remove('active');
        body.classList.remove('lock');
        burgerBtn.classList.remove('cta__active');
        cta.classList.remove('active');
      }
    }
  });

  menuLinks.forEach((element) => {
    element.addEventListener('click', () => {
      let burgerBtnActive = burgerBtn.classList.contains('active');

      if (burgerBtnActive) {
        burgerBtn.classList.remove('active');
        burgerBtn.classList.remove('cta__active');
        menu.classList.remove('active');
        body.classList.remove('lock');
        cta.classList.remove('active');
      } else {
        burgerBtn.classList.remove('active');
        menu.classList.remove('active');
        body.classList.remove('lock');
        burgerBtn.classList.remove('cta__active');
        cta.classList.remove('active');
      }
    });
  });
}

burgerClick();

// line

$(document).on('scroll', function () {
  if ($(document).scrollTop() > 0) {
    $('.top__line').addClass('fixed');
  } else {
    $('.top__line').removeClass('fixed');
  }
});

// cta form

function ctaClick() {
  const body = document.querySelector('body');
  const ctaBtn = document.querySelector('.cta__btn');
  const cta = document.querySelector('.cta');
  const close = document.querySelector('.cta__btn-close');

  ctaBtn.addEventListener('click', () => {
    cta.classList.add('active');
    body.classList.add('lock');
  });

  close.addEventListener('click', () => {
    cta.classList.remove('active');
    body.classList.remove('lock');
  });
}

ctaClick();

// скрол до секції

var linkNav = document.querySelectorAll('[href^="#"]'), //выбираем все ссылки к якорю на странице
  V = 0.23; // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
for (var i = 0; i < linkNav.length; i++) {
  linkNav[i].addEventListener(
    'click',
    function (e) {
      //по клику на ссылку
      e.preventDefault(); //отменяем стандартное поведение
      var w = window.pageYOffset, // производим прокрутка прокрутка
        hash = this.href.replace(/[^#]*(.*)/, '$1'); // к id элемента, к которому нужно перейти
      (t = document.querySelector(hash).getBoundingClientRect().top), // отступ от окна браузера до id
        (start = null);
      requestAnimationFrame(step);

      function step(time) {
        if (start === null) start = time;
        var progress = time - start,
          r =
            t < 0
              ? Math.max(w - progress / V, w + t)
              : Math.min(w + progress / V, w + t);
        window.scrollTo(0, r);
        if (r != w + t) {
          requestAnimationFrame(step);
        } else {
          location.hash = hash; // URL с хэшем
        }
      }
    },
    false
  );
}

// кастомізація випадаючого списку sellect

function makeСhoice() {
  const element = Array.from(document.querySelectorAll('.js-choice'));

  element.forEach((element) => {
    let choices = new Choices(element, {
      searchEnable: false,
      itemSelectText: '',
    });
  });
}

makeСhoice();

// карта
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lng: 50.46622085713504,
      lat: 30.499869546088952,
    },
    zoom: 11,
    streetViewControl: false,
    disableDefaultUI: true,
    zoomControl: false,
  });

  for (let i = 0; i < markers.length; i++) {
    const marker = new google.maps.Marker({
      position: markers[i].about,
      map: map,
      optimized: false,
    });

    marker.addListener('click', () => {
      setMapCenter(markers[i].about.lat, markers[i].about.lng);
    });
  }
}

window.initMap = initMap;

function setMapCenter(latCenter, lngCenter) {
  map.setCenter(
    {
      lat: +latCenter,
      lng: +lngCenter,
    },
    18
  );
}

// location__list-choice відкриття submenu

const locationCurrent = document.querySelector('.location__list-current');
const currentParent = document.querySelector('.location__list-choice');
const locationContent = document.querySelector('.location__bottom');
const choiceItems = document.querySelectorAll('.location__list-choice-item');
const locationCity = document.querySelectorAll('.location__city');

function subMenuToShow() {

  if (locationCurrent) {
    locationCurrent.addEventListener('click', (event) => {
      const target = event.target;
      target.classList.toggle('active');

      if (target.classList.contains('active')) {
        $(currentParent).slideDown(400);
      } else {
        $(currentParent).slideUp(400);
      }
    });

    

    choiceItems.forEach((element) => {
      element.addEventListener('click', (event) => {
        const targetText = event.target.textContent;
        locationCurrent.style.fontSize = '0';
        function changTitle() {
          locationCurrent.textContent = targetText;
          locationCurrent.style.fontSize = 'inherit';
        }
        setTimeout(changTitle, 600);

        $(currentParent).slideUp(400);
        locationCurrent.classList.remove('active');
        document.querySelector('.location__list').classList.add('city');
        function mapShow() {
          locationContent.style.opacity = '1';
          locationContent.style.height = '100%';
          locationContent.style.display = 'block';
        }
        setTimeout(mapShow, 800);
        document.querySelector('.location__top').classList.add('mb');

        locationCity.forEach((city) => {
          city.classList.remove('visible');

          if (
            city.getAttribute('data-city') === element.getAttribute('data-city')
          ) {
            city.classList.add('visible');
            setMapCenter(
              city.getAttribute('data-center_lng'),
              city.getAttribute('data-center_lat')
            );
          }
        });
      });
    });
  }
}

subMenuToShow();

// slider

var slickOptions = {
    autoplay: true,
    infinite: true,
    fade: true,
  },
  $slick = $('.slider');

$slick.slick(slickOptions);

$slick.on('swipe', function (event, slick, direction) {
  reinitSlick();
});

$('.slick-prev, .slick-next').on('click', function () {
  reinitSlick();
});

var reinitSlick = function () {
  $slick.slick(
    'slickSetOption',
    {
      autoplay: false,
    },
    false
  );
};

// липкий header
const body = document.querySelector('body');
const scrollUp = 'scroll-up';
const scrollDown = 'scroll-down';
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    body.classList.remove(scrollUp);
    return;
  }

  if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
    // down
    body.classList.remove(scrollUp);
    body.classList.add(scrollDown);
  } else if (
    currentScroll < lastScroll &&
    body.classList.contains(scrollDown)
  ) {
    // up
    body.classList.remove(scrollDown);
    body.classList.add(scrollUp);
  }
  lastScroll = currentScroll;
});
