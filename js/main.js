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

// Only start dragging if mouse is pressed on cube
cube.addEventListener('mousedown', (e) => {
  isDragging = true;
  autoRotate = false;
  lastX = e.clientX;
  lastY = e.clientY;
  document.body.style.cursor = 'grabbing';
  e.stopPropagation(); // Prevent bubbling to container
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;

  rotateY += dx * 0.4;
  rotateX -= dy * 0.4;

  rotateX = Math.max(-90, Math.min(90, rotateX)); // Limit rotation if needed

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

// Auto-rotate when not dragging
function animateCube() {
  if (autoRotate) {
    rotateX += 0.1;
    rotateY += 0.2;
    cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }
  requestAnimationFrame(animateCube);
}

animateCube();
