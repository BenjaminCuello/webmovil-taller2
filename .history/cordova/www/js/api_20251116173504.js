function _fetchJSON(url, options) {
  return fetch(url, options)
    .then(function (r) {
      if (!r.ok) {
        console.error('[api] Respuesta HTTP no OK', r.status, 'para URL', url);
        throw new Error('HTTP ' + r.status);
      }
      return r.json();
    })
    .catch(function (error) {
      console.error('[api] Error de red o parseo para URL', url, error);
      throw error;
    });
}

// POKÉMON - API NestJS local
function obtenerPokemon(nombreOId) {
  var url =
    BASE_URL_POKEMON.replace(/\/$/, '') + '/pokemon/' + encodeURIComponent(nombreOId);
  return _fetchJSON(url).catch(function (error) {
    console.error('[api] Error en obtenerPokemon', url, error);
    throw new Error('Pokémon no encontrado');
  });
}

function obtenerListaPokemon(limite, desde) {
  var url =
    BASE_URL_POKEMON.replace(/\/$/, '') +
    '/pokemon?limit=' +
    encodeURIComponent(limite) +
    '&offset=' +
    encodeURIComponent(desde);
  return _fetchJSON(url).catch(function (error) {
    console.error('[api] Error en obtenerListaPokemon', url, error);
    throw new Error('No se pudo obtener la lista de Pokémon');
  });
}

// PAÍSES - API Express local
function obtenerPais(nombre) {
  var url =
    BASE_URL_COUNTRIES.replace(/\/$/, '') +
    '/countries/search?name=' +
    encodeURIComponent(nombre);
  return _fetchJSON(url).catch(function (error) {
    console.error('[api] Error en obtenerPais', url, error);
    throw new Error('País no encontrado');
  });
}

function obtenerTodosPaises() {
  var url = BASE_URL_COUNTRIES.replace(/\/$/, '') + '/countries';
  return _fetchJSON(url).catch(function (error) {
    console.error('[api] Error en obtenerTodosPaises', url, error);
    throw new Error('No se pudo obtener la lista de países');
  });
}

// CLIMA - API FastAPI local
function obtenerClima(ciudad) {
  var url = BASE_URL_FASTAPI.replace(/\/$/, '') + '/weather?city=' + encodeURIComponent(ciudad);
  return _fetchJSON(url).catch(function (error) {
    console.error('[api] Error en obtenerClima', url, error);
    throw new Error('No se pudo obtener la información del clima');
  });
}

// FERIADOS - API FastAPI local
function obtenerFeriados(codigoPais, ano) {
  var url =
    BASE_URL_FASTAPI.replace(/\/$/, '') +
    '/holidays/' +
    encodeURIComponent(String(codigoPais).toUpperCase()) +
    '/' +
    encodeURIComponent(ano);
  return _fetchJSON(url).catch(function (error) {
    console.error('[api] Error en obtenerFeriados', url, error);
    throw new Error('No se pudieron obtener los feriados');
  });
}
