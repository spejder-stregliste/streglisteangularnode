############################################################ fetch node image #######################################################
FROM node:18.17.1 as base

############################################################ fetch server dependencies  ####################################################
FROM base as deps-server

# copy dependencies
WORKDIR /app
COPY ./server/package.json /app

# install dependencies
RUN npm install


############################################################ fetch web dependencies  ####################################################
FROM base as deps-web

# copy dependencies
WORKDIR /web
COPY ./web/package.json /web

# install dependencies
RUN npm install

############################################################ build server components ################################################
FROM base as build-server

# copy server components
WORKDIR /app
COPY ./server/ /app

# get server dependencies
COPY --from=deps-server /app/node_modules/ /app/node_modules

# build server components
RUN npm run build


############################################################ build web components ###################################################
FROM base as build-web

# copy web components
WORKDIR /web
COPY ./web/ /web

# install web dependencies
RUN npm install -g @angular/cli
COPY --from=deps-web /web/node_modules /web/node_modules

# build web compnents
RUN ng build --output-path="../web/dist" --base-href /


############################################################ setup run environment ##################################################
# we use a slim client to serve
FROM node:alpine as final

# set environment to production
ENV NODE_ENV=production

# get the outputs from server build
COPY --from=build-server /app/dist/ /app/

# get the outputs from the web build
COPY --from=build-web /web/dist/ /app/web

# copy .env
WORKDIR /app
COPY ./server/.env /app/

# create non root user
RUN addgroup --system --gid 1001 nodejs 
RUN adduser --system --uid 1001 expressjs

# set to non root user
USER expressjs

# we default to port 8080
EXPOSE 8080

# start the express server
CMD ["node", "index.js"]