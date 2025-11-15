# Usa una imagen oficial de Node.js (versión 20-alpine es ligera y segura)
FROM node:20-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de definición de dependencias
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos de la aplicación (código fuente)
COPY . .

# Expone el puerto 4000, que es donde correrá nuestra API
EXPOSE 4000

# El comando para iniciar la aplicación cuando se levante el contenedor
CMD ["node", "server.js"]