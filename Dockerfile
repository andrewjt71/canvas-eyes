FROM node:16-alpine

RUN apk update && apk add bash

ENV NODE_ENV=development

WORKDIR /app
