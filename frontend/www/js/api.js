function _is(mode) {
  return (typeof MODE !== 'undefined' ? MODE : 'public') === mode
}

function _fetchJSON(url, options) {
  return fetch(url, options).then(function (r) {
    if (!r.ok) throw new Error('HTTP ' + r.status)
    return r.json()
  })
}

// POKÉMON
function obtenerPokemon(nombreOId) {
  if (_is('mock')) {
    var safe = String(nombreOId).toLowerCase()
    return _fetchJSON('mock/pokemon/' + encodeURIComponent(safe) + '.json')
  }
  if (_is('local')) {
    var urlLocal = BASE_URL_POKEMON.replace(/\/$/, '') + '/pokemon/' + encodeURIComponent(nombreOId)
    return _fetchJSON(urlLocal)
  }
  // public
  var url = 'https://pokeapi.co/api/v2/pokemon/' + encodeURIComponent(nombreOId)
  return _fetchJSON(url).catch(function () {
    throw new Error('Pokémon no encontrado')
  })
}

function obtenerListaPokemon(limite, desde) {
  if (_is('mock')) {
    // Ignoramos paginación en mock y devolvemos un set pequeño
    return _fetchJSON('mock/pokemon_list.json')
  }
  if (_is('local')) {
    var urlLocal =
      BASE_URL_POKEMON.replace(/\/$/, '') + '/pokemon?limit=' + encodeURIComponent(limite) + '&offset=' + encodeURIComponent(desde)
    return _fetchJSON(urlLocal)
  }
  var url = 'https://pokeapi.co/api/v2/pokemon?limit=' + limite + '&offset=' + desde
  return _fetchJSON(url).catch(function () {
    throw new Error('No se pudo obtener la lista')
  })
}

// PAÍSES
function obtenerPais(nombre) {
  if (_is('mock')) {
    // Filtra desde el listado completo
    return _fetchJSON('mock/countries_all.json').then(function (lista) {
      var q = String(nombre).toLowerCase()
      var filtrados = lista.filter(function (p) {
        return p.name && p.name.common && p.name.common.toLowerCase().indexOf(q) !== -1
      })
      if (!filtrados.length) throw new Error('País no encontrado')
      return filtrados
    })
  }
  if (_is('local')) {
    var urlLocal =
      BASE_URL_COUNTRIES.replace(/\/$/, '') + '/countries/search?name=' + encodeURIComponent(nombre)
    return _fetchJSON(urlLocal)
  }
  var url =
    'https://restcountries.com/v3.1/name/' +
    encodeURIComponent(nombre) +
    '?fields=name,flags,region,capital,population,cca2'
  return _fetchJSON(url).catch(function () {
    throw new Error('País no encontrado')
  })
}

function obtenerTodosPaises() {
  if (_is('mock')) {
    return _fetchJSON('mock/countries_all.json')
  }
  if (_is('local')) {
    var urlLocal = BASE_URL_COUNTRIES.replace(/\/$/, '') + '/countries'
    return _fetchJSON(urlLocal)
  }
  var url = 'https://restcountries.com/v3.1/all?fields=name,flags,region,capital,population,cca2'
  return _fetchJSON(url).catch(function () {
    throw new Error('No se pudo obtener la lista')
  })
}

// CLIMA
function obtenerClima(ciudad) {
  if (_is('mock')) {
    var safe = String(ciudad).replace(/\s+/g, '_')
    var ruta = 'mock/weather_' + encodeURIComponent(safe) + '.json'
    return _fetchJSON(ruta).catch(function () {
      return _fetchJSON('mock/weather_default.json')
    })
  }
  if (_is('local')) {
    var urlLocal = BASE_URL_FASTAPI.replace(/\/$/, '') + '/weather?city=' + encodeURIComponent(ciudad)
    return _fetchJSON(urlLocal)
  }
  // Modo público: llamada en dos pasos (geocoding + forecast) y normalizamos al mismo shape
  var urlGeo =
    'https://geocoding-api.open-meteo.com/v1/search?name=' +
    encodeURIComponent(ciudad) +
    '&count=1&language=es&format=json'
  return fetch(urlGeo)
    .then(function (respuestaGeo) {
      if (!respuestaGeo.ok) throw new Error('Ciudad no encontrada')
      return respuestaGeo.json()
    })
    .then(function (datosGeo) {
      if (!datosGeo.results || datosGeo.results.length === 0) throw new Error('Ciudad no encontrada')
      var coordenadas = datosGeo.results[0]
      var urlClima =
        'https://api.open-meteo.com/v1/forecast?latitude=' +
        coordenadas.latitude +
        '&longitude=' +
        coordenadas.longitude +
        '&current=temperature_2m,wind_speed_10m'
      return _fetchJSON(urlClima).then(function (datosClima) {
        return { coordenadas: coordenadas, clima: datosClima }
      })
    })
}

// FERIADOS
function obtenerFeriados(codigoPais, ano) {
  if (_is('mock')) {
    var ruta = 'mock/holidays_' + encodeURIComponent(String(codigoPais).toUpperCase()) + '_' + encodeURIComponent(ano) + '.json'
    return _fetchJSON(ruta).catch(function () {
      return _fetchJSON('mock/holidays_CL_2025.json')
    })
  }
  if (_is('local')) {
    var urlLocal =
      BASE_URL_FASTAPI.replace(/\/$/, '') + '/holidays/' + encodeURIComponent(String(codigoPais).toUpperCase()) + '/' + encodeURIComponent(ano)
    return _fetchJSON(urlLocal)
  }
  var url =
    'https://date.nager.at/api/v3/PublicHolidays/' + ano + '/' + encodeURIComponent(codigoPais)
  return _fetchJSON(url).catch(function () {
    throw new Error('No se pudo obtener feriados')
  })
}
