// === CHAT NOU ===

// Conectare la server (doar dacă socket.io e activ)
const socket = typeof io !== "undefined" ? io() : null;

// Deschide / Închide fereastra de chat
function toggleChat() {
  const chat = document.getElementById("chat-popup");
  chat.classList.toggle("show");
}

// Trimite mesaj text
function trimiteMesaj() {
  const input = document.getElementById("chat-input");
  const mesaj = input.value.trim();
  if (!mesaj) return;

  const chatMessages = document.getElementById("chat-messages");
  chatMessages.innerHTML += `<div>📎 Ai trimis: ${escapeHtml(mesaj)}</div>`;
  input.value = "";
  chatMessages.scrollTop = chatMessages.scrollHeight;

  if (socket) socket.emit("mesajNou", mesaj);
  ascundeEmojiPanel();
}

// Emoji panel toggle
function toggleEmojiPanel() {
  document.getElementById("emoji-panel").classList.toggle("hidden");
}

function ascundeEmojiPanel() {
  document.getElementById("emoji-panel").classList.add("hidden");
}

// Escape HTML pentru protecție XSS
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Emoji click → adaugă în input
document.addEventListener("DOMContentLoaded", () => {
  const emojiPanel = document.getElementById("emoji-panel");
  if (emojiPanel) {
    emojiPanel.querySelectorAll("span").forEach(emoji => {
      emoji.addEventListener("click", () => {
        const input = document.getElementById("chat-input");
        input.value += emoji.textContent;
        input.focus();
      });
    });
  }

  // ===== DRAG & RESIZE Variabile =====
  const chatPopup = document.getElementById("chat-popup");
  const chatHeader = document.getElementById("chat-header");
  const resizers = document.querySelectorAll(".resizer");
  let isDragging = false;
  let isResizing = false;
  let offsetX = 0, offsetY = 0;
  let currentResizer = null;

  // ===== START DRAG =====
  chatHeader.addEventListener("mousedown", startDrag);
  chatHeader.addEventListener("touchstart", startDrag, { passive: false });

  function startDrag(e) {
    e.preventDefault();
    isDragging = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const rect = chatPopup.getBoundingClientRect();
    offsetX = clientX - rect.left;
    offsetY = clientY - rect.top;
  }

  // ===== START RESIZE =====
  resizers.forEach(resizer => {
    resizer.addEventListener("mousedown", startResize);
    resizer.addEventListener("touchstart", startResize, { passive: false });
  });

  function startResize(e) {
    e.preventDefault();
    isResizing = true;
    currentResizer = e.target;
  }

  // ===== HANDLE MOVE universal (mouse + touch) =====
  document.addEventListener("mousemove", handleMove);
  document.addEventListener("touchmove", handleMove, { passive: false });

  function handleMove(e) {
    if (!isDragging && !isResizing) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const rect = chatPopup.getBoundingClientRect();

    if (isDragging) {
      const left = clientX - offsetX;
      const top = clientY - offsetY;
      chatPopup.style.left = `${left}px`;
      chatPopup.style.top = `${top}px`;
    } else if (isResizing) {
      if (currentResizer.classList.contains("resizer-br")) {
        chatPopup.style.width = clientX - rect.left + "px";
        chatPopup.style.height = clientY - rect.top + "px";
      } else if (currentResizer.classList.contains("resizer-r")) {
        chatPopup.style.width = clientX - rect.left + "px";
      } else if (currentResizer.classList.contains("resizer-b")) {
        chatPopup.style.height = clientY - rect.top + "px";
      } else if (currentResizer.classList.contains("resizer-l")) {
        const newWidth = rect.right - clientX;
        if (newWidth > 200) {
          chatPopup.style.width = newWidth + "px";
          chatPopup.style.left = clientX + "px";
        }
      } else if (currentResizer.classList.contains("resizer-t")) {
        const newHeight = rect.bottom - clientY;
        if (newHeight > 150) {
          chatPopup.style.height = newHeight + "px";
          chatPopup.style.top = clientY + "px";
        }
      }
    }
  }

  // ===== STOP drag & resize =====
  document.addEventListener("mouseup", endAll);
  document.addEventListener("touchend", endAll);

  function endAll() {
    isDragging = false;
    isResizing = false;
    document.body.style.userSelect = "";
  }

  // ===== SOCKET.IO – Primesc mesaje =====
  if (socket) {
    const rolUtilizator = localStorage.getItem("rol") || "elev";
    socket.emit("chat-message", mesaj);
    socket.on("chat-message", (msg) => {
      const zona = document.getElementById("chat-messages");
      zona.innerHTML += `<div><strong>👤 Alt utilizator:</strong> ${escapeHtml(msg)}</div>`;
      zona.scrollTop = zona.scrollHeight;
    });
  }
});

// ===== Trimite fișier ====
function trimiteFisier(event) {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("fisier", file);

  fetch("/upload_chat", {
    method: "POST",
    body: formData
  })
  .then(response => response.text())
  .then(link => {
    const chatMessages = document.getElementById("chat-messages");
    chatMessages.innerHTML += `<div>📎 Ai trimis: <a href="http://localhost:5000/uploads/${encodeURIComponent(file.name)}" target="_blank">${escapeHtml(file.name)}</a></div>`;
    chatMessages.scrollTop = chatMessages.scrollHeight;
  })
  .catch(error => {
    console.error("Eroare la trimiterea fișierului:", error);
  });
}
