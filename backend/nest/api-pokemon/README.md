# API Pok��mon

API NestJS que expone informaci��n de Pok��mon almacenada en PostgreSQL y la sirve con un contrato similar a la PokeAPI, pero usando sprites locales (`/img/pokemon/...`).

## Requisitos

- Node.js 20+
- PostgreSQL disponible (se recomienda usar el contenedor `postgres-db` definido en `docker-compose.yml`).

## Ejecuci��n con Docker Compose (recomendada)

La API se construye como servicio `nest` dentro del `docker-compose.yml` de la ra��z.

1. Desde la ra��z del repositorio:
   ```bash
   docker compose up --build
   ```
2. La API quedar�� disponible en `http://localhost:3000`.

El contenedor ejecuta `npm run seed` al iniciar para poblar la tabla `pokemon` a partir de `seed-data.json` y luego arranca NestJS.

---

## Ejecuci��n local (sin Docker)

1. Configura las variables de entorno para la conexi��n a PostgreSQL (las mismas que en `docker-compose.yml`):

   - `DB_HOST`
   - `DB_PORT`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`

2. Instala dependencias y ejecuta el seed:

   ```bash
   npm install
   npm run seed
   npm run start:dev
   ```

La API quedar�� disponible en `http://localhost:3000`.

---

## Rutas

- `GET /pokemon?limit=&offset=` devuelve una lista paginada (por defecto `limit=20`, `offset=0`, `limit` m��ximo 50).
- `GET /pokemon/:idOrName` busca por `id` num��rico o por nombre (case-insensitive).

### Ejemplos

```bash
curl "http://localhost:3000/pokemon?limit=3"
curl "http://localhost:3000/pokemon/25"
curl "http://localhost:3000/pokemon/pikachu"
```

### Contrato de respuesta

Detalle abreviado para `GET /pokemon/25`:

```json
{
  "id": 25,
  "name": "pikachu",
  "height": 4,
  "weight": 60,
  "types": [{ "slot": 1, "type": { "name": "electric" } }],
  "sprites": {
    "front_default": "/img/pokemon/25.png",
    "back_default": null,
    "other": {
      "official-artwork": {
        "front_default": "/img/pokemon/25_artwork.png"
      }
    }
  },
  "stats": [
    { "base_stat": 35, "stat": { "name": "hp" } },
    { "base_stat": 55, "stat": { "name": "attack" } }
  ]
}
```

Los sprites referenciados (`/img/pokemon/...`) se sirven desde el frontend (`frontend/www/img/pokemon/`) y permiten que las im��genes funcionen sin conexi��n a Internet.

---

## Notas

- `npm run seed` es idempotente y realiza upsert de los registros definidos en `seed-data.json`.
- `synchronize=true` est�� habilitado en TypeORM para facilitar el desarrollo; revisar antes de ir a producci��n.

