Backend - InfoMóvil Taller 2
=================================

Este directorio aloja las tres APIs independientes que deben desarrollar los compañeros de backend.

- `nest/`: API de Pokémon en NestJS (TypeScript) con base de datos relacional (por ejemplo PostgreSQL).
- `express/`: API de Países en Express (Node.js) con base de datos relacional (por ejemplo PostgreSQL).
- `fastapi/`: API de Clima y Feriados en FastAPI (Python) con base de datos (por ejemplo MongoDB).

Pasos sugeridos para cada equipo
--------------------------------
1. Crear la estructura del proyecto dentro del subdirectorio correspondiente (`nest/`, `express/`, `fastapi/`).
2. Actualizar el `Dockerfile` de la carpeta con el build y comando real de la API.
3. Exponer los puertos definidos en la pauta:
   - NestJS → `3000`
   - Express → `4000`
   - FastAPI → `8000`
4. Implementar los endpoints siguiendo los contratos documentados en `README.md` (raíz).
5. Habilitar CORS para que el frontend Cordova/web pueda consumirlos.
6. Añadir documentación (Swagger o README) indicando cómo levantar cada API y la estructura de la base de datos.

Mientras el backend no esté implementado, los contenedores se mantienen vivos mediante el comando placeholder del `Dockerfile`. Una vez listos, este comando debe reemplazarse por la ejecución real de cada servidor.

