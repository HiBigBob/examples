FROM node:8.6-alpine

WORKDIR /usr/app

RUN npm install pm2 -g
COPY package.json .
RUN npm install --quiet

COPY . .
