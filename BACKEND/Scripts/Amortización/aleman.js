const formAleman = document.getElementById('formValorAleman')
const inputMontoPrestamoAleman = document.getElementById('inputMontoPrestamo')
const inputTasaInteresAleman = document.getElementById('inputTasaInteres')
const inputNumeroPeriodosAleman = document.getElementById('inputNumeroPeriodos')
const btnCalcularAleman = document.getElementById('btnValorAleman')
const tableAleman = document.getElementById('amortizationTable')
const tableTotalesAleman = document.getElementById('totalesTable')

// Agregar el evento de click al botón "Calcular"
btnCalcularAleman.addEventListener('click', calcularAmortizacionAleman)

function calcularAmortizacionAleman(event) {
  event.preventDefault() // Evitar que el formulario se envíe

  // Validar que los campos no estén vacíos
  if (
    inputMontoPrestamoAleman.value === '' ||
    inputTasaInteresAleman.value === '' ||
    inputNumeroPeriodosAleman.value === ''
  ) {
    mostrarAlerta('Por favor, complete todos los campos', 'alert-danger')
    return // Detener la ejecución si algún campo está vacío
  }

  // Obtener los valores del formulario
  const montoPrestamo = parseFloat(inputMontoPrestamoAleman.value)
  const tasaInteres = parseFloat(inputTasaInteresAleman.value)
  const numeroPeriodos = parseInt(inputNumeroPeriodosAleman.value)

  limpiarAlerta()
  // Crear la tabla de amortización
  tableAleman.innerHTML = `
        <tr>
          <th class="text-center">Periodo</th>
          <th class="text-center">Capital Restante</th>
          <th class="text-center">Interés</th>
          <th class="text-center">Amortización</th>
          <th class="text-center">Cuota a pagar</th>
        </tr>
        `

  let capitalRestante = montoPrestamo
  let totalInteres = 0
  let totalAmortizacion = 0
  let totalCuota = 0
  let amortizacion = 0
  let interes = 0

  // Calcular la cuota a pagar
  let cuota = 0

  for (let periodo = 1; periodo <= numeroPeriodos; periodo++) {
    interes = capitalRestante * (tasaInteres / 100)
    amortizacion = montoPrestamo / numeroPeriodos

    capitalRestante -= amortizacion
    cuota = interes + amortizacion

    // Agregar una fila a la tabla por cada periodo
    tableAleman.innerHTML += `
          <tr>
            <td class="text-center">${periodo}</td>
            <td class="text-center">${capitalRestante.toFixed(2)}</td>
            <td class="text-center">${interes.toFixed(2)}</td>
            <td class="text-center">${amortizacion.toFixed(2)}</td>
            <td class="text-center">${cuota.toFixed(2)}</td>
          </tr>
        `

    totalInteres += interes
    totalAmortizacion += amortizacion
    totalCuota += cuota
  }

  // Mostrar los totales en la tabla de totales adicionales
  tableTotalesAleman.innerHTML = `
          <tr>
            <th class="text-center">Prestamo</th>
            <td class="text-center">${montoPrestamo.toFixed(2)}</td>
          </tr>
          <tr>
            <th class="text-center">Total Interés</th>
            <td class="text-center">${totalInteres.toFixed(2)}</td>
          </tr>
          <tr>
            <th class="text-center">Total Amortización</th>
            <td class="text-center">${totalAmortizacion.toFixed(2)}</td>
          </tr>
          <tr>
            <th class="text-center">Total Cuotas pagadas</th>
            <td class="text-center">${totalCuota.toFixed(2)}</td>
          </tr>
        `

  // Mostrar el resultado
  tableAleman.style.display = 'table'
  tableTotalesAleman.style.display = 'table'
}

function mostrarAlerta(mensaje, estilo) {
  // Crear el elemento para mostrar la alerta
  const alerta = document.createElement('div')
  alerta.className = `alert ${estilo}`
  alerta.textContent = mensaje

  // Insertar la alerta debajo del botón de calcular
  const divAlerta = document.getElementById('alert')
  divAlerta.innerHTML = '' // Limpiar cualquier alerta anterior
  divAlerta.appendChild(alerta)
}

function limpiarAlerta() {
  // Limpiar la alerta
  const divAlerta = document.getElementById('alert')
  divAlerta.innerHTML = ''
}
