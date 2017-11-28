@echo off
echo %~dp0data\db
start cmd /k mongod --dbpath "%~dp0data\db"
ping 127.0.0.1 -n 4 > nul
start cmd /k mongo
start node app