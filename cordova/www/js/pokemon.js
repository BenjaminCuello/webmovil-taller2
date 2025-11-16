var offsetPokemon = 0;

function cargarPokemonLanding() {
  var contenedor = document.getElementById('contenedor-pokemon');
  if (!contenedor) return;

  mostrarEstadoCarga(contenedor, 'Cargando Pokémon destacados...');

  obtenerListaPokemon(6, 0)
    .then(function (listado) {
      if (!listado || !Array.isArray(listado.results) || !listado.results.length) {
        contenedor.innerHTML =
          '<p class="text-gray-500 text-sm">No hay Pokémon en la base de datos local. Pídele al equipo backend que ejecute el seed.</p>';
        marcarCargaCompleta(contenedor);
        return;
      }

      var promesas = listado.results.map(function (pokemon) {
        return obtenerPokemon(pokemon.name);
      });

      Promise.all(promesas)
        .then(function (detalles) {
          contenedor.innerHTML = '';
          detalles
            .filter(Boolean)
            .sort(function (a, b) {
              return a.id - b.id;
            })
            .forEach(function (datosPokemon) {
              var sprite =
                (datosPokemon.sprites && datosPokemon.sprites.front_default) ||
                (datosPokemon.sprites && datosPokemon.sprites.back_default) ||
                '';
              var html =
                '<div class="flex items-center gap-2">' +
                '<img src="' +
                sprite +
                '" alt="' +
                datosPokemon.name +
                '" class="w-9 h-9" />' +
                '<strong class="capitalize">' +
                datosPokemon.name +
                '</strong>' +
                '</div>' +
                '<span class="text-xs text-gray-600">#' +
                datosPokemon.id +
                '</span>';
              contenedor.appendChild(crearTarjetaPequena(html));
            });
          marcarCargaCompleta(contenedor);
        })
        .catch(function () {
          mostrarError(contenedor, 'No se pudieron cargar los Pokémon destacados');
        });
    })
    .catch(function () {
      mostrarError(contenedor, 'No se pudieron cargar los Pokémon destacados');
    });
}

function buscarPokemon() {
  var input = document.getElementById('poke-q');
  var status = document.getElementById('poke-status');
  var contenedor = document.getElementById('contenedor-detalle');

  var consulta = input.value.trim().toLowerCase();
  if (!consulta) {
    status.textContent = 'Por favor ingresa un nombre o ID';
    return;
  }

  status.textContent = 'Buscando...';
  mostrarEstadoCarga(contenedor);

  obtenerPokemon(consulta)
    .then(function (pokemon) {
      status.textContent = 'Pokémon encontrado: ' + pokemon.name;

      var tipos = pokemon.types
        .map(function (t) {
          return t.type.name;
        })
        .join(', ');

      var estadisticas = pokemon.stats
        .map(function (stat) {
          return (
            '<div class="flex justify-between">' +
            '<span class="capitalize">' +
            stat.stat.name.replace('-', ' ') +
            ':</span>' +
            '<span class="font-medium">' +
            stat.base_stat +
            '</span>' +
            '</div>'
          );
        })
        .join('');

      var imagen =
        pokemon.sprites.other &&
        pokemon.sprites.other['official-artwork'] &&
        pokemon.sprites.other['official-artwork'].front_default
          ? pokemon.sprites.other['official-artwork'].front_default
          : pokemon.sprites.front_default || '';

      contenedor.innerHTML =
        '<div class="grid grid-cols-1 md:grid-cols-2 gap-6">' +
        '<div class="text-center">' +
        '<img src="' +
        imagen +
        '" alt="' +
        pokemon.name +
        '" class="w-48 h-48 mx-auto object-contain">' +
        '</div>' +
        '<div class="space-y-4">' +
        '<div>' +
        '<h3 class="text-2xl font-bold capitalize">' +
        pokemon.name +
        '</h3>' +
        '<p class="text-gray-600">#' +
        pokemon.id.toString().padStart(3, '0') +
        '</p>' +
        '</div>' +
        '<div>' +
        '<h4 class="font-semibold text-gray-700">Tipo(s):</h4>' +
        '<p class="capitalize">' +
        tipos +
        '</p>' +
        '</div>' +
        '<div>' +
        '<h4 class="font-semibold text-gray-700">Altura / Peso:</h4>' +
        '<p>' +
        pokemon.height / 10 +
        ' m / ' +
        pokemon.weight / 10 +
        ' kg</p>' +
        '</div>' +
        '<div>' +
        '<h4 class="font-semibold text-gray-700">Estadísticas base:</h4>' +
        '<div class="space-y-2 text-sm">' +
        estadisticas +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
      marcarCargaCompleta(contenedor);
    })
    .catch(function () {
      status.textContent = 'Pokémon no encontrado. Intenta con otro nombre o ID';
      mostrarError(contenedor);
    });
}

function mostrarTodosPokemon() {
  offsetPokemon = 0;
  cargarPokemonGrid(true);
}

function cargarPokemonGrid(esNuevo) {
  var contenedor = document.getElementById('contenedor-detalle');

  if (esNuevo) {
    mostrarEstadoCarga(contenedor, 'Cargando Pokémon...');
  }

  obtenerListaPokemon(20, offsetPokemon)
    .then(function (listado) {
      if (esNuevo) {
        contenedor.innerHTML =
          '<h3 class="text-xl font-bold mb-4">Pokémon (mostrando desde #' +
          (offsetPokemon + 1) +
          '):</h3>' +
          '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" id="pokemon-grid"></div>' +
          '<div class="text-center mt-6"><button id="cargar-mas-pokemon" class="px-4 py-2 bg-green-600 text-white rounded">Cargar más Pokémon</button></div>';
      }

      var grid = document.getElementById('pokemon-grid');
      if (!grid) return;

      var resultados = Array.isArray(listado.results) ? listado.results : [];
      if (!resultados.length) {
        var botonMasVacio = document.getElementById('cargar-mas-pokemon');
        if (botonMasVacio) botonMasVacio.style.display = 'none';
        marcarCargaCompleta(contenedor);
        return;
      }

      var promesas = resultados.map(function (pokemon) {
        return obtenerPokemon(pokemon.name);
      });

      Promise.all(promesas)
        .then(function (detalles) {
          detalles
            .filter(Boolean)
            .sort(function (a, b) {
              return a.id - b.id;
            })
            .forEach(function (datosPokemon) {
              var sprite =
                (datosPokemon.sprites && datosPokemon.sprites.front_default) ||
                (datosPokemon.sprites && datosPokemon.sprites.back_default) ||
                '';
              var contenidoHtml =
                '<img src="' +
                sprite +
                '" alt="' +
                datosPokemon.name +
                '" class="w-24 h-24 mx-auto">' +
                '<h4 class="font-bold capitalize mt-2">' +
                datosPokemon.name +
                '</h4>' +
                '<p class="text-gray-600">#' +
                datosPokemon.id +
                '</p>';

              var tarjeta = crearTarjetaConBoton(
                contenidoHtml,
                'border rounded p-4 text-center',
                'Ver detalles',
                (function (nombre) {
                  return function () {
                    buscarPokemonEspecifico(nombre);
                  };
                })(datosPokemon.name),
              );

              grid.appendChild(tarjeta);
            });

          var botonMas = document.getElementById('cargar-mas-pokemon');
          var total =
            typeof listado.count === 'number'
              ? listado.count
              : offsetPokemon + detalles.length;
          var siguienteOffset = offsetPokemon + 20;

          if (botonMas) {
            if (siguienteOffset >= total || detalles.length === 0) {
              botonMas.style.display = 'none';
            } else {
              configurarBotonCargarMas(
                'cargar-mas-pokemon',
                'Cargar más Pokémon',
                'Cargando...',
                function () {
                  offsetPokemon += 20;
                  cargarPokemonGrid(false);
                },
              );
            }
          }

          marcarCargaCompleta(contenedor);
        })
        .catch(function () {
          mostrarError(contenedor, 'Error al cargar los Pokémon');
        });
    })
    .catch(function () {
      mostrarError(contenedor, 'Error al cargar los Pokémon');
    });
}

function buscarPokemonEspecifico(nombre) {
  document.getElementById('poke-q').value = nombre;
  buscarPokemon();
}


