// Script pentru muzica de fundal (opțional)
window.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("bg-music");
    if (audio) {
      audio.volume = 0.05;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn("🔇 Muzica blocată de browser.");
        });
      }
    }
  });
  
  // Script pentru slideshow automat
  let slideIndex = 0;
  function showSlides() {
    const slides = document.getElementsByClassName("slideshow");
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 2500); // 2.5 secunde
  }
  showSlides();
  
  // Script pentru meniu mobil
  function toggleMenu() {
    document.getElementById("menu").classList.toggle("active");
  }
  