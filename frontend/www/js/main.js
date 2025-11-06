function cargarPaginaPrincipal() {
  cargarPokemonLanding()
  cargarPaisesLanding()
  cargarClimaLanding()
  cargarFeriadosLanding()
}

function actualizarIndicadorModo() {
  var indicador = document.getElementById('mode-indicator')
  if (!indicador) return

  var modo =
    typeof window !== 'undefined' && typeof window.obtenerModoActual === 'function'
      ? window.obtenerModoActual()
      : typeof window !== 'undefined' && window.INFO_MOVIL_MODE
        ? window.INFO_MOVIL_MODE
        : typeof MODE !== 'undefined'
          ? MODE
          : 'public'
  if (typeof console !== 'undefined') {
    console.log('[InfoMóvil] modo activo:', modo)
  }
  var textos = {
    public: 'APIs públicas',
    local: 'APIs locales',
    mock: 'Datos mock',
  }
  var clases = {
    public: 'bg-emerald-500/15 border-emerald-300/40 text-emerald-50',
    local: 'bg-amber-500/15 border-amber-300/40 text-amber-50',
    mock: 'bg-slate-500/20 border-slate-300/40 text-slate-100',
  }

  var baseClasses =
    'inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition-colors'
  var claseModo = clases[modo] || clases.public
  indicador.className = baseClasses + ' ' + claseModo
  indicador.textContent = 'Modo: ' + (textos[modo] || modo)
  indicador.setAttribute('data-mode', modo)

  if (document.body) {
    document.body.setAttribute('data-mode', modo)
  }
}

function configurarSelectorModo() {
  var selector = document.getElementById('mode-select')
  if (!selector) return

  var modoActual =
    typeof window !== 'undefined' && typeof window.obtenerModoActual === 'function'
      ? window.obtenerModoActual()
      : typeof MODE !== 'undefined'
        ? MODE
        : 'public'

  if (selector.value !== modoActual) {
    selector.value = modoActual
  }

  selector.addEventListener('change', function (evento) {
    var nuevoModo = evento.target.value
    if (typeof window !== 'undefined' && typeof window.establecerModo === 'function') {
      window.establecerModo(nuevoModo, true)
    }
  })
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

function irADetalle(recurso) {
  history.pushState({ recurso: recurso }, '', '?recurso=' + encodeURIComponent(recurso))
  mostrarDetalle()
  if (typeof cargarPaginaDetalle === 'function') cargarPaginaDetalle()
}

function routeFromURL() {
  var params = new URLSearchParams(location.search)
  var recurso = params.get('recurso')
  if (recurso) {
    mostrarDetalle()
    if (typeof cargarPaginaDetalle === 'function') cargarPaginaDetalle()
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
    history.pushState({}, '', location.pathname)
    mostrarLanding()
  })
}

window.addEventListener('popstate', routeFromURL)

function inicializar() {
  actualizarIndicadorModo()
  configurarSelectorModo()
  cargarPaginaPrincipal()
  routeFromURL()
}

if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', actualizarIndicadorModo)
  window.actualizarIndicadorModo = actualizarIndicadorModo
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializar)
} else {
  inicializar()
}
