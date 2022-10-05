FROM node:16-alpine

RUN apk update && apk add bash

RUN npm i -g npm@latest

ENV NODE_ENV=development

WORKDIR /app
