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

### Installation
see [Contributing.md](https://github.com/spejder-stregliste/streglisteangularnode/blob/ad7aaa345c322840598c3b12cb0f41aee0385bc9/CONTRIBUTING.md)

### Node.js
version: 18.17.1

### docker
docker desktop for windows

### Local development

#### Angular
`ng serve` in `./web`

#### Express
`debug.cmd` in `/server`

> For the backend to access "Google Cloud" services the [gcloud CLI](https://cloud.google.com/sdk/gcloud) must be set up with user credentials, [guid](https://cloud.google.com/docs/authentication/provide-credentials-adc#local-user-cred)   

### Deployment
Using docker. Run "deploy.cmd" in root of project.

Docker must be locally configured to push to google storage buckets.
[Setup docker](https://cloud.google.com/sdk/gcloud/reference/auth/configure-docker)

After the push a new revision must be made to the Google run instance for changes to take effect.
[Managing revisions](https://cloud.google.com/run/docs/managing/revisions)
