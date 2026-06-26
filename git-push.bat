@echo off
echo ==========================================
echo Pushing MediScan 3D to GitHub...
echo ==========================================
cd /d "%~dp0"

echo 1. Cleaning up local git history to purge secrets...
rmdir /s /q .git 2>nul
git init

echo 2. Renaming branch to main...
git branch -M main

echo 2.5. Untracking lockfile from Git...
git rm --cached pnpm-lock.yaml 2>nul

echo 2.6. Deleting server-side API routes for static export...
del /f /q app\api\explain\route.ts 2>nul
rmdir /s /q app\api\explain 2>nul
rmdir /s /q app\api 2>nul

echo 2.7. Copying generated logo to public directory...
copy "C:\Users\LOKOJIT\.gemini\antigravity-ide\brain\8023ac0f-2198-4415-810e-cfb2558fe166\mediscan_logo_1782511168322.png" "public\logo.png" /y 2>nul

echo 3. Adding files to git...
git add .

echo 4. Committing changes...
git commit -m "Initialize project: Configured built-in explanation engine and fixed Three.js React 18 compatibility"

echo 5. Setting up remote repository...
git remote remove origin 2>nul
git remote add origin https://github.com/lokojitcoder123/MediScan-3D---Interactive-Health-Risk-Visualizer

echo 6. Pushing to GitHub (main branch)...
git push -u origin main --force

echo ==========================================
echo Done! Please check the terminal output above.
echo ==========================================
pause
