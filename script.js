
  const toggleBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobileMenu');
  toggleBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });


   // swiper element
  const swiperEl = document.querySelector('swiper-container');

  // swiper parameters
  const swiperParams = {
    slidesPerView: 1,
    breakpoints: {
      640: {
        slidesPerView: 1,
      },
      1024: {
        slidesPerView: 1,
      },
    },
    on: {
      init() {
        // ...
      },
    },
  };

  // now we need to assign all parameters to Swiper element
  Object.assign(swiperEl, swiperParams);

  // and now initialize it
  swiperEl.initialize();