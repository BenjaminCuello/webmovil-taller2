async function _fetchJSON(url, options) {
  debugLog('FETCH_INICIO', { url, options })

  try {
    const res = await fetch(url, options)
    debugLog('FETCH_STATUS', { url, status: res.status })

    if (!res.ok) {
      let bodyText = ''
      try {
        bodyText = await res.text()
      } catch (e) {
        bodyText = '(no se pudo leer body)'
      }
      debugLog('FETCH_HTTP_ERROR', {
        url,
        status: res.status,
        bodySample: bodyText.slice(0, 200),
      })
      throw new Error('HTTP ' + res.status)
    }

    const data = await res.json()
    debugLog('FETCH_OK', {
      url,
      sample: Array.isArray(data) ? data[0] : data,
    })

    return data
  } catch (e) {
    debugLog('FETCH_EXCEPTION', { url, error: String(e) })
    throw e
  }
}

// POKÉMON - API NestJS local
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

// PA�SES - API Express local
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

// CLIMA - API FastAPI local
function obtenerClima(ciudad) {
  var url = BASE_URL_FASTAPI.replace(/\/$/, '') + '/weather?city=' + encodeURIComponent(ciudad)
  return _fetchJSON(url).catch(function (error) {
    console.error('[api] Error en obtenerClima', url, error)
    throw new Error('No se pudo obtener la informaci�n del clima')
  })
}

// FERIADOS - API FastAPI local
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
