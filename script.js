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
