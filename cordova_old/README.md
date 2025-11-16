# Proyecto Cordova - InfoMovil

Este directorio contiene la configuraci��n m��nima para empaquetar el frontend de InfoMovil como una aplicaci��n Android (APK) usando Apache Cordova.

> Importante: aqu�� solo se define el contenedor Cordova. El c��digo real del frontend se copia desde `frontend/www` usando un script (`npm run sync-www:cordova`).

---

## Requisitos previos

Antes de generar el APK en tu computador, aseg��rate de tener instalado y configurado:

- Node.js + npm
- Cordova CLI:
  ```bash
  npm install -g cordova
  ```
- Java JDK (versi��n compatible con tu versi��n de Android SDK)
- Android SDK / Android Studio:
  - Variables de entorno configuradas (`ANDROID_HOME`, `JAVA_HOME`, etc.) seg��n tu sistema operativo.

---

## 1. Preparar el proyecto Cordova (solo la primera vez)

1. Desde la ra��z del repositorio, sincroniza el frontend hacia Cordova:
   ```bash
   npm run sync-www:cordova
   ```
   Esto copiar�� todo el contenido de `frontend/www` a `cordova/www`.

2. Entra a la carpeta Cordova:
   ```bash
   cd cordova
   ```

3. A��ade la plataforma Android (solo la primera vez en esta carpeta):
   ```bash
   cordova platform add android
   ```

Esto crear�� la estructura de `platforms/android` necesaria para construir el APK.

---

## 2. Sincronizar el frontend con Cordova (cada vez que cambies el frontend)

Siempre que hagas cambios en `frontend/www`, debes volver a copiar esos archivos al proyecto Cordova antes de construir:

1. Desde la ra��z del repositorio:
   ```bash
   npm run sync-www:cordova
   ```
   Esto limpia y vuelve a copiar `frontend/www` dentro de `cordova/www`.

2. (Opcional) Si ya ten��as abierta la carpeta `cordova/`, aseg��rate de estar dentro de ella antes de construir:
   ```bash
   cd cordova
   ```

---

## 3. Generar el APK Android

Con todos los requisitos instalados y el frontend ya sincronizado en `cordova/www`:

1. Desde `cordova/`:
   ```bash
   cordova build android
   ```

2. Una vez completado el build, el APK de debug suele quedar en:
   ```text
   cordova/platforms/android/app/build/outputs/apk/debug/app-debug.apk
   ```

Ese archivo `app-debug.apk` es el que debes usar para probar la aplicaci��n en un emulador/dispositivo Android y para entregarlo en la evaluaci��n (p. ej. subirlo al Campus).

---

## Notas

- No es necesario subir la carpeta `platforms/` ni `plugins/` al repositorio; ya est��n ignoradas en `.gitignore`.
- Si necesitas cambiar el `id`, el nombre o la versi��n de la app, puedes editar `cordova/config.xml`.
- Antes de reconstruir el APK, recuerda ejecutar `npm run sync-www:cordova` si el frontend cambi��.

