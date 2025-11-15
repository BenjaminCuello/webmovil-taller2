# Frontend - InfoMóvil Taller 2

Este directorio contiene la aplicación web móvil (HTML + Tailwind + JS puro) que se empaquetará con Apache Cordova.

## Requisitos

- Node.js >= 16 (para ejecutar el script `sync-www.js`).
- Cordova CLI instalado globalmente (`npm install -g cordova`) cuando vayas a generar el APK.

## Estructura

```
frontend/
├── Dockerfile        # Nginx que sirve /www
└── www/
    ├── index.html    # Landing + vistas de detalle
    ├── styles.css    # Estilos base adicionales a Tailwind
    └── js/           # Lógica separada por dominio
        ├── config.js # URLs base de las APIs propias
        ├── api.js    # Fetch a las APIs propias (Nest/Express/FastAPI)
        └── *.js      # Módulos de Pokémon, Países, Clima, Feriados
```

## Configuración de APIs

El frontend está pensado para consumir **solo** las APIs propias del Taller 2:

- NestJS → `/pokemon` (lista + detalle)
- Express → `/countries` y `/countries/search`
- FastAPI → `/weather?city=` y `/holidays/{countryCode}/{year}`

Para ajustar los hosts/puertos (localhost, emulador Android, Docker), edita `frontend/www/js/config.js`.

### Docker Compose

```bash
# Desde la raíz del repositorio
docker-compose up --build frontend --no-deps
# Frontend disponible en http://localhost:8080
```

## Integración de backend al pasar a Cordova

- NestJS debe exponer `/pokemon` (lista + detalle) y habilitar CORS.
- Express debe exponer `/countries` y `/countries/search` con los campos consumidos por el frontend.
- FastAPI debe exponer `/weather?city=` y `/holidays/{countryCode}/{year}` retornando el mismo JSON que el contrato del Taller 1.

