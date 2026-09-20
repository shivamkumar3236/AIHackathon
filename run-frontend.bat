@echo off
title Smart Campus - Frontend Dashboard
echo ==============================================
echo Starting AI-Powered Smart Campus Frontend...
echo ==============================================
cd /d "%~dp0Frontend"
call npm.cmd run dev
pause
