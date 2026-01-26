document.addEventListener("DOMContentLoaded", () => {
  /* ==============================
     DROPDOWNS
  ============================== */
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

  /* ==============================
     FAKE PLACEHOLDER LOGIC
  ============================== */
  const nameInput = document.getElementById("nameInput");
  const namePlaceholder = document.getElementById("namePlaceholder");

  if (nameInput && namePlaceholder) {
    nameInput.addEventListener("input", () => {
      namePlaceholder.style.opacity = nameInput.value ? "0" : "1";
    });
  }

  /* ==============================
     TEXTAREA CHARACTER COUNTER
  ============================== */
  const textarea = document.getElementById("messageBox");
  const counter = document.getElementById("charCount");

  if (textarea && counter) {
    textarea.addEventListener("input", () => {
      counter.textContent = `${textarea.value.length} / 300`;
    });
  }

  /* ==============================
     COUNTDOWN TIMER
  ============================== */
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (daysEl && hoursEl && minutesEl && secondsEl) {
    const countDownDate = new Date();
    countDownDate.setDate(countDownDate.getDate() + 30);

    setInterval(() => {
      const now = Date.now();
      const distance = countDownDate - now;

      if (distance <= 0) {
        daysEl.textContent =
          hoursEl.textContent =
          minutesEl.textContent =
          secondsEl.textContent =
            "0";
        return;
      }

      daysEl.textContent = Math.floor(distance / (1000 * 60 * 60 * 24));
      hoursEl.textContent = Math.floor((distance / (1000 * 60 * 60)) % 24);
      minutesEl.textContent = Math.floor((distance / (1000 * 60)) % 60);
      secondsEl.textContent = Math.floor((distance / 1000) % 60);
    }, 1000);
  }

  /* ==============================
     GO TO TOP BUTTON
  ============================== */
  const goTopBtn = document.getElementById("goTopBtn");
  const pageTop = document.getElementById("pageTop");

  if (goTopBtn && pageTop) {
    window.addEventListener("scroll", () => {
      goTopBtn.classList.toggle("show", window.scrollY > 300);
    });

    goTopBtn.addEventListener("click", () => {
      pageTop.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => pageTop.focus(), 400);
    });
  }


  /* ==============================
     QUANTITY BUTTON
  ============================== */

 const decreaseBtn = document.getElementById("decreaseBtn");
  const increaseBtn = document.getElementById("increaseBtn");
  const quantityInput = document.getElementById("quantityInput");

  decreaseBtn.addEventListener("click", () => {
    let currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
    }
  });

  increaseBtn.addEventListener("click", () => {
    let currentValue = parseInt(quantityInput.value);
    quantityInput.value = currentValue + 1;
  });


});
