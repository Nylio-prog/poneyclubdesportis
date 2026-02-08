@echo off
echo ========================================
echo Poney Club Desportis - E2E Test Runner
echo ========================================
echo.
echo This will run all E2E tests to verify:
echo - Language switching (French/English)
echo - Mobile navigation
echo - All page functionality
echo - No errors or hydration issues
echo.
echo Starting tests...
echo.

npm run test:e2e

echo.
echo ========================================
echo Tests complete!
echo.
echo To view the HTML report, run:
echo   npm run test:e2e:report
echo.
echo To run tests with UI mode, run:
echo   npm run test:e2e:ui
echo ========================================
pause
