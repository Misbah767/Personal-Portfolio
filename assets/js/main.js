(function () {
  "use strict";

  // Everything inside DOMContentLoaded
  document.addEventListener("DOMContentLoaded", function () {

    /*** Header Toggle ***/
    const header = document.getElementById("header");
    const toggle = document.querySelector(".header-toggle");

    if (toggle) {
      toggle.addEventListener("click", function () {
        header.classList.toggle("header-show");
        toggle.classList.toggle("bi-list");
        toggle.classList.toggle("bi-x");
      });
    }

    // Hide nav when link is clicked
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", function () {
        if (header.classList.contains("header-show")) {
          header.classList.remove("header-show");
          toggle.classList.add("bi-list");
          toggle.classList.remove("bi-x");
        }
      });
    });

    /*** Scroll to Top Button ***/
    const scrollTopBtn = document.querySelector('.scroll-top');

    function handleScrollTopBtn() {
      if (scrollTopBtn) {
        scrollTopBtn.classList.toggle('active', window.scrollY > 100);
      }
    }

    scrollTopBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.addEventListener('scroll', handleScrollTopBtn);
    handleScrollTopBtn();

    /*** Typed.js Initialization ***/
    const typedEl = document.querySelector('.typed');
    if (typedEl) {
      const typedStrings = typedEl.getAttribute('data-typed-items')?.split(',') || [];
      new Typed('.typed', {
        strings: typedStrings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
      });
    }

    /*** Animate Skills Progress Bars on Scroll ***/
    document.querySelectorAll('.skills-animation').forEach(skillSection => {
      new Waypoint({
        element: skillSection,
        offset: '80%',
        handler: () => {
          skillSection.querySelectorAll('.progress .progress-bar').forEach(bar => {
            const value = bar.getAttribute('aria-valuenow');
            bar.style.width = `${value}%`;
          });
          new PureCounter();
        },
      });
    });

    /*** GLightbox Init ***/
    GLightbox({ selector: '.glightbox' });

    /*** Swiper Initialization ***/
    document.querySelectorAll(".init-swiper").forEach(swiperEl => {
      const configScript = swiperEl.querySelector(".swiper-config");
      if (!configScript) return;

      const config = JSON.parse(configScript.innerHTML.trim());

      if (swiperEl.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperEl, config); // Optional
      } else {
        new Swiper(swiperEl, config);
      }
    });

    /*** NavMenu Scrollspy ***/
    const navLinks = document.querySelectorAll('.navmenu a');

    function updateScrollspy() {
      const position = window.scrollY + 200;

      navLinks.forEach(link => {
        if (!link.hash) return;
        const section = document.querySelector(link.hash);
        if (!section) return;

        const isInSection = position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight;

        if (isInSection) {
          document.querySelectorAll('.navmenu a.active').forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    }

    updateScrollspy();
    document.addEventListener('scroll', updateScrollspy);

    /*** Hash Scroll Fix ***/
    if (window.location.hash) {
      const targetSection = document.querySelector(window.location.hash);
      if (targetSection) {
        setTimeout(() => {
          const scrollMarginTop = parseInt(getComputedStyle(targetSection).scrollMarginTop || 0);
          window.scrollTo({
            top: targetSection.offsetTop - scrollMarginTop,
            behavior: 'smooth',
          });
        }, 100);
      }
    }
  });

  /*** Outside DOMContentLoaded ***/

  // Preloader
  const preloader = document.querySelector('#preloader');
  window.addEventListener('load', () => {
    preloader?.remove();
  });

  // Animate on Scroll (AOS)
  function initAOS() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }
  window.addEventListener('load', initAOS);

  // Pure Counter (initial)
  new PureCounter();

  // Custom Progress Bar Animation
  const myBar = document.getElementById("myBar");
  let progress = 0;
  const targetProgress = 95;

  if (myBar) {
    const interval = setInterval(() => {
      if (progress >= targetProgress) return clearInterval(interval);
      progress++;
      myBar.style.width = `${progress}%`;
      myBar.setAttribute("aria-valuenow", progress);
    }, 20);
  }

})();
