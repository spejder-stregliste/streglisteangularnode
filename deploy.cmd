@ECHO OFF

docker build . --tag gcr.io/sukkeregern-stregliste-277311/streglisteangularnode:latest

docker push gcr.io/sukkeregern-stregliste-277311/streglisteangularnode:latest