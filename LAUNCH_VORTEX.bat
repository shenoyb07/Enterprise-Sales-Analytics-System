@echo off
setlocal
title VORTEX ENTERPRISE SYSTEM

echo =======================================================
echo          VORTEX EXECUTIVE ANALYTICS SYSTEM
echo =======================================================
echo.

:menu
echo [1] Launch Dashboard (Foreground - Visible)
echo [2] Launch Dashboard (Background - Invisible)
echo [3] Stop Background Dashboard Service
echo [4] Upload Data to Supabase (Python)
echo [5] Install/Update Dependencies
echo [6] Clean Cache ^& Fresh Start
echo [7] Exit
echo.
set /p choice="Enter command [1-7]: "

if "%choice%"=="1" goto dashboard
if "%choice%"=="2" goto background
if "%choice%"=="3" goto stop_bg
if "%choice%"=="4" goto upload
if "%choice%"=="5" goto install
if "%choice%"=="6" goto clean
if "%choice%"=="7" exit
goto menu

:dashboard
echo.
echo [SYSTEM] Starting Dashboard on http://localhost:3000...
cd sales-dashboard
npm run dev
goto menu

:background
echo.
echo [SYSTEM] Launching Invisible Daemon...
start wscript.exe VORTEX_DAEMON.vbs
echo [SYSTEM] Website is now running in the background.
echo [SYSTEM] Visit: http://localhost:3000
pause
goto menu

:stop_bg
echo.
echo [SYSTEM] Terminating Background Node processes...
taskkill /f /im node.exe
echo [SYSTEM] Background service stopped.
pause
goto menu

:upload
echo.
echo [SYSTEM] Running Data Synchronization...
.\.venv\Scripts\python.exe upload_to_supabase.py
echo.
pause
goto menu

:install
echo.
echo [SYSTEM] Installing Global Dependencies...
cd sales-dashboard
call npm install
cd ..
.\.venv\Scripts\pip install -r requirements.txt
echo.
echo [SYSTEM] All engines optimized.
pause
goto menu

:clean
echo.
echo [SYSTEM] Flushing Cache...
cd sales-dashboard
if exist .next rd /s /q .next
if exist node_modules rd /s /q node_modules
call npm install
cd ..
echo [SYSTEM] System reset complete.
goto menu
