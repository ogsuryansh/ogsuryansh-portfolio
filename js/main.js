const body = document.body;
const toggle = document.querySelector('.theme-toggle');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Load theme from localStorage
if (localStorage.getItem('theme') === 'light') {
  body.classList.add('light-theme');
}

// Toggle theme on click
toggle.addEventListener('click', () => {
  body.classList.toggle('light-theme');

  // Save preference
  const theme = body.classList.contains('light-theme') ? 'light' : 'dark';
  localStorage.setItem('theme', theme);
});

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');

  // Toggle ☰ and ✖ icons
  hamburger.textContent = hamburger.textContent === '☰' ? '✖' : '☰';
});


document.addEventListener("DOMContentLoaded", () => {
  // Typed.js - Auto typing effect
  const typed = new Typed('#typed-text', {
    strings: ['Developer', 'Specialised in Frontend Expert' , 'Full Stack developer','Coder'],
    typeSpeed: 80,
    backSpeed: 40,
    backDelay: 1500,
    loop: true
  });
});


  const cube = document.querySelector('.cube');
  const container = document.querySelector('.cube-container');

  let rotateX = 20, rotateY = 20;
  let isDragging = false;
  let lastX, lastY;
  let autoRotate = true;

  // Mouse drag
  cube.addEventListener('mousedown', (e) => {
    isDragging = true;
    autoRotate = false;
    lastX = e.clientX;
    lastY = e.clientY;
    document.body.style.cursor = 'grabbing';
    e.stopPropagation();
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;

    rotateY += dx * 0.4;
    rotateX -= dy * 0.4;

    rotateX = Math.max(-90, Math.min(90, rotateX));

    cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    lastX = e.clientX;
    lastY = e.clientY;
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      autoRotate = true;
      document.body.style.cursor = 'default';
    }
  });

  // Touch support
  cube.addEventListener('touchstart', (e) => {
    isDragging = true;
    autoRotate = false;
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
    e.stopPropagation();
  });

  cube.addEventListener('touchmove', (e) => {
    if (!isDragging) return;

    const touch = e.touches[0];
    const dx = touch.clientX - lastX;
    const dy = touch.clientY - lastY;

    rotateY += dx * 0.4;
    rotateX -= dy * 0.4;

    rotateX = Math.max(-90, Math.min(90, rotateX));

    cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    lastX = touch.clientX;
    lastY = touch.clientY;
  });

  cube.addEventListener('touchend', () => {
    if (isDragging) {
      isDragging = false;
      autoRotate = true;
    }
  });

  // Auto-rotate when idle
  function animateCube() {
    if (autoRotate) {
      rotateX += 0.1;
      rotateY += 0.2;
      cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
    requestAnimationFrame(animateCube);
  }

  animateCube();

  document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.service-card');
    const line = document.querySelector('.services-line');
    const section = document.querySelector('#services');

    // Draw the vertical line when section comes into view
    new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting) {
        line.style.transform = 'scaleY(1)';
        obs.disconnect();
      }
    }, { threshold: 0.2 }).observe(section);

    // Flip cards in/out on scroll
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          target.classList.add('visible');
        } else {
          target.classList.remove('visible');
        }
      });
    }, { threshold: 0.3 });

    cards.forEach(card => cardObserver.observe(card));
  });



document.addEventListener('DOMContentLoaded', () => {
  const track      = document.querySelector('.slider-track');
  const windowDiv  = document.querySelector('.slider-window');
  const slides     = Array.from(track.children);
  const prevBtn    = document.querySelector('.slider-btn.prev');
  const nextBtn    = document.querySelector('.slider-btn.next');
  const dotsWrap   = document.querySelector('.slider-dots');
  let visibleCount, maxIndex, currentIndex = 0, autoTimer;

  function updateLayout() {
    // 1. How many slides in view?
    visibleCount = window.innerWidth <= 768 ? 1 : 2;
    // 2. Compute each slide’s pixel width so N slides fill the window
    const windowWidth = windowDiv.getBoundingClientRect().width;
    const slideWidth  = windowWidth / visibleCount;
    // 3. Apply that width (including your 40px padding via box‑sizing)
    slides.forEach((slide, i) => {
      slide.style.minWidth = `${slideWidth}px`;
      slide.style.left     = `${slideWidth * i}px`;
    });
    maxIndex = slides.length - visibleCount;
    // 4. Jump back to whatever slide we’re on
    goToSlide(currentIndex, /* skipReset = */ true);
  }

  // build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'dot';
    if (i === 0) dot.classList.add('active');
    dotsWrap.append(dot);
    dot.addEventListener('click', () => goToSlide(i));
  });
  const dots = Array.from(dotsWrap.children);

  function goToSlide(idx, skipReset = false) {
    if (idx < 0)              idx = maxIndex;
    else if (idx > maxIndex)  idx = 0;
    currentIndex = idx;
    // we already set left positions; just translate
    const left = slides[0].getBoundingClientRect().width * idx;
    track.style.transform = `translateX(-${left}px)`;
    dots.forEach((d,i) => d.classList.toggle('active', i === idx));
    if (!skipReset) resetAuto();
  }

  prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

  function startAuto() {
    autoTimer = setInterval(() => nextBtn.click(), 5000);
  }
  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }
  [track, prevBtn, nextBtn].forEach(el => {
    el.addEventListener('mouseenter', () => clearInterval(autoTimer));
    el.addEventListener('mouseleave', startAuto);
    el.addEventListener('touchstart',  () => clearInterval(autoTimer));
    el.addEventListener('touchend',    startAuto);
  });

  // init + reflow on resize
  updateLayout();
  window.addEventListener('resize', updateLayout);
  startAuto();
});
