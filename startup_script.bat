@echo off
echo.

echo Installing Dependencies

echo Installing Backend and UI Dependecies and Setting Up MongoDB

cd ./indian-cities-backend/ && npm install && start cmd /k "npm run start" && cd ../indian-cities-ui && npm install && start cmd /k "npm run start" && cd .. && mkdir MongoDB\bin\data\db && start cmd /k "mongod --dbpath MongoDB\bin\data\" && mongo 127.0.0.1/indian-cities insert-cities.js

