# Synopsis
# Build and push application docker image to Google cloud platform

Write-Host "Building docker image..."
& docker build . --tag gcr.io/sukkeregern-stregliste-277311/streglisteangularnode:latest
Write-Host "Build done"

Write-Host "Pushing docker image to repository..."
& docker push gcr.io/sukkeregern-stregliste-277311/streglisteangularnode:latest
Write-Host "Done"