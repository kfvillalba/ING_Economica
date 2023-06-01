function transformarTasa(tiempoActual, tasaActual, tiempoDestino) {
  return parseFloat(
    Math.exp([(tiempoActual * Math.log(1 + tasaActual)) / tiempoDestino]) - 1
  );
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
  let PorcentajeCrecimiento = parseFloat(
    document.getElementById("inputPorcentajeCrecimiento").value / 100
  );
  let periodos = parseFloat(
    document.getElementById("inputNumeroPeriodos").value
  );
  let tasaActual = parseFloat(
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
  let tasa = transformarTasa(tiempoActual, tasaActual, tiempoDestino);
  let alerta = document.getElementById("alert");
  let resultado;

  // Funcion

  if (validarCampos()) {
    switch (tipoGradiente) {
      case "1":
        resultado =
          (montoConstante / (tasa - PorcentajeCrecimiento)) *
          (Math.pow(1 + tasa, periodos) -
            Math.pow(1 + PorcentajeCrecimiento, periodos));
        break;
      case "2":
        resultado =
          (montoConstante / (tasa - PorcentajeCrecimiento)) *
          (Math.pow(1 + tasa, periodos) +
            Math.pow(1 + PorcentajeCrecimiento, periodos));
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
  let periodos = parseFloat(
    document.getElementById("inputNumeroPeriodos").value
  );
  let tasaActual = parseFloat(
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
  let tasa = transformarTasa(tiempoActual, tasaActual, tiempoDestino);
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

function calcularValorPresente() {
  // obtener los valores de los inputs y select
  let cuotaPeriodica = parseFloat(
    document.getElementById("inputMontoConstante").value
  );
  let porcentajeCrecimiento = parseFloat(
    document.getElementById("inputPorcentajeCrecimiento").value
  );
  let periodos = parseFloat(
    document.getElementById("inputNumeroPeriodos").value
  );
  let tasaActual = parseFloat(
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
  let tasa = transformarTasa(tiempoActual, tasaActual, tiempoDestino);
  let alerta = document.getElementById("alert");
  let resultado;

  // Funcion

  if (validarCampos()) {
    switch (tipoGradiente) {
      case "1":
        if (tasa == porcentajeCrecimiento) {
          resultado = (periodos * cuotaPeriodica) / (1 + tasa);
          break;
        } else {
          resultado =
            (cuotaPeriodica / (tasa - porcentajeCrecimiento)) *
            (1 - Math.pow(c, periodos));
          break;
        }
      case "2":
        if (tasa == porcentajeCrecimiento) {
          resultado = (periodos * cuotaPeriodica) / (1 - tasa);
          break;
        } else {
          resultado =
            (cuotaPeriodica / (tasa - porcentajeCrecimiento)) *
            (1 - Math.pow(c, periodos));
          break;
        }

        break;
    }

    resulValorPresenteSimple.value = resultado.toFixed(2);
  }
}

export default {
  calcularValorFuturo,
  calcularCuotaPeriodica,
  calcularValorPresente,
};
