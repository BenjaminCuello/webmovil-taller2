// Configuración de URLs base para las APIs propias.
// Caso 1: desarrollo en el navegador (backend corriendo en este mismo PC):
//   - http://localhost:3000
//   - http://localhost:4000
//   - http://localhost:8000
//
// Caso 2: emulador Android (Android Studio, Bluestacks, etc.) en el mismo PC:
//   - http://10.0.2.2:3000
//   - http://10.0.2.2:4000
//   - http://10.0.2.2:8000
//
// Caso 3: dispositivo físico en la misma red WiFi que el PC:
//   (reemplaza 192.168.1.50 por la IP real de tu computador)
//   - http://192.168.1.50:3000
//   - http://192.168.1.50:4000
//   - http://192.168.1.50:8000
var BASE_URL_POKEMON = 'http://localhost:3000'
var BASE_URL_COUNTRIES = 'http://localhost:4000'
var BASE_URL_FASTAPI = 'http://localhost:8000'
