const body = document.body;
const toggle = document.querySelector(".theme-toggle");
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

// Load theme from localStorage
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light-theme");
}

// Toggle theme on click
toggle.addEventListener("click", () => {
  body.classList.toggle("light-theme");

  // Save preference
  const theme = body.classList.contains("light-theme") ? "light" : "dark";
  localStorage.setItem("theme", theme);
});

// Hamburger menu toggle
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  // Toggle ☰ and ✖ icons
  hamburger.textContent = hamburger.textContent === "☰" ? "✖" : "☰";
});

document.addEventListener("DOMContentLoaded", () => {
  // Typed.js - Auto typing effect
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

// Mouse drag
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

// Touch support
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

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".service-card");
  const line = document.querySelector(".services-line");
  const section = document.querySelector("#services");

  // Draw the vertical line when section comes into view
  new IntersectionObserver(
    (entries, obs) => {
      if (entries[0].isIntersecting) {
        line.style.transform = "scaleY(1)";
        obs.disconnect();
      }
    },
    { threshold: 0.2 }
  ).observe(section);

  // Flip cards in/out on scroll
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
// Dynamic 3D Carousel for any number of cards
document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".slider-track");
  const slides = document.querySelectorAll(".slide-card");
  const dotsContainer = document.querySelector(".slider-dots");
  const prevBtn = document.querySelector(".slider-btn.prev");
  const nextBtn = document.querySelector(".slider-btn.next");

  let currentIndex = 0; // Start with first slide

  // Create dots based on number of slides
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

  // Initialize
  updateSlides();

  // Event listeners
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
    // Update slide positions and active states
    slides.forEach((slide, index) => {
      // Remove any existing active class
      slide.classList.remove("active");

      // Calculate distance from current active slide
      let distanceFromActive = index - currentIndex;

      // For looping effect - handle distance when wrapping around
      if (distanceFromActive > slides.length / 2) {
        distanceFromActive -= slides.length;
      } else if (distanceFromActive < -slides.length / 2) {
        distanceFromActive += slides.length;
      }

      // Calculate positions based on distance
      let xPosition, zPosition, yRotation, opacity, zIndex;

      // Apply transforms based on position
      if (distanceFromActive === 0) {
        // Active slide
        xPosition = 0;
        zPosition = 200;
        yRotation = 0;
        opacity = 1;
        zIndex = slides.length + 1;
        slide.classList.add("active");
      } else if (distanceFromActive < 0) {
        // Slides to the left
        xPosition = distanceFromActive * 90; // Each slide 90% to the left
        zPosition = -100;
        yRotation = 30; // Rotate 30deg
        opacity = 0.5;
        zIndex = slides.length - Math.abs(distanceFromActive);
      } else {
        // Slides to the right
        xPosition = distanceFromActive * 90; // Each slide 90% to the right
        zPosition = -100;
        yRotation = -30; // Rotate -30deg
        opacity = 0.5;
        zIndex = slides.length - Math.abs(distanceFromActive);
      }

      // Apply all transforms
      slide.style.transform = `translateX(${xPosition}%) rotateY(${yRotation}deg) translateZ(${zPosition}px)`;
      slide.style.opacity = opacity;
      slide.style.zIndex = zIndex;
    });

    // Update dots
    const dots = document.querySelectorAll(".slider-dots .dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  // Handle window resize
  window.addEventListener("resize", updateSlides);
});
