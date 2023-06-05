// Función para calcular la tabla de amortización
function calcularAmortizacion() {
  // Obtener los valores del formulario
  const montoPrestamo = parseFloat(
    document.getElementById('inputMontoPrestamo').value
  )
  const tasaInteres = parseFloat(
    document.getElementById('inputTasaInteres').value
  )
  const unidadInteres = parseInt(
    document.getElementById('inputGroupSelectUnidadInteres').value
  )
  const numeroPeriodos = parseInt(
    document.getElementById('inputNumeroPeriodos').value
  )
  const unidadPeriodos = parseInt(
    document.getElementById('inputGroupSelectUnidadPeriodos').value
  )
  const tableFrances = document.getElementById('amortizationTable')

  // Validar los valores de entrada
  if (isNaN(montoPrestamo) || isNaN(tasaInteres) || isNaN(numeroPeriodos)) {
    mostrarAlerta('Por favor, ingrese valores numéricos válidos.')
    return
  }

  limpiarAlerta()

  // Calcular la tasa de interés efectiva
  const tasaInteresEfectiva = tasaInteres / (unidadInteres * 100)

  // Calcular la cuota periódica
  const cuotaPeriodica =
    montoPrestamo *
    (tasaInteresEfectiva /
      (1 - Math.pow(1 + tasaInteresEfectiva, -numeroPeriodos)))

  tableFrances.innerHTML = `
      <tr>
      <th class="text-center">Periodo</th>
      <th class="text-center">Saldo inicial</th>
      <th class="text-center">Couta</th>
      <th class="text-center">Interés</th>
      <th class="text-center">Amortización</th>
      <th class="text-center">saldo Final</th>
      </tr>
      `

  // Calcular y mostrar los valores de cada período en la tabla
  let saldoInicial = montoPrestamo
  for (let periodo = 1; periodo <= numeroPeriodos; periodo++) {
    const intereses = saldoInicial * tasaInteresEfectiva
    const amortizacion = cuotaPeriodica - intereses
    const saldoFinal = saldoInicial - amortizacion

    tableFrances.innerHTML += `
    <tr>
    <td class="text-center">${periodo}</td>
    <td class="text-center">${saldoInicial.toFixed(2)}</td>
    <td class="text-center">${cuotaPeriodica.toFixed(2)}</td>
    <td class="text-center">${intereses.toFixed(2)}</td>
    <td class="text-center">${amortizacion.toFixed(2)}</td>
    <td class="text-center">${saldoFinal.toFixed(2)}</td>
    </tr>
    `
    tableFrances.style.display = 'table'
    saldoInicial = saldoFinal
  }
}

// Función para mostrar una alerta
function mostrarAlerta(mensaje) {
  const alertDiv = document.getElementById('alert')
  alertDiv.innerHTML = `<div class="alert alert-danger" role="alert">${mensaje}</div>`
  alertDiv.classList.remove('hide')
}

// Evento al hacer clic en el botón de Calcular
document
  .getElementById('btnValorFrances')
  .addEventListener('click', (event) => {
    event.preventDefault()
    calcularAmortizacion()
  })

function limpiarAlerta() {
  // Limpiar la alerta
  const divAlerta = document.getElementById('alert')
  divAlerta.innerHTML = ''
}
