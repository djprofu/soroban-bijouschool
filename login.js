// Lista utilizatori (simulare baza de date)
const elevi = {
  "ana": "1234",
  "maria": "8431"
};

function verificaLogin() {
  const user = document.getElementById("username").value.trim().toLowerCase();
  const parola = document.getElementById("parola").value.trim();
  const data = new Date().toLocaleString("ro-RO");

  // Profesor
  if (user === "profesor" && parola === "1986") {
    localStorage.setItem("utilizator", "Profesor");
    localStorage.setItem("ultimaAutentificare", data);
    window.location.href = "platforma.html";
    return;
  }

  // Elev
  if (elevi[user] === parola) {
    localStorage.setItem("utilizator", user);
    localStorage.setItem("ultimaAutentificare", data);
    window.location.href = "platforma.html";
    return;
  }

  // Altfel
  alert("Date de autentificare incorecte.");
}
