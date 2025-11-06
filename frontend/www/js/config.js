// Modo de ejecución del frontend
// 'public': usa APIs públicas del Taller 1 (por defecto)
// 'local': usa APIs propias (NestJS/Express/FastAPI) definidas abajo
// 'mock': usa archivos locales en carpeta /mock para desarrollo sin red
var MODE = 'public';
var MODE_STORAGE_KEY = 'infomovil-mode';

function isModoValido(valor) {
  return valor === 'public' || valor === 'local' || valor === 'mock';
}

function leerModoPersistido() {
  try {
    if (typeof window !== 'undefined' && 'localStorage' in window) {
      var almacenado = window.localStorage.getItem(MODE_STORAGE_KEY);
      if (isModoValido(almacenado)) {
        return almacenado;
      }
    }
  } catch (error) {
    console.warn('[config] No se pudo leer modo desde localStorage', error);
  }
  return null;
}

function guardarModoPersistido(modo) {
  try {
    if (typeof window !== 'undefined' && 'localStorage' in window && isModoValido(modo)) {
      window.localStorage.setItem(MODE_STORAGE_KEY, modo);
    }
  } catch (error) {
    console.warn('[config] No se pudo guardar modo en localStorage', error);
  }
}

var modoPersistido = leerModoPersistido();
if (modoPersistido) {
  MODE = modoPersistido;
}

// URLs base para backends locales (ajustar según tu entorno)
// Nota: en docker-compose de este repo los contenedores exponen estos puertos en localhost
// Nota: en emulador Android, reemplaza 'localhost' por '10.0.2.2'
var BASE_URL_POKEMON = 'http://localhost:3000';
var BASE_URL_COUNTRIES = 'http://localhost:4000';
var BASE_URL_FASTAPI = 'http://localhost:8000';

// Helper opcional: permite cambiar modo vía query param ?mode=
(function () {
  try {
    var params = new URLSearchParams(window.location.search);
    var modeParam = (params.get('mode') || '').toLowerCase();
    if (isModoValido(modeParam)) {
      MODE = modeParam;
      guardarModoPersistido(modeParam);
      console.log('[config] MODE set by query param to', MODE);
    }
  } catch (e) {
    // noop
  }
})();

if (typeof window !== 'undefined') {
  window.INFO_MOVIL_MODE = MODE;
  window.obtenerModoActual = function () {
    return window.INFO_MOVIL_MODE;
  };
  window.establecerModo = function (nuevoModo, recargar) {
    if (!isModoValido(nuevoModo)) return;
    guardarModoPersistido(nuevoModo);
    window.INFO_MOVIL_MODE = nuevoModo;
    if (typeof MODE !== 'undefined') {
      MODE = nuevoModo;
    }
    if (recargar) {
      try {
        var urlActual = new URL(window.location.href);
        urlActual.searchParams.set('mode', nuevoModo);
        window.location.href = urlActual.toString();
      } catch (error) {
        window.location.href = window.location.pathname + '?mode=' + encodeURIComponent(nuevoModo);
      }
    }
  };
  window.obtenerModosDisponibles = function () {
    return ['public', 'local', 'mock'];
  };
}
