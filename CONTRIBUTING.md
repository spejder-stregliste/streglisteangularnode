# Contributing

This guide is for setup on a windows machine.

## Installation steps

1. **Github**
	- Create an account on [Github](https://github.com).
	- Get account added as a collaborator, this can be done in one of two ways.
		- Ask the owner of the repository to be added.
		- Access the repository owner account and add the new account as a [Collaborator](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository). 
2. **Git**
	- Download and install from [git](https://git-scm.com/downloads).
	- Link with [Github account](https://docs.github.com/en/get-started/getting-started-with-git/set-up-git).
3. **Clone project**
	- Clone project into desired directory using `git clone https://github.com/spejder-stregliste/streglisteangularnode`. 
4. **Node.js** 
	- Download and install from [Node.js](https://nodejs.org/en/download/).
5. **Install dependencies** 
	- Navigate to the root of the the project folder. 
		- run `npm install` in `./server`.
		- run `npm install` in `./web`
  	- Install angular CLI as global dependency
   		- run `npm install -g @angular/cli`
       	> The global installs of npm might not be in you Path environment variable!
        > Make sure to add the global npm path to Environemnt Variable `Path`.
        > To see installation paths run `npm list -g`
6. **gcloud CLI**
	- Download and install from [gcloud](https://cloud.google.com/sdk/gcloud#download_and_install_the). 
	- Run `gcloud init` and follow instructions to setup authentication.
7. **Firebase CLI**
	- Run `npm install -g firebase-tools` to install the Firebase CLI.
 	> The emulators for firebase require a local java JDK of version 11 or higher  
8. **Docker**
	- Docker is *Linux* based, this step will require virtualization. It is recommended to use [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) to install Linux on windows.
	- Download and install from [Docker Desktop](https://www.docker.com/products/docker-desktop/).
	- Setup docker to push to [Google Storage Buckets](https://cloud.google.com/sdk/gcloud/reference/auth/configure-docker).
