var DEFAULT_HOST = '10.0.2.2'
try {
  var isCordova = typeof window.cordova !== 'undefined'
  var isHttp =
    typeof location !== 'undefined' && location.protocol && location.protocol.indexOf('http') === 0
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

window.BASE_URL_POKEMON = BASE_URL_POKEMON
window.BASE_URL_COUNTRIES = BASE_URL_COUNTRIES
window.BASE_URL_FASTAPI = BASE_URL_FASTAPI

if (typeof window.debugLog === 'function') {
  window.debugLog('config.js (frontend/www)', {
    DEFAULT_HOST: DEFAULT_HOST,
    OVERRIDE_HOST: OVERRIDE_HOST,
    isCordova: typeof window.cordova !== 'undefined',
    protocol: (typeof location !== 'undefined' && location.protocol) || 'n/a',
    BASE_URL_POKEMON: BASE_URL_POKEMON,
    BASE_URL_COUNTRIES: BASE_URL_COUNTRIES,
    BASE_URL_FASTAPI: BASE_URL_FASTAPI,
  })
}
