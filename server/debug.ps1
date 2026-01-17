$WebDirectory="$PSScriptRoot\..\web"
$ServerDirectory=$PSScriptRoot

Write-Host "Building express.js server..."
& npm run build
Write-Host "Build Done"

# Pass in .env file 
Copy-Item -Path .env -Destination .\dist

# Move to web directory 
Push-Location $WebDirectory

Write-Host "Building Angular application..."
& ng build --output-path="$ServerDirectory/web" --base-href /
Write-Host "Build Done"

# Move back to server directory
Pop-Location

Write-Host "Starting emulated database"
& firebase emulators:exec "npm run start" --import=./data