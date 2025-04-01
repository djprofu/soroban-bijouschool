document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slideshow img");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  showSlide(currentSlide);
  setInterval(nextSlide, 3000); // Schimbă slide-ul la fiecare 3 secunde
});
