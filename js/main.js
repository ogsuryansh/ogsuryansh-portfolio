const body = document.body;
const toggle = document.querySelector(".theme-toggle");
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

function createParticles() {
  const particlesContainer = document.getElementById('particles-bg');
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    const size = Math.random() * 3 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    particle.style.animationDelay = Math.random() * 6 + 's';
    
    particlesContainer.appendChild(particle);
  }
}

function enhanceHeroText() {
  const heroTitle = document.querySelector('.hero-right h1');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.setAttribute('data-text', text);
  }
}

function createDynamicParticles() {
  const particlesContainer = document.getElementById('particles-bg');
  const dynamicParticleCount = 20;
  
  for (let i = 0; i < dynamicParticleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'dynamic-particle';
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    particle.style.animationDelay = Math.random() * 8 + 's';
    
    particlesContainer.appendChild(particle);
  }
}

function initParallax() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroLeft = document.querySelector('.hero-left');
    const heroRight = document.querySelector('.hero-right');
    
    if (heroLeft && heroRight) {
      heroLeft.style.transform = `translateZ(${scrolled * 0.1}px)`;
      heroRight.style.transform = `translateZ(${scrolled * -0.1}px)`;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  createMouseTrail();
  enhanceHeroText();
  createDynamicParticles();
  initParallax();
});

function createMouseTrail() {
  const trailContainer = document.getElementById('mouse-trail');
  let mouseX = 0, mouseY = 0;
  let trailParticles = [];
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (Math.random() > 0.7) {
      const particle = document.createElement('div');
      particle.className = 'trail-particle';
      particle.style.left = mouseX + 'px';
      particle.style.top = mouseY + 'px';
      
      trailContainer.appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 1000);
    }
  });
}

if (localStorage.getItem("theme") === "light") {
  body.classList.add("light-theme");
}

toggle.addEventListener("click", () => {
  body.classList.toggle("light-theme");

  const theme = body.classList.contains("light-theme") ? "light" : "dark";
  localStorage.setItem("theme", theme);
});

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  hamburger.textContent = hamburger.textContent === "☰" ? "✖" : "☰";
});

document.addEventListener("DOMContentLoaded", () => {
  const typed = new Typed("#typed-text", {
    strings: [
      "Developer",
      "Specialised in Frontend Development",
      "Full Stack developer",
      "React js Coder",
    ],
    typeSpeed: 80,
    backSpeed: 40,
    backDelay: 1500,
    loop: true,
  });
});

const cube = document.querySelector(".cube");
const container = document.querySelector(".cube-container");

let rotateX = 20,
  rotateY = 20;
let isDragging = false;
let lastX, lastY;
let autoRotate = true;

cube.addEventListener("mousedown", (e) => {
  isDragging = true;
  autoRotate = false;
  lastX = e.clientX;
  lastY = e.clientY;
  document.body.style.cursor = "grabbing";
  e.stopPropagation();
});

document.addEventListener("mousemove", (e) => {
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

document.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    autoRotate = true;
    document.body.style.cursor = "default";
  }
});

cube.addEventListener("touchstart", (e) => {
  isDragging = true;
  autoRotate = false;
  lastX = e.touches[0].clientX;
  lastY = e.touches[0].clientY;
  e.stopPropagation();
});

cube.addEventListener("touchmove", (e) => {
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

cube.addEventListener("touchend", () => {
  if (isDragging) {
    isDragging = false;
    autoRotate = true;
  }
});

function animateCube() {
  if (autoRotate) {
    rotateX += 0.1;
    rotateY += 0.2;
    cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }
  requestAnimationFrame(animateCube);
}

animateCube();

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".service-card");
  const line = document.querySelector(".services-line");
  const section = document.querySelector("#services");

  new IntersectionObserver(
    (entries, obs) => {
      if (entries[0].isIntersecting) {
        line.style.transform = "scaleY(1)";
        obs.disconnect();
      }
    },
    { threshold: 0.2 }
  ).observe(section);

  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          target.classList.add("visible");
        } else {
          target.classList.remove("visible");
        }
      });
    },
    { threshold: 0.3 }
  );

  cards.forEach((card) => cardObserver.observe(card));
});

document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".slider-track");
  const slides = document.querySelectorAll(".slide-card");
  const dotsContainer = document.querySelector(".slider-dots");
  const prevBtn = document.querySelector(".slider-btn.prev");
  const nextBtn = document.querySelector(".slider-btn.next");

  let currentIndex = 0;

  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    slides.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (index === currentIndex) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  }

  updateSlides();

  if (prevBtn) prevBtn.addEventListener("click", prevSlide);
  if (nextBtn) nextBtn.addEventListener("click", nextSlide);

  function prevSlide() {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
    updateSlides();
  }

  function nextSlide() {
    currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
    updateSlides();
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlides();
  }

  function updateSlides() {
    slides.forEach((slide, index) => {
      slide.classList.remove("active");

      let distanceFromActive = index - currentIndex;

      if (distanceFromActive > slides.length / 2) {
        distanceFromActive -= slides.length;
      } else if (distanceFromActive < -slides.length / 2) {
        distanceFromActive += slides.length;
      }

      let xPosition, zPosition, yRotation, opacity, zIndex;

      if (distanceFromActive === 0) {
        xPosition = 0;
        zPosition = 200;
        yRotation = 0;
        opacity = 1;
        zIndex = slides.length + 1;
        slide.classList.add("active");
      } else if (distanceFromActive < 0) {
        xPosition = distanceFromActive * 90;
        zPosition = -100;
        yRotation = 30;
        opacity = 0.5;
        zIndex = slides.length - Math.abs(distanceFromActive);
      } else {
        xPosition = distanceFromActive * 90;
        zPosition = -100;
        yRotation = -30;
        opacity = 0.5;
        zIndex = slides.length - Math.abs(distanceFromActive);
      }

      slide.style.transform = `translateX(${xPosition}%) rotateY(${yRotation}deg) translateZ(${zPosition}px)`;
      slide.style.opacity = opacity;
      slide.style.zIndex = zIndex;
    });

    const dots = document.querySelectorAll(".slider-dots .dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  window.addEventListener("resize", updateSlides);
});
