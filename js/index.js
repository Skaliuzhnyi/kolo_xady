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

// cta form

function ctaClick() {
  const body = document.querySelector('body');
  const ctaBtn = document.querySelector('.cta__btn');
  const cta = document.querySelector('.cta');
  const burgerBtn = document.querySelector('.burger');
  const menu = document.querySelector('.header');

  ctaBtn.addEventListener('click', () => {
    let ctaBtnnActive = ctaBtn.classList.contains('active');

    if (!ctaBtnnActive) {
      burgerBtn.classList.add('cta__active', 'active');
      cta.classList.add('active');
      body.classList.add('lock');
    } else {
      burgerBtn.classList.remove('cta__active', 'active');
      cta.classList.remove('active');
      body.classList.remove('lock');
    }
  });
}

ctaClick();

// slider

$('.slider').slick({
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2000,
});

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

function initMap() {
  let map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lng: window.mapOptions['center_lng'],
      lat: window.mapOptions['center_lat'],
    },
    zoom: window.mapOptions['zoom'],
    streetViewControl: false,
    disableDefaultUI: true,
    zoomControl: false,
  });

  for (let i = 0; i < markers.length; i++) {
    const marker = new google.maps.Marker({
      position: markers[i].about,
      icon: window.mapOptions.marker_ico,
      map: map,
      optimized: false,
    });

    marker.addListener('click', () => {
      map.setCenter(
        {
          lat: +markers[i].about.lat,
          lng: +markers[i].about.lng,
        },
        18
      );
    });
  }
}

window.initMap = initMap;

// location__list-choice відкриття submenu

function subMenuToShow() {

  const locationCurrent = document.querySelector('.location__list-current');
  const currentParent = document.querySelector('.location__list-choice');
  const locationContent = document.querySelector('.location__bottom');

  if (locationCurrent) {
    locationCurrent.addEventListener('click', (event) => {
      const target = event.target;
      target.classList.toggle('active');

      if (target.classList.contains('active')) {
        $(currentParent).slideDown(500);
      } else {
        $(currentParent).slideUp(500);
      }
    });

    const choiceItems = document.querySelectorAll('.location__list-choice-item');
  
    choiceItems.forEach((element) => {
      element.addEventListener('click', (event) => {
        const targetText = event.target.textContent;
        locationCurrent.textContent = targetText;
        $(currentParent).slideUp(500);
        locationCurrent.classList.remove('active');
        locationContent.style.display = 'block';
        locationCurrent.style.width = 'fit-content';
      })
    });
  }

}

subMenuToShow();