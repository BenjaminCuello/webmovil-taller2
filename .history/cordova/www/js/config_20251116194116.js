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

//Para PC local
//var BASE_URL_POKEMON = 'http://localhost:3000'
//var BASE_URL_COUNTRIES = 'http://localhost:4000'
//var BASE_URL_FASTAPI = 'http://localhost:8000'

// Para emulador Android (AVD/BlueStacks) por defecto usamos 10.0.2.2.
// Si no funciona, puedes sobreescribir el host guardando en localStorage:
//   localStorage.setItem('API_HOST', '192.168.x.y')  // IP LAN de tu PC
// Luego reinicia la app.

var DEFAULT_HOST = '10.0.2.2'
try {
  var isCordova = typeof window.cordova !== 'undefined'
  var isHttp = typeof location !== 'undefined' && location.protocol && location.protocol.indexOf('http') === 0
  // En navegador (no Cordova) usamos localhost; en Cordova forzamos 10.0.2.2
  if (!isCordova && isHttp) {
    DEFAULT_HOST = 'localhost'
  }
} catch (e) {}

var OVERRIDE_HOST = null
try {
  OVERRIDE_HOST = (window.localStorage && window.localStorage.getItem('API_HOST')) || null
} catch (e) {}

var HOST = (OVERRIDE_HOST || DEFAULT_HOST).replace(/\/$/, '')
var BASE_URL_POKEMON = 'http://' + HOST + ':3000'
var BASE_URL_COUNTRIES = 'http://' + HOST + ':4000'
var BASE_URL_FASTAPI = 'http://' + HOST + ':8000'

// Exponer también en window por si se accede indirecto
window.BASE_URL_POKEMON = BASE_URL_POKEMON
window.BASE_URL_COUNTRIES = BASE_URL_COUNTRIES
window.BASE_URL_FASTAPI = BASE_URL_FASTAPI

// Log auxiliar
if (typeof window.debugLog === 'function') {
  window.debugLog('config.js (cordova/www)', {
    DEFAULT_HOST: DEFAULT_HOST,
    OVERRIDE_HOST: OVERRIDE_HOST,
    isCordova: typeof window.cordova !== 'undefined',
    protocol: (typeof location !== 'undefined' && location.protocol) || 'n/a',
    BASE_URL_POKEMON: BASE_URL_POKEMON,
    BASE_URL_COUNTRIES: BASE_URL_COUNTRIES,
    BASE_URL_FASTAPI: BASE_URL_FASTAPI,
  })
}
