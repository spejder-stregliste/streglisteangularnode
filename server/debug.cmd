@ECHO OFF

call npm run build

cd ..\web

call ng build --output-path="../server/web" --base-href /

cd ..\server

npm run start