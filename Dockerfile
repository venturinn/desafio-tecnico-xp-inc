FROM node:alpine

WORKDIR /app

COPY package.json .

COPY init-db.sh .

RUN npm install

COPY . .

CMD ["node", "src/server.js"]