FROM node:alpine

WORKDIR /app

COPY package.json .

COPY init-db.sh .

RUN npm install

COPY . .
