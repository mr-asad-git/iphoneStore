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
  // setupDropdown("menuToggle", "menuDropdown"); // Removed for sidebar implementation

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

  if (decreaseBtn && increaseBtn && quantityInput) {
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
  }


  /* ==============================
     DYNAMIC CART SIDEBAR INJECTION
  ============================== */
  function injectCartSidebar() {
    // Determine path prefix based on current location
    let path = window.location.pathname;
    let prefix = "";

    // If we're in a subdirectory, we need to go up to the root to find assets
    if (path.includes("/pages/") || path.includes("/product/")) {
      prefix = "../../";
      if (path.includes("/user/account/")) prefix = "../../../";
    }

    const sidebarHTML = `
      <!-- Cart Sidebar -->
      <div id="cartSidebar" class="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-2xl transform translate-x-full transition-transform duration-300 z-50 flex flex-col">
        <!-- Close button -->
        <div class="flex justify-between items-center p-6 border-b">
          <h2 class="font-[Poppins] font-bold text-2xl">Your Cart</h2>
          <button id="closeCart" class="text-gray-500 hover:text-black transition-colors text-3xl">&times;</button>
        </div>

        <!-- Cart Data -->
        <div class="flex-1 overflow-y-auto p-6">
          <div class="flex flex-col gap-6">
            <!-- Cart Item 1 -->
            <div class="cart-item flex items-center gap-4 bg-gray-50 p-4 rounded-lg relative group transition-all duration-300">
              <div class="relative min-w-[70px]">
                <img src="${prefix}assets/images/card/cardImages/b1.png" class="w-[70px] h-[70px] object-contain" alt="">
                <button class="remove-item absolute -top-2 -left-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  &times;
                </button>
              </div>
              <div class="flex-1">
                <h3 class="font-[Poppins] font-semibold text-gray-800">Men's Winter Coat</h3>
                <p class="text-sm text-gray-500 mt-1">$100</p>
                <div class="flex items-center justify-between mt-3">
                  <div class="flex items-center border border-gray-300 rounded overflow-hidden bg-white">
                    <button class="sidebar-qty-btn px-2 py-1 bg-gray-100 hover:bg-gray-200 text-sm transition-colors">-</button>
                    <input type="number" min="1" value="1" class="w-10 text-center text-sm border-x border-gray-300 outline-none">
                    <button class="sidebar-qty-btn px-2 py-1 bg-gray-100 hover:bg-gray-200 text-sm transition-colors">+</button>
                  </div>
                  <p class="font-bold text-gray-800">$100</p>
                </div>
              </div>
            </div>

            <!-- Cart Item 2 -->
            <div class="cart-item flex items-center gap-4 bg-gray-50 p-4 rounded-lg relative group transition-all duration-300">
              <div class="relative min-w-[70px]">
                <img src="${prefix}assets/images/card/cardImages/b2.png" class="w-[70px] h-[70px] object-contain" alt="">
                <button class="remove-item absolute -top-2 -left-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  &times;
                </button>
              </div>
              <div class="flex-1">
                <h3 class="font-[Poppins] font-semibold text-gray-800">Women's bag</h3>
                <p class="text-sm text-gray-500 mt-1">$100</p>
                <div class="flex items-center justify-between mt-3">
                  <div class="flex items-center border border-gray-300 rounded overflow-hidden bg-white">
                    <button class="sidebar-qty-btn px-2 py-1 bg-gray-100 hover:bg-gray-200 text-sm transition-colors">-</button>
                    <input type="number" min="1" value="1" class="w-10 text-center text-sm border-x border-gray-300 outline-none">
                    <button class="sidebar-qty-btn px-2 py-1 bg-gray-100 hover:bg-gray-200 text-sm transition-colors">+</button>
                  </div>
                  <p class="font-bold text-gray-800">$100</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Actions -->
        <div class="p-6 bg-gray-50 border-t">
          <div class="flex flex-col gap-4">
            <div class="flex justify-between items-center">
              <p class="text-gray-600 font-[Poppins]">Subtotal</p>
              <p class="font-bold text-xl">$200</p>
            </div>
            <div class="flex gap-3 mt-2">
              <a href="${prefix}pages/checkout/checkout.html" class="flex-1 py-3 text-center bg-black text-white font-bold rounded-lg hover:opacity-90 transition-all font-[Poppins]">
                Checkout
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Overlay -->
      <div id="cartOverlay" class="fixed inset-0 bg-black/40 hidden z-40"></div>
    `;

    document.body.insertAdjacentHTML('beforeend', sidebarHTML);

    const cartButtons = document.querySelectorAll(".cart-toggle");
    const cartSidebar = document.getElementById("cartSidebar");
    const cartOverlay = document.getElementById("cartOverlay");
    const closeCart = document.getElementById("closeCart");

    if (cartSidebar && cartOverlay && closeCart) {
      // Open sidebar
      cartButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          cartSidebar.classList.remove("translate-x-full");
          cartOverlay.classList.remove("hidden");
          document.body.classList.add("overflow-hidden");
        });
      });

      // Close sidebar
      const closeSidebar = () => {
        cartSidebar.classList.add("translate-x-full");
        cartOverlay.classList.add("hidden");
        document.body.classList.remove("overflow-hidden");
      };

      closeCart.addEventListener("click", closeSidebar);
      cartOverlay.addEventListener("click", closeSidebar);

      // Sidebar Item Interactions
      cartSidebar.addEventListener("click", (e) => {
        if (e.target.closest(".remove-item")) {
          const item = e.target.closest(".cart-item");
          if (item) {
            item.style.opacity = "0";
            item.style.transform = "translateX(20px)";
            setTimeout(() => {
              item.remove();
              updateSubtotal();
            }, 300);
          }
        }

        if (e.target.matches(".sidebar-qty-btn")) {
          const input = e.target.parentElement.querySelector("input");
          let val = parseInt(input.value);
          if (e.target.textContent === "+") {
            input.value = val + 1;
          } else if (e.target.textContent === "-" && val > 1) {
            input.value = val - 1;
          }
          updateSubtotal();
        }
      });
    }

    function updateSubtotal() {
      const items = cartSidebar.querySelectorAll(".cart-item");
      const subtotalEl = cartSidebar.querySelector(".text-xl");
      let total = 0;
      items.forEach(item => {
        const price = 100; // Static for now, as in original
        const qty = parseInt(item.querySelector("input").value);
        total += price * qty;
      });
      if (subtotalEl) subtotalEl.textContent = `$${total}`;
    }
  }

  function injectMenuSidebar() {
    const currentPath = window.location.pathname;
    let pathPrefix = "";

    // Depth detection logic
    if (currentPath.includes("/pages/") || currentPath.includes("/product/")) {
      const parts = currentPath.split("/");
      // Find index of project root
      const rootIndex = parts.indexOf("Iphone Store");
      if (rootIndex !== -1) {
        const depth = parts.length - rootIndex - 2;
        pathPrefix = "../".repeat(depth);
      } else {
        // Fallback for different environments
        if (currentPath.includes("/pages/user/account/")) pathPrefix = "../../../";
        else if (currentPath.includes("/pages/")) pathPrefix = "../../";
        else if (currentPath.includes("/product/")) pathPrefix = "../";
      }
    }

    const menuHtml = `
      <!-- Menu Sidebar -->
      <div id="menuSidebar" class="fixed top-0 right-0 h-full w-[300px] bg-white shadow-2xl transform translate-x-full transition-transform duration-300 z-[100] overflow-y-auto">
          <div class="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 class="font-[Poppins] font-bold text-xl text-black">Menu</h2>
              <button id="closeMenu" class="text-gray-400 hover:text-black transition-colors text-3xl">&times;</button>
          </div>
          
          <nav class="p-6">
              <ul class="flex flex-col gap-2 font-[Poppins]">
                  <li><a href="${pathPrefix}index.html" class="block py-3 px-4 rounded-lg hover:bg-gray-50 transition-all font-medium text-gray-700 hover:text-black hover:translate-x-1 transform transition-transform">Home</a></li>
                  <li><a href="${pathPrefix}pages/contact/contact.html" class="block py-3 px-4 rounded-lg hover:bg-gray-50 transition-all font-medium text-gray-700 hover:text-black hover:translate-x-1 transform transition-transform">Contact</a></li>
                  <li><a href="${pathPrefix}pages/about/about.html" class="block py-3 px-4 rounded-lg hover:bg-gray-50 transition-all font-medium text-gray-700 hover:text-black hover:translate-x-1 transform transition-transform">About</a></li>
                  <li><a href="${pathPrefix}pages/wishlist/wishlist.html" class="block py-3 px-4 rounded-lg hover:bg-gray-50 transition-all font-medium text-gray-700 hover:text-black hover:translate-x-1 transform transition-transform">Wishlist</a></li>
                  <li><button class="w-full text-left py-3 px-4 rounded-lg hover:bg-gray-50 transition-all font-medium text-gray-700 hover:text-black hover:translate-x-1 transform transition-transform cart-toggle">Cart</button></li>
                  <li><a href="${pathPrefix}pages/user/userAccount.html" class="block py-3 px-4 rounded-lg hover:bg-gray-50 transition-all font-medium text-gray-700 hover:text-black hover:translate-x-1 transform transition-transform">Account</a></li>
                  <li class="mt-4 pt-4 border-t border-gray-100">
                      <button class="w-full text-left py-3 px-4 rounded-lg text-red-500 hover:bg-red-50 transition-colors font-medium">Logout</button>
                  </li>
              </ul>
          </nav>
      </div>
      <!-- Overlay -->
      <div id="menuOverlay" class="fixed inset-0 bg-black/50 backdrop-blur-sm hidden z-[90] transition-opacity duration-300 opacity-0"></div>
    `;

    document.body.insertAdjacentHTML("beforeend", menuHtml);

    const menuSidebar = document.getElementById("menuSidebar");
    const menuOverlay = document.getElementById("menuOverlay");
    const closeMenu = document.getElementById("closeMenu");
    const menuToggles = document.querySelectorAll(".menu-toggle");

    const openSidebar = (e) => {
      if (e) e.preventDefault();
      menuSidebar.classList.remove("translate-x-full");
      menuOverlay.classList.remove("hidden");
      setTimeout(() => menuOverlay.classList.add("opacity-100"), 10);
      document.body.classList.add("overflow-hidden");
    };

    const closeSidebar = () => {
      menuSidebar.classList.add("translate-x-full");
      menuOverlay.classList.remove("opacity-100");
      setTimeout(() => {
        menuOverlay.classList.add("hidden");
      }, 300);
      document.body.classList.remove("overflow-hidden");
    };

    menuToggles.forEach((btn) => btn.addEventListener("click", openSidebar));
    if (closeMenu) closeMenu.addEventListener("click", closeSidebar);
    if (menuOverlay) menuOverlay.addEventListener("click", closeSidebar);
  }

  // Initialize Sidebars
  injectMenuSidebar();
  injectCartSidebar();
});
