set path=%1
echo %path%
C:\mongodb\bin\mongodump.exe --db APP_NAME -o %path%