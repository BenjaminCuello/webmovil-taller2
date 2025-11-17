function cargarPaginaPrincipal() {
  if (typeof cargarPokemonLanding === 'function') cargarPokemonLanding()
  if (typeof cargarPaisesLanding === 'function') cargarPaisesLanding()
  if (typeof cargarClimaLanding === 'function') cargarClimaLanding()
  if (typeof cargarFeriadosLanding === 'function') cargarFeriadosLanding()
}

function mostrarLanding() {
  var landing = document.getElementById('vista-landing')
  var detalle = document.getElementById('vista-detalle')
  if (landing) landing.classList.remove('hidden')
  if (detalle) detalle.classList.add('hidden')
}

function mostrarDetalle() {
  var landing = document.getElementById('vista-landing')
  var detalle = document.getElementById('vista-detalle')
  if (landing) landing.classList.add('hidden')
  if (detalle) detalle.classList.remove('hidden')
}

function esListaRecursoActual(recurso) {
  if (!recurso) return false
  if (recurso === 'pokemon') return !!document.getElementById('pokemon-grid')
  if (recurso === 'paises') return !!document.getElementById('paises-grid')
  if (recurso === 'clima') return !!document.getElementById('clima-grid')
  if (recurso === 'feriados') return !!document.getElementById('feriados-container')
  return false
}

function irADetalle(recurso) {
  history.pushState({ recurso: recurso }, '', '?recurso=' + encodeURIComponent(recurso))
  mostrarDetalle()
  if (typeof cargarPaginaDetalle === 'function') {
    cargarPaginaDetalle()
  }
}

function routeFromURL() {
  var params = new URLSearchParams(location.search)
  var recurso = params.get('recurso')
  if (recurso) {
    mostrarDetalle()
    if (typeof cargarPaginaDetalle === 'function') {
      cargarPaginaDetalle()
    }
  } else {
    mostrarLanding()
  }
}

document.addEventListener('click', function (e) {
  var a = e.target.closest('.ir-detalle')
  if (a) {
    e.preventDefault()
    var recurso = a.dataset.recurso
    if (recurso) irADetalle(recurso)
  }
})

var btnVolver = document.getElementById('volver-landing')
if (btnVolver) {
  btnVolver.addEventListener('click', function () {
    var params = new URLSearchParams(window.location.search)
    var recurso = params.get('recurso')
    var enLista = esListaRecursoActual(recurso)

    if (recurso && !enLista && typeof cargarPaginaDetalle === 'function') {
      mostrarDetalle()
      cargarPaginaDetalle()
      return
    }

    history.pushState({}, '', window.location.pathname)
    mostrarLanding()
  })
}

var tituloHeader = document.querySelector('header h1')
if (tituloHeader) {
  tituloHeader.style.cursor = 'pointer'
  tituloHeader.addEventListener('click', function () {
    history.pushState({}, '', location.pathname)
    mostrarLanding()
  })
}

window.addEventListener('popstate', routeFromURL)

function inicializar() {
  cargarPaginaPrincipal()
  routeFromURL()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializar)
} else {
  inicializar()
}
