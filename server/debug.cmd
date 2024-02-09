@ECHO OFF

call npm run build
copy .env .\dist

cd ..\web

call ng build --output-path="../server/web" --base-href /

cd ..\server

firebase emulators:exec "npm run start" --import=./data