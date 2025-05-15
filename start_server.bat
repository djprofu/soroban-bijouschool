@echo off
echo === Activare mediu virtual ===

REM Verificăm dacă există folderul venv
IF NOT EXIST venv (
    echo => Creare mediu virtual...
    python -m venv venv
)

REM Activare mediu
call venv\Scripts\activate

echo === Instalare Flask & Flask-CORS ===
pip install flask flask-cors

echo === Pornire server Flask ===
python app.py

pause
