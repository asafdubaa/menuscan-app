@echo off
echo Building Android APK...

:: Create a clean environment
cd %~dp0
echo Removing previous build files...
if exist "android\.gradle" rmdir /s /q "android\.gradle"
if exist "android\app\build" rmdir /s /q "android\app\build"

:: Enter the Android directory
cd %~dp0\android

:: Run the build with explicit permission handling
echo Running Gradle clean...
call gradlew.bat --stop
timeout /t 2 /nobreak > nul
call gradlew.bat clean

echo Building debug APK...
call gradlew.bat assembleDebug

if %ERRORLEVEL% NEQ 0 (
  echo Build failed with error code %ERRORLEVEL%
  echo Trying alternative build approach...
  cd %~dp0
  
  :: Try rebuilding native code from scratch
  echo Regenerating Android native code...
  call npx expo prebuild --platform android --clean
  
  :: Try the build again
  cd %~dp0\android
  call gradlew.bat --stop
  timeout /t 2 /nobreak > nul
  call gradlew.bat assembleDebug
)

if %ERRORLEVEL% EQU 0 (
  echo.
  echo Build completed successfully. Look for the APK file at:
  echo %~dp0\android\app\build\outputs\apk\debug\app-debug.apk
  echo.
) else (
  echo.
  echo Build failed. Please check the error messages above.
  echo.
)

pause 