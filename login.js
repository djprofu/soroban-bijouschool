// login.js

// Utilizatori și parole predefinite
const utilizatori = {
  "ana": { parola: "ana1234", rol: "elev" },
  "mihai": { parola: "mihai2314", rol: "elev" },
  "cristina": { parola: "cristina4798", rol: "elev" },
  "profesor": { parola: "1986", rol: "profesor" }
};

// Funcție de autentificare
function autentificare() {
  const username = document.getElementById("username").value.trim().toLowerCase();
  const parola = document.getElementById("password").value.trim();

  if (utilizatori[username] && utilizatori[username].parola === parola) {
    localStorage.setItem("elev_curent", username);
    
    if (utilizatori[username].rol === "profesor") {
      window.location.href = "profesor.html";
    } else {
      window.location.href = "platforma.html";
    }
  } else {
    alert("❌ Nume sau parolă incorecte. Încearcă din nou.");
  }
}

// Opțional: Apasă Enter pentru login
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("password").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      autentificare();
    }
  });
});
