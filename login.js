document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();
  const mesaj = document.getElementById("mesajEroare");

  // Conturi hardcodate inițiale
  const conturi = {
    "ana": { parola: "3045", rol: "elev" },
    "mihai": { parola: "2314", rol: "elev" },
    "cristina": { parola: "4798", rol: "elev" },
    "profesor": { parola: "1986", rol: "profesor" }
  };

  // Preluăm conturile personalizate salvate de profesor
  const conturiSalvate = JSON.parse(localStorage.getItem("conturi_elevi")) || {};
  const toateConturile = { ...conturi, ...conturiSalvate };

  if (toateConturile[username] && toateConturile[username].parola === password) {
    const rol = toateConturile[username].rol;
    localStorage.setItem("elev_curent", username);

    if (rol === "profesor") {
      window.location.href = "profesor.html";
    } else {
      window.location.href = "platforma.html";
    }
  } else {
    mesaj.textContent = "❌ Nume sau parolă incorectă!";
  }
});
