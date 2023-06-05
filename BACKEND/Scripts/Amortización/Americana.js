const form = document.getElementById('formValorAmericano')
const inputMontoPrestamo = document.getElementById('inputMontoPrestamo')
const inputTasaInteres = document.getElementById('inputTasaInteres')
const inputNumeroPeriodos = document.getElementById('inputNumeroPeriodos')
const btnCalcular = document.getElementById('btnValorAmericano')
const table = document.getElementById('amortizationTable')
const tableTotales = document.getElementById('totalesTable')

// Agregar el evento de click al botón "Calcular"
btnCalcular.addEventListener('click', calcularAmortizacion)

function calcularAmortizacion(event) {
  event.preventDefault() // Evitar que el formulario se envíe

  if (
    inputMontoPrestamo.value === '' ||
    inputTasaInteres.value === '' ||
    inputNumeroPeriodos.value === ''
  ) {
    mostrarAlerta('Por favor, complete todos los campos', 'alert-danger')
    return // Detener la ejecución si algún campo está vacío
  }

  // Obtener los valores del formulario
  const montoPrestamo = parseFloat(inputMontoPrestamo.value)
  const tasaInteres = parseFloat(inputTasaInteres.value)
  const numeroPeriodos = parseInt(inputNumeroPeriodos.value)

  limpiarAlerta()
  // Calcular la cuota a pagar
  let cuota = montoPrestamo * (tasaInteres / 100)

  // Crear la tabla de amortización
  table.innerHTML = `
  <tr>
  <th class="text-center">Periodo</th>
  <th class="text-center">Capital Restante</th>
  <th class="text-center">Interés</th>
  <th class="text-center">Cuota a pagar</th>
  </tr>
  `

  let capitalRestante = montoPrestamo
  let totalInteres = 0
  let totalCuota = 0
  let periodo
  let interes

  for (periodo = 1; periodo <= numeroPeriodos; periodo++) {
    interes = capitalRestante * (tasaInteres / 100)

    if (periodo === numeroPeriodos) {
      // Último periodo: descontar el capital restante
      capitalRestante = 0
      cuota += montoPrestamo
    }

    // Agregar una fila a la tabla por cada periodo
    table.innerHTML += `
    <tr>
    <td class="text-center">${periodo}</td>
    <td class="text-center">${capitalRestante.toFixed(2)}</td>
    <td class="text-center">${interes.toFixed(2)}</td>
    <td class="text-center">${cuota.toFixed(2)}</td>
    </tr>
    `

    totalInteres += interes
    totalCuota += cuota
  }

  // Mostrar los totales en la tabla de totales adicionales
  tableTotales.innerHTML = ` 
    <tr>
    <th class="text-center">Prestamo</th>
    <td class="text-center">${montoPrestamo.toFixed(2)}</td>
    </tr>
    <tr>
    <th class="text-center">Total Interés</th>
    <td class="text-center">${totalInteres.toFixed(2)}</td>
    </tr>
    <tr>
    <th class="text-center">Total Cuotas pagadas</th>
    <td class="text-center">${totalCuota.toFixed(2)}</td>
    </tr>
    `

  // Mostrar el resultado
  table.style.display = 'table'
  tableTotales.style.dis = 'table'
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
