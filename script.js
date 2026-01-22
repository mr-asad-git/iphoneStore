document.addEventListener("DOMContentLoaded", () => {
  function setupDropdown(toggleId, dropdownId) {
    const toggle = document.getElementById(toggleId);
    const dropdown = document.getElementById(dropdownId);

    if (!toggle || !dropdown) return;

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("invisible");
      dropdown.classList.toggle("opacity-0");
      dropdown.classList.toggle("opacity-100");
    });

    document.addEventListener("click", (e) => {
      if (!toggle.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.add("invisible", "opacity-0");
        dropdown.classList.remove("opacity-100");
      }
    });
  }

  setupDropdown("profileToggleMobile", "profileDropdownMobile");
  setupDropdown("profileToggleDesktop", "profileDropdownDesktop");
  setupDropdown("menuToggle", "menuDropdown");

  // Timer Countdown
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  // Set the date we're counting down to (e.g., end of the month)
  const countDownDate = new Date();
  countDownDate.setDate(countDownDate.getDate() + 30);

  // Update the count down every 1 second
  const x = setInterval(function () {
    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
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

document.addEventListener("DOMContentLoaded", () => {
  //Floating button js

  const goTopBtn = document.getElementById("goTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      goTopBtn.classList.add("show");
    } else {
      goTopBtn.classList.remove("show");
    }
  });

  goTopBtn.addEventListener("click", () => {
    document.getElementById("pageTop").scrollIntoView({
      behavior: "smooth",
    });

    setTimeout(() => {
      document.getElementById("pageTop").focus();
    }, 400);
  });
});
