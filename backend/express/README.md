# API de Países - Express.js

Esta API proporciona datos de países y está construida con Express.js y PostgreSQL. Los datos provienen de `database.sql` / `countries-seed.json` y **no** llama a RestCountries en tiempo de ejecución.

## Ejecución con Docker Compose (recomendada)

El servicio `express` y la base de datos `postgres-db` están definidos en `docker-compose.yml` en la raíz.

1. Desde la raíz del repositorio:
   ```bash
   docker compose up --build
   ```
2. La API quedará disponible en `http://localhost:4000`.
   Por defecto escucha en el puerto `4000`, pero se puede sobreescribir con la variable de entorno `PORT`.

La base de datos se inicializa automáticamente con `backend/express/database.sql` y, al arrancar `server.js`, se comprueba que existan al menos 30 países; si no, se vuelven a insertar desde `countries-seed.json`.

---

## Ejecución local (sin Docker)

### 1. Requisitos

- Node.js
- PostgreSQL ejecutándose en tu máquina

### 2. Configuración de la base de datos

1. Crea una base de datos (p. ej. `countries_db`).
2. Ejecuta `backend/express/database.sql` para crear la tabla `countries` e insertar los datos de ejemplo.
3. Configura las variables de entorno usadas por `pg` (`db.js`):
   ```bash
   export PGUSER=tu_usuario
   export PGHOST=localhost
   export PGDATABASE=countries_db
   export PGPASSWORD=tu_contraseña
   export PGPORT=5432
   ```

### 3. Iniciar el servidor

```bash
npm install
node server.js
```

La API quedará disponible en `http://localhost:4000`.

---

## Endpoints

### `GET /countries`

Devuelve una lista de todos los países almacenados.

**Respuesta de ejemplo:**
```json
[
  {
    "name": { "common": "Argentina", "official": "Argentine Republic" },
    "flags": {
      "png": "https://flagcdn.com/w320/ar.png",
      "svg": "https://flagcdn.com/ar.svg"
    },
    "region": "Americas",
    "capital": ["Buenos Aires"],
    "population": 45376763,
    "cca2": "AR"
  }
]
```

### `GET /countries/search?name=<nombre>`

Busca países cuyo `name.common` contenga el texto proporcionado (búsqueda case-insensitive).

**Ejemplo:** `http://localhost:4000/countries/search?name=chile`

**Respuesta de ejemplo:**
```json
[
  {
    "name": { "common": "Chile", "official": "Republic of Chile" },
    "flags": {
      "png": "https://flagcdn.com/w320/cl.png",
      "svg": "https://flagcdn.com/cl.svg"
    },
    "region": "Americas",
    "capital": ["Santiago"],
    "population": 19116201,
    "cca2": "CL"
  }
]
```

