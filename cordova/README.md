# Cordova / APK Android

Este directorio contiene el proyecto Cordova para empaquetar el frontend como APK Android.

## Requisitos

- Node.js + npm
- Cordova CLI:
  ```bat
  npm install -g cordova
  ```
- Android SDK (Android Studio recomendado)
- Java 17 (recomendado para cordova-android 14)

## Preparación

1. Sincroniza el frontend desde `frontend/www` hacia `cordova/www`:
   ```bat
   npm run sync-www:cordova
   ```
2. (Primera vez) Agrega la plataforma:
   ```bat
   cd cordova
   cordova platform add android
   ```

## Build del APK

```bat
cd cordova
cordova prepare android
cordova build android
```

APK generado (debug):

```
cordova/platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

## Configuración de red (hecha por nosotros)

- Habilitado tráfico HTTP (cleartext) para desarrollo: `usesCleartextTraffic` + `res/xml/network_security_config.xml`.
- Evitado Mixed Content sirviendo la app en `file://` o `http://localhost` (ver `config.xml`).
- Incluido `cordova.js` en `index.html` para detectar Cordova correctamente.

## Consumir APIs desde emulador / dispositivo

- Emulador Android (AVD/BlueStacks): host `10.0.2.2`.
- Dispositivo físico (misma red WiFi): IP LAN de tu PC (ej. `192.168.1.50`).

Puedes cambiar el host sin recompilar usando `localStorage` desde la app:

```js
localStorage.setItem('API_HOST', '192.168.X.Y')
// limpiar
localStorage.removeItem('API_HOST')
```

## Depuración opcional

- Overlay de logs en pantalla (apagado por defecto). Activar:

```js
localStorage.setItem('DEBUG_OVERLAY', '1')
```

Desactivar:

```js
localStorage.removeItem('DEBUG_OVERLAY')
```

- Chrome DevTools (si habilitas ADB en el emulador): `chrome://inspect/#devices`.

## Verificación rápida

- Lista de países visible (con banderas)
- Pokémon destacados con imagen
- Clima/feriados responden

Si algo falla, revisa que el backend esté arriba (`docker compose up --build`) y que el host apunte a `10.0.2.2` o a la IP LAN correcta.
