// ✅ Adaugă automat userul admin dacă nu există deja
(function () {
  let profesori = JSON.parse(localStorage.getItem("profesori")) || [];
  const existaAdmin = profesori.some(p => p.username === "admin");
  if (!existaAdmin) {
    profesori.push({
      username: "admin",
      parola: "1986",
      rol: "admin",
      nume: "Administrator"
    });
    localStorage.setItem("profesori", JSON.stringify(profesori));
  }
})();

// 🔐 Funcție de autentificare generală
function autentificare(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const parola = document.getElementById("parola").value.trim();
  const mesaj = document.getElementById("mesaj");

  const elevi = JSON.parse(localStorage.getItem("elevi")) || [];
  const profesori = JSON.parse(localStorage.getItem("profesori")) || [];

  // Caută utilizatorul (elev sau profesor)
  const user = [...elevi, ...profesori].find(u => u.username === username && u.parola === parola);

  if (user) {
    const userCurent = {
      username: user.username,
      nume: user.nume || user.username,
      rol: user.rol
    };
sessionStorage.setItem("userCurent", JSON.stringify(userCurent));

    // Redirecționează în funcție de rol
    if (user.rol === "admin") {
      window.location.href = "panou_profesor/panou_profesor.html";
    } else {
      window.location.href = "platforma_pages/modul1/modul1.html";
    }
    return;
  }

  // ❌ Dacă nu s-a găsit nimic valid
  mesaj.textContent = "Date incorecte sau utilizator inexistent.";
  mesaj.style.color = "red";
}
