# API Pokemon

API NestJS que expone información de 10 pokemones almacenados en PostgreSQL.

## Requisitos

- Node.js 20+
- PostgreSQL disponible y credenciales configuradas en `.env`

## Preparación

```bash
npm install
# Ajusta `.env` si cambias credenciales o puerto
npm run seed
```

## Ejecución

- Desarrollo con recarga: `npm run start:dev`
- Producción (compilar y ejecutar): `npm run build` seguido de `npm run start:prod`
- Puerto expuesto: `http://localhost:3000`

## Rutas

- `GET /pokemon?limit=5&offset=0` devuelve una lista paginada (por defecto `limit=20`, `offset=0`, `limit` máximo 50).
- `GET /pokemon/:idOrName` busca por `id` numérico o por nombre sin distinguir mayúsculas.

### Ejemplos

```bash
curl "http://localhost:3000/pokemon?limit=3"

curl "http://localhost:3000/pokemon/25"

curl "http://localhost:3000/pokemon/pikachu"
```

Respuesta abreviada `GET /pokemon/25`:

```json
{
  "id": 25,
  "name": "Pikachu",
  "spriteDefault": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  "spriteArtwork": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
  "types": ["electric"],
  "heightM": 0.4,
  "weightKg": 6,
  "stats": {
    "hp": 35,
    "attack": 55,
    "defense": 40,
    "specialAttack": 50,
    "specialDefense": 50,
    "speed": 90
  }
}
```

## Notas

- `npm run seed` es idempotente y realizará upsert de los registros de ejemplo.
- `synchronize=true` está habilitado en TypeORM para facilitar el desarrollo; revisar antes de ir a producción.
