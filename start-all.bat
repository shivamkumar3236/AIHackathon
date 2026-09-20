@echo off
title Smart Campus Resource Management System
echo =======================================================
echo Launching AI-Powered Smart Campus (Backend + Frontend)
echo =======================================================

echo Starting Backend Server on http://localhost:5000 ...
start "Smart Campus - Backend" cmd /k "cd /d "%~dp0Backend" && npm.cmd start"

timeout /t 2 >nul

echo Starting Frontend Server on http://localhost:3000 ...
start "Smart Campus - Frontend" cmd /k "cd /d "%~dp0Frontend" && npm.cmd run dev"

echo.
echo Both servers are launching!
echo Frontend will be accessible at http://localhost:3000
echo Backend REST API at http://localhost:5000/api
echo.
pause
