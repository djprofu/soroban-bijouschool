function genereazaUserParola() {
  const nume = document.getElementById("numeUtilizator").value.trim().toLowerCase().replace(/\s+/g, "-");
  const username = `${nume}-${Math.random().toString(36).substring(2, 6)}`;
  const parola = Math.random().toString(36).substring(2, 8);

  document.getElementById("usernameUtilizator").value = username;
  document.getElementById("parolaUtilizator").value = parola;
}

function salveazaUtilizator() {
  const tip = document.getElementById("tipUtilizator").value.toLowerCase(); // elev / profesor
  const nume = document.getElementById("numeUtilizator").value.trim();
  const username = document.getElementById("usernameUtilizator").value.trim();
  const parola = document.getElementById("parolaUtilizator").value.trim();

  if (!tip || !nume || !username || !parola) {
    alert("Completează toate câmpurile!");
    return;
  }

  const key = tip === "elev" ? "elevi" : "profesori";
  const utilizatori = JSON.parse(localStorage.getItem(key)) || [];

  utilizatori.push({ username, parola, nume, tip });
  localStorage.setItem(key, JSON.stringify(utilizatori));

  alert(`${tip} salvat cu succes!`);
  afiseazaUtilizatori();
}

function stergeUtilizator(username, tip) {
  const key = tip === "elev" ? "elevi" : "profesori";
  let utilizatori = JSON.parse(localStorage.getItem(key)) || [];
  utilizatori = utilizatori.filter(u => u.username !== username);
  localStorage.setItem(key, JSON.stringify(utilizatori));
  afiseazaUtilizatori();
}

function copiazaUserParola(username, parola) {
  const text = `${username} ${parola}`;
  navigator.clipboard.writeText(text).then(() => {
    alert("Date copiate!");
  });
}

function afiseazaUtilizatori() {
  const elevi = JSON.parse(localStorage.getItem("elevi")) || [];
  const profesori = JSON.parse(localStorage.getItem("profesori")) || [];

  const containerElevi = document.getElementById("listaElevi");
  const containerProfesori = document.getElementById("listaProfesori");

  containerElevi.innerHTML = "";
  containerProfesori.innerHTML = "";

  profesori.forEach(p => {
    const div = document.createElement("div");
    div.innerHTML = `
      👨‍🏫 <strong>${p.nume || "undefined"}</strong> <code>(${p.username})</code> – <code>${p.parola}</code>
      <button onclick="copiazaUserParola('${p.username}', '${p.parola}')">Copiază</button>
      <button onclick="stergeUtilizator('${p.username}', 'profesor')">Șterge</button>
    `;
    containerProfesori.appendChild(div);
  });

  elevi.forEach(e => {
    const div = document.createElement("div");
    div.innerHTML = `
      👦 <strong>${e.nume}</strong> <code>(${e.username})</code> – <code>${e.parola}</code>
      <button onclick="copiazaUserParola('${e.username}', '${e.parola}')">Copiază</button>
      <button onclick="stergeUtilizator('${e.username}', 'elev')">Șterge</button>
    `;
    containerElevi.appendChild(div);
  });
}

window.onload = afiseazaUtilizatori;
