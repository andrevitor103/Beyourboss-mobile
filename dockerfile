FROM node:18-alpine

ARG PORT=19006
ENV PORT $PORT
EXPOSE $PORT 19001 19002

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN apk add --update python3 make g++

RUN rm -rf /var/cache/apk/*

# install global packages
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH /home/node/.npm-global/bin:$PATH
RUN npm i --unsafe-perm --allow-root -g npm@latest expo-cli@latest


RUN npm install

WORKDIR /app

ENV PATH /app/.bin:$PATH

COPY . .

ENTRYPOINT ["npm", "run", "start"]
