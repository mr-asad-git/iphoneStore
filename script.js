
document.addEventListener('DOMContentLoaded', () => {
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

  

  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const iconMenu   = document.getElementById('iconMenu');
  const iconClose  = document.getElementById('iconClose');

  menuToggle.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');

    if (isHidden) {
      mobileMenu.classList.remove('hidden');   // show overlay
      iconMenu.classList.add('hidden');        // hide hamburger
      iconClose.classList.remove('hidden');    // show close
      menuToggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('overflow-hidden'); // lock background scroll
    } else {
      mobileMenu.classList.add('hidden');      // hide overlay
      iconMenu.classList.remove('hidden');     // show hamburger
      iconClose.classList.add('hidden');       // hide close
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('overflow-hidden');
    }
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      mobileMenu.classList.add('hidden');
      iconMenu.classList.remove('hidden');
      iconClose.classList.add('hidden');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('overflow-hidden');
    }
  });

  const profileToggle = document.getElementById("profileToggle");
const profileDropdown = document.getElementById("profileDropdown");
const profileMenu = document.getElementById("profileMenu");
const closeMenu = document.getElementById("closeMenu");

function isMobile() {
  return window.innerWidth < 640; // Tailwind's sm breakpoint
}

profileToggle.addEventListener("click", () => {
  if (isMobile()) {
    profileMenu.classList.remove("hidden"); // show overlay
  } else {
    profileDropdown.classList.toggle("hidden"); // toggle dropdown below button
  }
});

closeMenu.addEventListener("click", () => {
  profileMenu.classList.add("hidden");
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!profileToggle.contains(e.target) && !profileDropdown.contains(e.target)) {
    profileDropdown.classList.add("hidden");
  }
});

  // Timer Countdown
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  // Set the date we're counting down to (e.g., end of the month)
  const countDownDate = new Date();
  countDownDate.setDate(countDownDate.getDate() + 30);

  // Update the count down every 1 second
  const x = setInterval(function() {

    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the elements
    daysEl.innerHTML = days;
    hoursEl.innerHTML = hours;
    minutesEl.innerHTML = minutes;
    secondsEl.innerHTML = seconds;

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      daysEl.innerHTML = "0";
      hoursEl.innerHTML = "0";
      minutesEl.innerHTML = "0";
      secondsEl.innerHTML = "0";
    }
  }, 1000);

});


