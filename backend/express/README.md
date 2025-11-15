# API de Países - Express.js

Esta API proporciona datos de países y está construida con Express.js y PostgreSQL.

## Ejecución

### 1. Requisitos

- Node.js
- PostgreSQL

### 2. Configuración de la Base de Datos

1.  Crea una base de datos en PostgreSQL (p. ej., `countries_db`).
2.  Ejecuta el script `database.sql` para crear la tabla `countries` e insertar los datos de ejemplo.
3.  Configura la conexión a la base de datos. El `db.js` utiliza variables de entorno. Puedes crear un archivo `.env` o exportarlas en tu terminal:
    ```bash
    export PGUSER=tu_usuario
    export PGHOST=localhost
    export PGDATABASE=countries_db
    export PGPASSWORD=tu_contraseña
    export PGPORT=5432
    ```

### 3. Iniciar el Servidor

```bash
# Instalar dependencias
npm install

# Iniciar la API en modo de desarrollo
node server.js
```

La API estará disponible en `http://localhost:4000`.

## Endpoints

### `GET /countries`

Devuelve una lista de todos los países almacenados.

**Respuesta de ejemplo:**
```json
[
  {
    "name": { "common": "Argentina", "official": "Argentine Republic" },
    "flags": { "png": "https://flagcdn.com/w320/ar.png", "svg": "https://flagcdn.com/ar.svg" },
    "region": "Americas",
    "capital": ["Buenos Aires"],
    "population": 45376763,
    "cca2": "AR"
  }
]
```

### `GET /countries/search?name=<nombre>`

Busca países cuyo nombre común contenga el texto proporcionado (case-insensitive).

**Ejemplo:** `http://localhost:4000/countries/search?name=chile`

**Respuesta de ejemplo:**
```json
[
  {
    "name": { "common": "Chile", "official": "Republic of Chile" },
    "flags": { "png": "https://flagcdn.com/w320/cl.png", "svg": "https://flagcdn.com/cl.svg" },
    "region": "Americas",
    "capital": ["Santiago"],
    "population": 19116201,
    "cca2": "CL"
  }
]
```

## Docker

Para levantar el servicio con Docker, asegúrate de que el servicio `postgres` esté disponible y configura las variables de entorno en tu `docker-compose.yml` si es necesario. Luego, ejecuta:

```bash
docker-compose up express --build
```