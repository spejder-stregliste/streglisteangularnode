# streglisteangularnode
Website for klan sukkeregern stregliste.

## Tech stack
### Backend
***Express.js*** using typescript.\
version: 4.18.2

### Frontend
***Angular*** using typescript.\
version: 16.2.0

## Developing

### Node.js
version: 18.17.1

### docker
docker desktop for windows

### Local development

#### Angular
`ng serve` in `./web`

> The serve script will open for traffic on port 4200.

#### Express
`npm run debug` in `/server`.\

When debugging is done it is advised to run `npm run close`.\
This will attempt to shut down local instances of gcloud emulators which have not been exited.\
\
In local development the password for /admin page is "Troppen1".

> The debug script will open for traffic on ports 4000, 9098 and 9099. 

### Deployment
Using docker. Run "deploy.cmd" in root of project.

Docker must be locally configured to push to google storage buckets.
[Setup docker](https://cloud.google.com/sdk/gcloud/reference/auth/configure-docker)

After the push a new revision must be made to the Google run instance for changes to take effect.
[Managing revisions](https://cloud.google.com/run/docs/managing/revisions)
