function autentificareElev(event) {
  event.preventDefault(); // evită reîncărcarea paginii

  const nume = document.getElementById("numeElev").value.trim().toLowerCase();
  const parola = document.getElementById("parolaElev").value.trim();
  const mesaj = document.getElementById("mesajEroare");

  const conturi = JSON.parse(localStorage.getItem("conturi_elevi")) || {};

  if (conturi[nume] && conturi[nume].parola === parola) {
    localStorage.setItem("elev_curent", nume);
    window.location.href = "platforma.html";
  } else {
    mesaj.textContent = "❌ Nume sau parolă incorecte.";
  }
}
