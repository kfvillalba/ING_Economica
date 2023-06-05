function convertirUnidadTiempo(cantidad, unidadActual, unidadDestino) {
  const conversion = {
    años: {
      meses: 12,
      bimestres: 6,
      trimestres: 4,
      semestres: 2,
      años: 1,
    },
    semestres: {
      años: 0.5,
      meses: 6,
      bimestres: 3,
      trimestres: 2,
      semestres: 1,
    },
    trimestres: {
      años: 0.25,
      meses: 3,
      bimestres: 1.5,
      semestres: 0.5,
      trimestres: 1,
    },
    bimestres: {
      años: 1 / 6,
      meses: 2,
      trimestres: 0.6666666666666666,
      semestres: 1 / 3,
      bimestres: 1,
    },
    meses: {
      años: 1 / 12,
      bimestres: 1 / 2,
      trimestres: 1 / 3,
      semestres: 1 / 6,
      meses: 1,
    },
  };

  if (!(unidadActual in conversion) || !(unidadDestino in conversion)) {
    throw new Error("Unidad no válida");
  }

  const equivalente = cantidad * conversion[unidadActual][unidadDestino];

  return equivalente;
}

function validarCampos() {
  // obtener los valores de los inputs y select
  let formulario = document.getElementById("formValorPresenteSimple");
  let alerta = document.getElementById("alert");
  let inputs = formulario.getElementsByTagName("input");
  let flag = 0;

  for (let index = 0; index < inputs.length - 1; ++index) {
    if (inputs[index].value == "") {
      flag++;
      alerta.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert" >
        <strong>ERROR!</strong> Falta informacion.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
      return false;
    } else if (flag == 0) {
      alerta.innerHTML = "";
      return true;
    }
  }
}

function calcularValorFuturo() {
  // obtener los valores de los inputs y select
  let montoConstante = parseFloat(
    document.getElementById("inputMontoConstante").value
  );
  let montoCrecimiento = parseFloat(
    document.getElementById("inputMontoCrecimiento").value
  );
  let periodosActual = parseFloat(
    document.getElementById("inputNumeroPeriodos").value
  );
  let tasa = parseFloat(
    document.getElementById("inputTasaInteres").value / 100
  );
  let resulValorPresenteSimple = document.getElementById("inputResultado");
  let tiempoActual = document.getElementById(
    "inputGroupSelectUnidadInteres"
  ).value;
  let tiempoDestino = document.getElementById(
    "inputGroupSelectUnidadPeriodos"
  ).value;
  let tipoGradiente = document.getElementById(
    "inputGroupSelectTipoGradiente"
  ).value;
  let periodos = parseFloat(
    convertirUnidadTiempo(periodosActual, tiempoDestino, tiempoActual)
  );
  let alerta = document.getElementById("alert");
  let resultado;

  // Funcion

  if (validarCampos()) {
    switch (tipoGradiente) {
      case "1":
        resultado =
          montoConstante * ((Math.pow(1 + tasa, periodos) - 1) / tasa) +
          (montoCrecimiento / tasa) *
            ((Math.pow(1 + tasa, periodos) - 1) / tasa - periodos);
        break;
      case "2":
        resultado =
          montoConstante * ((Math.pow(1 + tasa, periodos) - 1) / tasa) -
          (montoCrecimiento / tasa) *
            ((Math.pow(1 + tasa, periodos) - 1) / tasa - periodos);
        break;
    }

    resulValorPresenteSimple.value = resultado.toFixed(2);
  }
}

function calcularCuotaPeriodica() {
  // obtener los valores de los inputs y select
  let valor = parseFloat(document.getElementById("inputValor").value);
  let montoCrecimiento = parseFloat(
    document.getElementById("inputMontoCrecimiento").value
  );
  let periodosActual = parseFloat(
    document.getElementById("inputNumeroPeriodos").value
  );
  let tasa = parseFloat(
    document.getElementById("inputTasaInteres").value / 100
  );
  let resulValorPresenteSimple = document.getElementById("inputResultado");
  let tiempoActual = document.getElementById(
    "inputGroupSelectUnidadInteres"
  ).value;
  let tiempoDestino = document.getElementById(
    "inputGroupSelectUnidadPeriodos"
  ).value;
  let tipoGradiente = document.getElementById(
    "inputGroupSelectTipoGradiente"
  ).value;
  let tipoValor = document.getElementById("inputGroupSelectTipoValor").value;
  let periodos = parseFloat(
    convertirUnidadTiempo(periodosActual, tiempoDestino, tiempoActual)
  );
  let alerta = document.getElementById("alert");
  let resultado;

  let a, b, c, d, e, f, g;

  // Funcion

  if (validarCampos()) {
    switch (tipoValor) {
      case "1":
        switch (tipoGradiente) {
          case "1":
            a = (Math.pow(1 + tasa, periodos) - 1) / tasa;
            b = a - periodos;
            c = valor - (montoCrecimiento / tasa) * b;
            resultado = c / a;
            console.log(a, b, c, resultado);
            break;
          case "2":
            a = (Math.pow(1 + tasa, periodos) - 1) / tasa;
            b = a - periodos;
            c = valor + (montoCrecimiento / tasa) * b;
            resultado = c / a;
            break;
        }

        break;
      case "2":
        switch (tipoGradiente) {
          case "1":
            a = (1 - Math.pow(1 + tasa, -periodos)) / tasa;
            b = periodos / Math.pow(1 + tasa, periodos);
            c = a - b;
            d = valor - (montoCrecimiento / tasa) * c;
            resultado = d / a;
            break;

          case "2":
            a = (1 - Math.pow(1 + tasa, -periodos)) / tasa;
            b = periodos / Math.pow(1 + tasa, periodos);
            c = a - b;
            d = valor + (montoCrecimiento / tasa) * c;
            resultado = d / a;
            break;
        }
        break;
    }

    resulValorPresenteSimple.value = resultado.toFixed(2);
  }
}
function calcularGradiente() {
  // obtener los valores de los inputs y select
  let valor = parseFloat(document.getElementById("inputValor").value);
  let montoConstante = parseFloat(
    document.getElementById("inputMontoCrecimiento").value
  );
  let periodosActual = parseFloat(
    document.getElementById("inputNumeroPeriodos").value
  );
  let tasa = parseFloat(
    document.getElementById("inputTasaInteres").value / 100
  );
  let resulValorPresenteSimple = document.getElementById("inputResultado");
  let tiempoActual = document.getElementById(
    "inputGroupSelectUnidadInteres"
  ).value;
  let tiempoDestino = document.getElementById(
    "inputGroupSelectUnidadPeriodos"
  ).value;
  let tipoGradiente = document.getElementById(
    "inputGroupSelectTipoGradiente"
  ).value;
  let tipoValor = document.getElementById("inputGroupSelectTipoValor").value;
  let periodos = parseFloat(
    convertirUnidadTiempo(periodosActual, tiempoDestino, tiempoActual)
  );
  let alerta = document.getElementById("alert");
  let resultado;

  let a, b, c, d, e, f, g;

  // Funcion

  if (validarCampos()) {
    switch (tipoValor) {
      case "1":
        switch (tipoGradiente) {
          case "1":
            a = Math.pow(1 + tasa, periodos) - 1;
            b = a / tasa;
            c = montoConstante * b;
            d = valor + c;
            e = b - periodos;
            f = (1 / tasa) * e;
            break;
          case "2":
            a = Math.pow(1 + tasa, periodos) - 1;
            b = a / tasa;
            c = montoConstante * b;
            d = valor - c;
            e = b - periodos;
            f = (1 / tasa) * e;
            break;
        }

        break;
      case "2":
        switch (tipoGradiente) {
          case "1":
            a = 1 - Math.pow(1 + tasa, -periodos);
            b = a / tasa;
            c = montoConstante * b;
            d = valor + c;
            e = periodos / Math.pow(1 + tasa, periodos);
            f = b - e;
            g = (1 / tasa) * f;

            resultado = d / g;
            break;

          case "2":
            a = 1 - Math.pow(1 + tasa, -periodos);
            b = a / tasa;
            c = montoConstante * b;
            d = valor - c;
            e = periodos / Math.pow(1 + tasa, periodos);
            f = b - e;
            g = (1 / tasa) * f;

            resultado = d / g;
            break;
        }
        break;
    }

    resulValorPresenteSimple.value = resultado.toFixed(2);
  }
}

function calcularValorPresente() {
  // obtener los valores de los inputs y select
  let cuotaPeriodica = parseFloat(
    document.getElementById("inputMontoConstante").value
  );
  let montoCrecimiento = parseFloat(
    document.getElementById("inputMontoCrecimiento").value
  );
  let periodosActual = parseFloat(
    document.getElementById("inputNumeroPeriodos").value
  );
  let tasa = parseFloat(
    document.getElementById("inputTasaInteres").value / 100
  );
  let resulValorPresenteSimple = document.getElementById("inputResultado");
  let tiempoActual = document.getElementById(
    "inputGroupSelectUnidadInteres"
  ).value;
  let tiempoDestino = document.getElementById(
    "inputGroupSelectUnidadPeriodos"
  ).value;
  let tipoGradiente = document.getElementById(
    "inputGroupSelectTipoGradiente"
  ).value;
  let periodos = parseFloat(
    convertirUnidadTiempo(periodosActual, tiempoDestino, tiempoActual)
  );
  let alerta = document.getElementById("alert");
  let resultado;

  let c;
  let a = (1 - Math.pow(1 + tasa, -periodos)) / tasa;
  let b = periodos / Math.pow(1 + tasa, periodos);

  // Funcion

  if (validarCampos()) {
    switch (tipoGradiente) {
      case "1":
        c = a - b;
        resultado = cuotaPeriodica * a + (montoCrecimiento / tasa) * c;
        break;
      case "2":
        c = a - b;
        resultado = cuotaPeriodica * a - (montoCrecimiento / tasa) * c;
        break;
    }

    resulValorPresenteSimple.value = resultado.toFixed(2);
  }
}

export default {
  calcularValorFuturo,
  calcularCuotaPeriodica,
  calcularValorPresente,
  calcularGradiente,
};
