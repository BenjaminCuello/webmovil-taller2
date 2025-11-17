function _fetchJSON(url, options) {
  if (typeof window.debugLog === 'function') {
    window.debugLog('fetch:start', { url: url })
  }
  return fetch(url, options)
    .then(function (r) {
      if (!r.ok) {
        if (typeof window.debugLog === 'function') {
          window.debugLog('fetch:http_error', { url: url, status: r.status })
        }
        if (typeof mostrarToast === 'function') {
          mostrarToast('error', 'HTTP ' + r.status + ' en ' + url, 3000)
        }
        throw new Error('HTTP ' + r.status)
      }
      return r.json()
    })
    .catch(function (error) {
      if (typeof window.debugLog === 'function') {
        window.debugLog('fetch:fail', {
          url: url,
          error: String((error && error.message) || error),
        })
      }
      if (typeof mostrarToast === 'function') {
        mostrarToast('error', 'Error de red o parseo en ' + url, 3000)
      }
      throw error
    })
}

function obtenerPokemon(nombreOId) {
  var url = BASE_URL_POKEMON.replace(/\/$/, '') + '/pokemon/' + encodeURIComponent(nombreOId)
  return _fetchJSON(url).catch(function (error) {
    console.error('[api] Error en obtenerPokemon', url, error)
    throw new Error('Pok�mon no encontrado')
  })
}

function obtenerListaPokemon(limite, desde) {
  var url =
    BASE_URL_POKEMON.replace(/\/$/, '') +
    '/pokemon?limit=' +
    encodeURIComponent(limite) +
    '&offset=' +
    encodeURIComponent(desde)
  return _fetchJSON(url).catch(function (error) {
    console.error('[api] Error en obtenerListaPokemon', url, error)
    throw new Error('No se pudo obtener la lista de Pok�mon')
  })
}

function obtenerPais(nombre) {
  var url =
    BASE_URL_COUNTRIES.replace(/\/$/, '') + '/countries/search?name=' + encodeURIComponent(nombre)
  return _fetchJSON(url).catch(function (error) {
    console.error('[api] Error en obtenerPais', url, error)
    throw new Error('Pa�s no encontrado')
  })
}

function obtenerTodosPaises() {
  var url = BASE_URL_COUNTRIES.replace(/\/$/, '') + '/countries'
  return _fetchJSON(url).catch(function (error) {
    console.error('[api] Error en obtenerTodosPaises', url, error)
    throw new Error('No se pudo obtener la lista de pa�ses')
  })
}

function obtenerClima(ciudad) {
  var url = BASE_URL_FASTAPI.replace(/\/$/, '') + '/weather?city=' + encodeURIComponent(ciudad)
  return _fetchJSON(url).catch(function (error) {
    console.error('[api] Error en obtenerClima', url, error)
    throw new Error('No se pudo obtener la informaci�n del clima')
  })
}

function obtenerFeriados(codigoPais, ano) {
  var url =
    BASE_URL_FASTAPI.replace(/\/$/, '') +
    '/holidays/' +
    encodeURIComponent(String(codigoPais).toUpperCase()) +
    '/' +
    encodeURIComponent(ano)
  return _fetchJSON(url).catch(function (error) {
    console.error('[api] Error en obtenerFeriados', url, error)
    throw new Error('No se pudieron obtener los feriados')
  })
}
