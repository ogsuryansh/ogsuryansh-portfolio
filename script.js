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


// some animation in projects 
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.projects-container .project');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('visible', entry.isIntersecting);
    });
  }, {
    root: null,
    rootMargin: '0px 0px -200px 0px',  
    threshold: 0.1
  });

  cards.forEach(card => observer.observe(card));
});

    const circle = document.querySelector('.cursor-circle');
    let mouseX = null, mouseY = null;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let dx = (Math.random() * 4 + 1) * (Math.random() < 0.5 ? 1 : -1);
    let dy = (Math.random() * 4 + 1) * (Math.random() < 0.5 ? 1 : -1);
    let bouncing = false;

    // Move circle to cursor when inside window
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      bouncing = false;
      circle.style.transition = 'transform 0.05s ease-out';
      circle.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    // Start bouncing when mouse leaves
    document.addEventListener('mouseleave', () => {
      bouncing = true;
      // disable smooth transition for bouncing
      circle.style.transition = 'none';
    });

    // Also start bouncing if window loses focus
    window.addEventListener('blur', () => {
      bouncing = true;
      circle.style.transition = 'none';
    });

    function animate() {
      if (bouncing) {
        x += dx;
        y += dy;

        // bounce off edges
        if (x <= 15 || x >= window.innerWidth - 15) dx = -dx;
        if (y <= 15 || y >= window.innerHeight - 15) dy = -dy;

        circle.style.transform = `translate(${x}px, ${y}px)`;
      }
      requestAnimationFrame(animate);
    }

    animate();