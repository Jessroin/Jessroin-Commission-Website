@echo off
chcp 65001 >nul
cd /d "%~dp0"
python make_thumbs.py
if errorlevel 1 py make_thumbs.py
echo.
pause
