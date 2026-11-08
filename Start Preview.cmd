@echo off
cd /d "%~dp0"
start "Adolphus Preview" http://localhost:3000
node node_modules\next\dist\bin\next dev --webpack --hostname localhost --port 3000
pause
