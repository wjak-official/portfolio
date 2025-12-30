@echo off
REM Windows batch file to run PowerShell deployment script

echo Starting Portfolio Deployment...
echo.

REM Run PowerShell script with execution policy bypass
powershell.exe -ExecutionPolicy Bypass -File "%~dp0deploy.ps1" %*

echo.
echo Deployment script completed.
pause
