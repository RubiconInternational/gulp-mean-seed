echo off
set command=%1
start cmd --login /k "C:\mongodb\bin\mongod.exe"
start cmd --login /k "C:\mongodb\bin\mongo.exe"
start cmd --login /k "node %command% --env APP_ENV"