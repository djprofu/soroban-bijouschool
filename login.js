const conturi = JSON.parse(localStorage.getItem("conturi_elevi")) || {};

const nume = document.getElementById("nume").value.trim().toLowerCase(); // 🔽 conversie lowercase
const parola = document.getElementById("parola").value.trim();

if (conturi[nume] && conturi[nume].parola === parola) {
  localStorage.setItem("elev_curent", nume);
  window.location.href = "platforma.html";
} else {
  document.getElementById("eroare").textContent = "❌ Nume sau parolă incorecte.";
}
