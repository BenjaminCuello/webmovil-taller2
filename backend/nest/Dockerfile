FROM node:20-alpine

WORKDIR /app

COPY api-pokemon/package*.json ./
RUN npm install

COPY api-pokemon/. ./

CMD ["npm", "run", "start:dev"]

