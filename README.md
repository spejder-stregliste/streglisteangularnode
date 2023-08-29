# streglisteangularnode
Website for klan sukkeregern stregliste.

## Tech stack
### Backend
<t>express.js</t> using typescript.

### Frontend
Angular CLI using typescript.

## Developing

### Node.js
version 18.17.1

### docker
docker desktop for windows

### Local development

#### Angular
`ng serve` in `./web`

#### Express
`docker build . -t stregliste:latest` in `root`
`docker run -detached -p 4000:4000 stregliste:latest`

### Deployment
Using docker. Run "deploy.cmd" in root of project.

Docker must be locally configured to push to google storage buckets.
[Setup docker](https://cloud.google.com/sdk/gcloud/reference/auth/configure-docker)

After the push a new revision must be made to the Google run instance for changes to take effect.
[Managing revisions](https://cloud.google.com/run/docs/managing/revisions)