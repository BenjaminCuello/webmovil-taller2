# Backend Contracts

Estos contratos resumen lo que el frontend espera recibir de cada API propia. Los ejemplos se basan en las respuestas reales de las APIs y se inspiran en las APIs p��blicas originales (PokeAPI, RestCountries, Open-Meteo, NagerDate), pero **sin depender de ellas en tiempo de ejecuci��n**.

## Pok��mon (NestJS)

- **GET `/pokemon?limit=&offset=`** ��' listado paginado con estructura similar a la PokeAPI:
  ```json
  {
    "count": 30,
    "results": [
      { "name": "bulbasaur", "url": "https://pokeapi.co/api/v2/pokemon/1/" },
      { "name": "ivysaur", "url": "https://pokeapi.co/api/v2/pokemon/2/" }
    ]
  }
  ```
- **GET `/pokemon/:idOrName`** ��' objeto con los campos utilizados por el frontend:
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

## Pa��ses (Express)

- **GET `/countries`** ��' array de pa��ses ordenables en memoria:
  ```json
  [
    {
      "name": { "common": "Chile", "official": "Rep��blica de Chile" },
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
- **GET `/countries/search?name=Chile`** ��' mismo arreglo filtrado por `name.common` (case-insensitive).

## Clima y feriados (FastAPI)

- **GET `/weather?city=Coquimbo`** ��'
  ```json
  {
    "coordenadas": {
      "name": "Coquimbo",
      "country_code": "CL",
      "latitude": -29.95,
      "longitude": -71.34
    },
    "clima": {
      "current": {
        "temperature_2m": 16.4,
        "wind_speed_10m": 5.1
      }
    }
  }
  ```
- **GET `/holidays/{countryCode}/{year}`** ��'
  ```json
  [
    { "date": "2025-01-01", "localName": "A��o Nuevo", "name": "A��o Nuevo" },
    {
      "date": "2025-09-18",
      "localName": "Independencia Nacional",
      "name": "Independencia Nacional"
    }
  ]
  ```

## Notas

- Mantener los mismos nombres de campos que las APIs p��blicas de referencia para minimizar cambios en el frontend, pero sirviendo siempre los datos desde nuestras propias bases de datos.
- Las bases de datos pueden persistir estos datos con normalizaci��n propia, pero deben exponer el JSON anterior.
- Ante errores, responder con c��digos HTTP adecuados (`4xx`/`5xx`) y un cuerpo JSON `{ "message": "..." }` para que el frontend pueda informar al usuario.

