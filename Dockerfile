# we need to choose a node environment for the build
FROM node:18.17.1-alpine as build

# copy server components
WORKDIR /app
COPY ./server/ /app

# get server dependencies
RUN npm install -g @angular/cli
RUN npm install

# build server
RUN npm run build

# copy web components
WORKDIR /app/web
COPY ./web/ /app/web

# install web components
RUN npm install @angular-devkit/build-angular
RUN npm install

# build web
RUN ng build --output-path="../dist/web" --base-href /



# we use a slim client to serve
FROM node:18.17.1-slim

# set environment
ENV NODE_ENV=production

# get the outputs
COPY --from=build /app/dist/ /app/dist

#set workdir
WORKDIR /app/dist

# copy .env
COPY ./server/.env /app/dist

# copy package.json files
COPY ./server/package.json /app/dist
COPY ./web/package.json /app/dist/web

# install minimal dependencies
RUN npm install
WORKDIR /app/dist/web
RUN npm install

#set workdir
WORKDIR /app/dist

# we default to port 4000, somewhat arbitrary
EXPOSE 8080

# start the express server
CMD ["node", "index.js"]