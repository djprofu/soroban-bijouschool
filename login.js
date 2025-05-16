document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const parola = document.getElementById("parola").value.trim();

  const profesori = JSON.parse(localStorage.getItem("profesori")) || [];
  const elevi = JSON.parse(localStorage.getItem("elevi")) || [];

  let utilizatorGasit = profesori.find(u => u.username === username && u.parola === parola);
  let rol = "profesor";

  if (!utilizatorGasit) {
    utilizatorGasit = elevi.find(u => u.username === username && u.parola === parola);
    rol = "elev";
  }

  if (utilizatorGasit) {
    // Salvăm în localStorage utilizatorul curent
    const dateUtilizator = {
      username: utilizatorGasit.username,
      nume: utilizatorGasit.nume,
      rol: rol
    };
    localStorage.setItem("utilizatorCurent", JSON.stringify(dateUtilizator));

    // Redirecționare în funcție de rol
    if (rol === "profesor") {
      window.location.href = "/platforma_pages/modul1/modul1.html";
    } else {
      window.location.href = "/platforma_pages/modul1/modul1.html";
    }
  } else {
    document.getElementById("mesaj").textContent = "Date incorecte sau utilizator inexistent.";
    document.getElementById("mesaj").style.color = "red";
  }
});
