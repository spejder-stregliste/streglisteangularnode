# we need to choose a node environment for the build
FROM node:18.17.1 as build

# copy server components
WORKDIR /app
COPY ./server/ /app

# get server dependencies
RUN npm install -g @angular/cli
RUN npm install

# build server components
RUN npm run build

# copy web components
WORKDIR /app/web
COPY ./web/ /app/web

# install web dependencies
RUN npm install

# build web compnents
RUN ng build --output-path="../dist/web" --base-href /



# we use a slim client to serve
FROM node:18.17.1-slim as final

# set environment to production
ENV NODE_ENV=production

# get the outputs from build
COPY --from=build /app/dist/ /app/dist

# copy .env
WORKDIR /app/dist
COPY ./server/.env /app/dist

# copy package.json files
COPY ./server/package*.json /app/dist
COPY ./web/package*.json /app/dist/web

# install minimal dependencies
RUN npm install --omit=dev
WORKDIR /app/dist/web
RUN npm install --omit=dev

WORKDIR /app/dist

# we default to port 8080
EXPOSE 8080

# start the express server
CMD ["node", "index.js"]