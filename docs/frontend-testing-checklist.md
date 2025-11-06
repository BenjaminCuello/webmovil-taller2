# Frontend Testing

Guia para testear Frontend (`mock`, `public`, `local`).

## Preparación

1. Levanta el frontend
   ```bash
   docker-compose up --build frontend --no-deps
   ```
2. Abre `http://localhost:8080` (o `?mode=mock` si quieres fijarlo vía URL).
3. Observa el selector del header y el badge “Modo: …”. Cambia según sea necesario.

## Modo: Datos mock

- Selecciona **Datos mock** en el header.
- Verifica que:
  - Landing carga con la información de `frontend/www/mock/`.
  - Cada vista de detalle responde sin depender de Internet.
  - Los botones “Cargar más” muestran el spinner de estado.
  - El toast rojo aparece si modificas manualmente un mock a un formato inválido (simulación de fallo).

## Modo: APIs públicas

- Selecciona **APIs públicas**.
- Comprueba que todas las vistas carguen datos reales de las APIs del Taller 1.
- Revisa que los estados de error se muestren si desconectas temporalmente la red.
- Vuelve a modo mock para regresar a la versión offline.

## Modo: APIs locales (cuando el backend esté disponible)

- Asegúrate de tener las APIs en ejecución (`docker-compose up` completo o servicios por separado).
- Actualiza `frontend/www/js/config.js` con las URLs reales (o usa `config.sample.js` para empezar).
- Selecciona **APIs locales** en el header.
- Verifica:
  - La landing y cada vista de detalle consumen tus endpoints sin errores CORS.
  - Los mensajes de error se muestran cuando apagas un servicio (p. ej. Express) y vuelves a encenderlo.
  - El modo queda recordado (recarga y el selector debe seguir en “APIs locales”).
