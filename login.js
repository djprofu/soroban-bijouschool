document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nume = document.getElementById("nume").value.trim().toLowerCase();
  const parola = document.getElementById("parola").value.trim();
  const mesaj = document.getElementById("mesajEroare");

  const conturi = JSON.parse(localStorage.getItem("conturi_elevi")) || {};

  // Exemplu cont implicit profesor
  conturi["profesor"] = { parola: "1986", rol: "profesor" };

  if (conturi[nume] && conturi[nume].parola === parola) {
    localStorage.setItem("elev_curent", nume);

    if (conturi[nume].rol === "profesor") {
      window.location.href = "profesor.html";
    } else {
      window.location.href = "platforma.html";
    }
  } else {
    mesaj.textContent = "❌ Nume sau parolă greșită!";
  }
});
