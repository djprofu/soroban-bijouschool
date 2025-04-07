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
    window.location.href = "profesor.html";
  } else if (coduriElevi[nume] === cod) {
    localStorage.setItem("elev_nume", nume); // salvăm pentru platforma.html
    window.location.href = "platforma.html";
  } else {
    mesaj.textContent = "Date incorecte. Încearcă din nou.";
  }
});
