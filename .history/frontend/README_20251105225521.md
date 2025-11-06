# Frontend - InfoMóvil Taller 2

Este directorio contiene la aplicación web móvil (HTML + Tailwind + JS puro) que se empaquetará con Apache Cordova.

## Requisitos

- Node.js >= 16 (para ejecutar el script `sync-www.js`).
- Cordova CLI instalado globalmente (`npm install -g cordova`) cuando vayas a generar el APK.

## Estructura

```
frontend/
├── Dockerfile          # Nginx que sirve /www
└── www/
    ├── index.html      # Landing + vistas de detalle
    ├── styles.css      # Estilos base adicionales a Tailwind
    ├── js/             # Lógica separada por dominio
    │   ├── config.js   # MODE + URLs (public/local/mock)
    │   ├── api.js      # Fetch a APIs (públicas, locales o mocks)
    │   ├── *.js        # Módulos de Pokémon, Países, Clima, Feriados
    └── mock/           # Datos locales para MODE='mock'
```

## Modos de ejecución

- `public` (default): usa las APIs públicas del Taller 1.
- `local`: usa los backends propios (Nest/Express/FastAPI). Ajusta las URL en `js/config.js`.
- `mock`: usa los JSON de `frontend/www/mock/` (sin depender de Internet ni backend).

Cambiar modo:

1. Desde el encabezado de la app usando el selector de modo (se persiste en `localStorage`).
2. Editar `frontend/www/js/config.js` y setear `var MODE = 'mock'` o `var MODE = 'local'`.
3. Para pruebas puntuales se puede usar query param, ej: `http://localhost:8080/?mode=mock`.

---

### Docker Compose

```bash
# Desde la raíz del repositorio
docker-compose up --build frontend --no-deps
# Frontend disponible en http://localhost:8080
```

## Integración de backend a considerar al pasar a Cordova

- NestJS debe exponer `/pokemon` (lista + detalle) y habilitar CORS (`GET` desde `http://localhost:8080`).
- Express debe exponer `/countries` y `/countries/search` con los campos consumidos por el frontend.
- FastAPI debe exponer `/weather?city=` y `/holidays/{country}/{year}` retornando el mismo payload que los mocks.
- Si desplegarás en dispositivos reales, considera usar HTTPS o un túnel (ngrok, localtunnel) para evitar bloqueos.
- Documenta en `README.md` cualquier credencial necesaria o variable de entorno para los backends.
