from flask import Flask, render_template, request, jsonify
import os
import json

app = Flask(__name__)

# Rădăcina aplicației (pagina principală)
@app.route('/')
def index():
    return render_template('index.html')  # Renderizează fișierul index.html

# Ruta pentru profesor cu parola 1986
@app.route('/profesor_1986', methods=['GET', 'POST'])
def profesor_1986():
    parola_corecta = "1986"
    parola_primita = request.args.get("parola", "")

    if parola_primita != parola_corecta:
        return jsonify({"status": "refuzat", "mesaj": "Acces interzis. Parola greșită."}), 403

    # Dacă pagina este accesată prin GET, se vor afișa elevii
    if request.method == 'GET':
        elevi = get_all_elevi()  # Obținem datele elevilor
        return render_template('profesor_1986.html', elevi=elevi)
    
    # Dacă pagina este accesată prin POST, salvăm feedback-ul
    if request.method == 'POST':
        elev_id = request.form.get('elev_id')
        feedback = request.form.get('feedback')
        save_feedback(elev_id, feedback)
        return jsonify({"status": "ok", "mesaj": "Feedback-ul a fost salvat!"}), 200

# Funcție pentru obținerea datelor elevilor
def get_all_elevi():
    # Acesta este un exemplu simplu, datele ar trebui să provină dintr-o bază de date sau fișier JSON
    elevi = [
        {"id": 1, "nume": "Mihai", "prezenta": "80%", "contract": "Curs Standard", "feedback": "Progres bun!"},
        {"id": 2, "nume": "Andreea", "prezenta": "90%", "contract": "Curs Avansat", "feedback": "Necesită îmbunătățiri la teme."},
        {"id": 3, "nume": "Ioana", "prezenta": "100%", "contract": "Curs Standard", "feedback": "Excelentă performanță!"}
    ]
    return elevi

# Funcție pentru salvarea feedback-ului
def save_feedback(elev_id, feedback):
    # Salvăm feedback-ul în fișier (pentru exemplu, în realitate ar trebui să fie o bază de date)
    elevi = get_all_elevi()
    for elev in elevi:
        if elev['id'] == int(elev_id):
            elev['feedback'] = feedback  # Actualizăm feedback-ul elevului
            break
    # Aici ar trebui să scriem feedback-ul modificat în fișier sau în baza de date
    # Exemplu:
    # with open('elevi.json', 'w') as f:
    #     json.dump(elevi, f)

# Ruta pentru profesor cu parola 2212
@app.route('/profesor_2212', methods=['GET'])
def profesor_2212():
    parola_corecta = "2212"
    parola_primita = request.args.get("parola", "")

    if parola_primita != parola_corecta:
        return jsonify({"status": "refuzat", "mesaj": "Acces interzis. Parola greșită."}), 403

    # Dacă parola este corectă, vom afișa rezultatele elevilor
    elevi = get_all_elevi()
    return render_template('profesor_2212.html', elevi=elevi)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
