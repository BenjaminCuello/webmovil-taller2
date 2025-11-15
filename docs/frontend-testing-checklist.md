# Frontend Testing

Guia para testear el frontend consumiendo ��nicamente las APIs propias del Taller 2.

## Preparaci��n

1. Desde la ra��z del repositorio:
   ```bash
   docker compose up --build
   ```
2. Abre `http://localhost:8080` en el navegador.
3. Verifica r��pidamente que las APIs respondan:
   - `http://localhost:3000/pokemon?limit=1`
   - `http://localhost:4000/countries`
   - `http://localhost:8000/weather?city=Coquimbo`
   - `http://localhost:8000/holidays/CL/2025`

## Escenarios principales

### 1. Landing

- Las cuatro tarjetas (Pok��mon, Pa��ses, Clima, Feriados) muestran datos de ejemplo.
- Los textos de ��Cargando...�� desaparecen y se ven tarjetas compactas con contenido.
- Si apagas alg��n backend, se muestran mensajes de error y el toast rojo.

### 2. Pok��mon

- En la landing se muestran varios Pok��mon con imagen y n��mero.
- En la vista de detalle (`?recurso=pokemon`):
  - Buscar por nombre/ID (ej: `pikachu`, `25`).
  - Probar el listado completo con ��Cargar m��s��.
- Confirmar en el inspector que las im��genes se cargan desde `/img/pokemon/...` (sprites funcionando sin conexi��n a Internet).

### 3. Pa��ses

- En la landing se listan algunos pa��ses ordenados por poblaci��n.
- En la vista de detalle (`?recurso=paises`):
  - Buscar ��Chile�� y otros pa��ses.
  - Verificar regi��n, capital, poblaci��n y c��digo ISO.

### 4. Clima

- En la landing se muestran varias ciudades con temperatura y viento.
- En la vista de detalle (`?recurso=clima`):
  - Consultar por una ciudad v��lida (ej: `La Serena`, `Coquimbo`).
  - Probar el listado de ��varias ciudades�� y la paginaci��n.

### 5. Feriados

- En la landing se muestran algunos feriados de Chile del a��o actual.
- En la vista de detalle (`?recurso=feriados`):
  - Consultar por `CL` y un a��o v��lido (ej: `2025`).
  - Usar la vista de ��varios pa��ses�� y comprobar que se muestran hasta 6 feriados por pa��s.

## Notas

- El frontend siempre consume las APIs propias configuradas en `frontend/www/js/config.js`.
- No se usan ya datos mock ni APIs p��blicas en tiempo de ejecuci��n.

