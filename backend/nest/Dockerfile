FROM node:20-alpine

WORKDIR /app

COPY api-pokemon/package*.json ./
RUN npm install

COPY api-pokemon/. ./

# Al iniciar el contenedor: sembrar datos y luego arrancar NestJS
CMD ["sh", "-c", "npm run seed && npm run start:dev"]

