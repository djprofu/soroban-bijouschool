const coduriElevi = {
  "Maria Pop": "1234",
  "Ionel Ionescu": "5678",
  "Ana Bucur": "4321"
};

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const nume = document.getElementById("nume").value.trim();
  const cod = document.getElementById("cod").value.trim();
  const mesaj = document.getElementById("mesaj");

  if (nume.toLowerCase() === "profesor" && cod === "1986") {
    // Acces către profesor.html (administrare)
    window.location.href = "profesor.html";
  } else if (nume.toLowerCase() === "profesor" && cod === "2212") {
    // Acces complet pe platforma.html
    localStorage.setItem("elev_nume", "profesor");
    window.location.href = "platforma.html";
  } else if (coduriElevi[nume] === cod) {
    // Acces pentru elevi
    localStorage.setItem("elev_nume", nume);
    window.location.href = "platforma.html";
  } else {
    mesaj.textContent = "Date incorecte. Încearcă din nou.";
  }
});
