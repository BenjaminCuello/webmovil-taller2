# Frontend Testing

Guía para testear el frontend consumiendo únicamente las APIs propias del Taller 2.

## Preparación

1. Desde la raíz del repositorio:
   ```bash
   docker compose up --build
   ```
2. Abre `http://localhost:8080` en el navegador.
3. Verifica rápidamente que las APIs respondan:
   - `http://localhost:3000/pokemon?limit=1`
   - `http://localhost:4000/countries`
   - `http://localhost:8000/weather?city=Coquimbo`
   - `http://localhost:8000/holidays/CL/2025`

## Escenarios principales

### 1. Landing

- Las cuatro tarjetas (Pokémon, Países, Clima, Feriados) muestran datos de ejemplo.
- Los textos de “Cargando...” desaparecen y se ven tarjetas compactas con contenido.
- Si apagas algún backend, se muestran mensajes de error y el toast rojo.

### 2. Pokémon

- En la landing se muestran varios Pokémon con imagen y número.
- En la vista de detalle (`?recurso=pokemon`):
  - Buscar por nombre/ID (ej: `pikachu`, `25`).
  - Probar el listado completo con “Cargar más”.
- Confirmar en el inspector que las imágenes se cargan desde `/img/pokemon/...` (sprites funcionando sin conexión a Internet).

### 3. Países

- En la landing se listan algunos países ordenados por población.
- En la vista de detalle (`?recurso=paises`):
  - Buscar “Chile” y otros países.
  - Verificar región, capital, población y código ISO.

### 4. Clima

- En la landing se muestran varias ciudades con temperatura y viento.
- En la vista de detalle (`?recurso=clima`):
  - Consultar por una ciudad válida (ej: `La Serena`, `Coquimbo`).
  - Probar el listado de “varias ciudades” y la paginación.

### 5. Feriados

- En la landing se muestran algunos feriados de Chile del año actual.
- En la vista de detalle (`?recurso=feriados`):
  - Consultar por `CL` y un año válido (ej: `2025`).
  - Usar la vista de “varios países” y comprobar que se muestran hasta 6 feriados por país.

## Notas

- El frontend siempre consume las APIs propias configuradas en `frontend/www/js/config.js`.
- No se usan ya datos mock ni APIs públicas en tiempo de ejecución.

