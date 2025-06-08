function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  const hamburger = document.querySelector(".hamburger");
  navLinks.classList.toggle("show");
  hamburger.classList.toggle("active");
}

// Close menu on nav link click
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    const navLinks = document.querySelector(".nav-links");
    const hamburger = document.querySelector(".hamburger");
    if (navLinks.classList.contains("show")) {
      navLinks.classList.remove("show");
      hamburger.classList.remove("active");
    }
  });
});
function openPopup() {
  document.getElementById("popupOverlay").style.display = "flex";
  document.body.classList.add("no-scroll");  // Disable scroll
}

function closePopup() {
  document.getElementById("popupOverlay").style.display = "none";
  document.body.classList.remove("no-scroll"); // Enable scroll back
}

// Auto type

const autoTypeSkills = ['CSS', 'JavaScript', 'HTML', 'Frontend web dev'];
const typingSpeed = 150;
const erasingSpeed = 100;
const pauseBeforeErase = 1000;
const pauseBeforeType = 500;

let skillIndex = 0;
let charIndex = 0;
const typedElement = document.getElementById('auto-type');

function typeSkill() {
  const currentSkill = autoTypeSkills[skillIndex];
  if (charIndex < currentSkill.length) {
    typedElement.textContent += currentSkill.charAt(charIndex);
    charIndex++;
    setTimeout(typeSkill, typingSpeed);
  } else {
    setTimeout(eraseSkill, pauseBeforeErase);
  }
}

function eraseSkill() {
  if (charIndex > 0) {
    typedElement.textContent = typedElement.textContent.slice(0, -1);
    charIndex--;
    setTimeout(eraseSkill, erasingSpeed);
  } else {
    skillIndex = (skillIndex + 1) % autoTypeSkills.length;
    setTimeout(typeSkill, pauseBeforeType);
  }
}

// kick it off on DOM load
document.addEventListener('DOMContentLoaded', () => {
  if (autoTypeSkills.length) {
    setTimeout(typeSkill, pauseBeforeType);
  }
});
