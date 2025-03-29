document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nume = document.getElementById("nume").value.trim().toLowerCase(); // Ignoră majuscule
  const parola = document.getElementById("parola").value.trim();
  const eroare = document.getElementById("eroare");

  const conturi = JSON.parse(localStorage.getItem("conturi_elevi")) || {};

  if (conturi[nume] && conturi[nume].parola === parola) {
    localStorage.setItem("elev_curent", nume);
    window.location.href = "platforma.html";
  } else {
    eroare.textContent = "❌ Nume sau parolă incorecte.";
  }
});
