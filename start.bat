@echo off
title Aura Parfums - Dev Server
color 0A
echo ========================================================
echo   Aura Parfums - Niche Perfume Decants Store
echo ========================================================
echo.
echo Starting local server on http://localhost:3000 ...
echo.
set PATH=C:\Users\user\node-lts;%PATH%
cd /d D:\perfume-decants-store
node.exe ./node_modules/next/dist/bin/next dev -p 3000
pause
