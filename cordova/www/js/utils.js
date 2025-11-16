var toastTimer = null

function marcarCargaEnProgreso(contenedor) {
  if (contenedor) {
    contenedor.setAttribute('aria-busy', 'true')
  }
}

function marcarCargaCompleta(contenedor) {
  if (contenedor) {
    contenedor.removeAttribute('aria-busy')
  }
}

function obtenerElemento(selector) {
  return document.querySelector(selector)
}

function formatearNumero(numero) {
  return numero.toLocaleString('es-CL')
}

function mostrarToast(tipo, mensaje, duracion) {
  var contenedorToast = document.getElementById('app-toast')
  if (!contenedorToast) return

  var clasesBase =
    'mx-auto mt-2 w-[calc(100%-2rem)] max-w-3xl rounded-lg border px-4 py-2 text-sm shadow transition-all'
  var clasesTipo = {
    info: 'border-blue-200 bg-blue-50 text-blue-700',
    success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    error: 'border-rose-200 bg-rose-50 text-rose-700',
  }

  contenedorToast.className = clasesBase + ' ' + (clasesTipo[tipo] || clasesTipo.info)
  contenedorToast.textContent = mensaje
  contenedorToast.classList.remove('hidden')

  if (toastTimer) {
    clearTimeout(toastTimer)
    toastTimer = null
  }

  if (duracion !== 0) {
    toastTimer = setTimeout(function () {
      contenedorToast.classList.add('hidden')
    }, duracion || 4000)
  }
}

function mostrarEstadoCarga(contenedor, mensaje) {
  marcarCargaEnProgreso(contenedor)
  contenedor.innerHTML =
    '<div class="flex flex-col items-center justify-center gap-3 py-8 text-gray-500">' +
    '<span class="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-200 border-t-blue-500 animate-spin"></span>' +
    '<span class="text-sm">' +
    (mensaje || 'Cargando...') +
    '</span>' +
    '</div>'
}

function mostrarError(contenedor, mensaje) {
  var texto = mensaje || 'No se pudo cargar la información'
  contenedor.innerHTML =
    '<div class="flex flex-col items-center justify-center gap-2 py-8 text-center text-rose-600">' +
    '<span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-600">&#9888;</span>' +
    '<span class="text-sm font-semibold">' +
    texto +
    '</span>' +
    '</div>'
  mostrarToast('error', texto)
  marcarCargaCompleta(contenedor)
}

function crearTarjetaPequena(contenido) {
  var div = document.createElement('div')
  div.className = 'card-mini'
  div.innerHTML = contenido
  return div
}

function agregarEventoEnter(inputId, botonId) {
  var input = document.getElementById(inputId)
  var boton = document.getElementById(botonId)
  if (input && boton) {
    input.addEventListener('keydown', function (evento) {
      if (evento.key === 'Enter') {
        boton.click()
      }
    })
  }
}

function configurarBotonCargarMas(botonId, textoNormal, textoEspera, callback) {
  var boton = document.getElementById(botonId)
  if (boton) {
    boton.textContent = textoNormal
    boton.disabled = false
    boton.onclick = function () {
      boton.innerHTML =
        '<span class="inline-flex items-center gap-2"><span class="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white"></span>' +
        '<span>' +
        textoEspera +
        '</span></span>'
      boton.disabled = true
      callback()
    }
  }
}

function crearTarjetaConBoton(contenidoHtml, clasesTarjeta, textoBoton, callbackBoton) {
  var tarjetaDiv = document.createElement('div')
  tarjetaDiv.className = clasesTarjeta
  tarjetaDiv.innerHTML = contenidoHtml

  var boton = document.createElement('button')
  boton.textContent = textoBoton
  boton.className = 'mt-2 px-3 py-1 bg-blue-600 text-white rounded text-sm'
  boton.onclick = callbackBoton

  tarjetaDiv.appendChild(boton)
  return tarjetaDiv
}
