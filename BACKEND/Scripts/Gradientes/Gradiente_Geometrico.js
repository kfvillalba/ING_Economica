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

function calcularValorFuturo() {
  // obtener los valores de los inputs y select
  let montoConstante = parseFloat(
    document.getElementById("inputMontoConstante").value
  );
  let PorcentajeCrecimiento = parseFloat(
    document.getElementById("inputPorcentajeCrecimiento").value / 100
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
        if (tasa != PorcentajeCrecimiento) {
          resultado =
            (montoConstante / (tasa - PorcentajeCrecimiento)) *
            (Math.pow(1 + tasa, periodos) -
              Math.pow(1 + PorcentajeCrecimiento, periodos));
          break;
        } else {
          resultado =
            periodos * montoConstante * Math.pow(1 + tasa, periodos - 1);
          break;
        }
      case "2":
        resultado =
          (montoConstante / (tasa + PorcentajeCrecimiento)) *
          (Math.pow(1 + tasa, periodos) -
            Math.pow(1 - PorcentajeCrecimiento, periodos));
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
    document.getElementById("inputPorcentajeCrecimiento").value / 100
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
  let a, b, c;

  // Funcion
  console.log(periodos);
  if (validarCampos()) {
    switch (tipoGradiente) {
      case "1":
        if (tasa === porcentajeCrecimiento) {
          resultado = (periodos * cuotaPeriodica) / (1 + tasa);
          break;
        } else {
          a = 1 + porcentajeCrecimiento;
          b = 1 + tasa;
          c = a / b;
          resultado =
            (cuotaPeriodica / (tasa - porcentajeCrecimiento)) *
            (1 - Math.pow(c, periodos));
          break;
        }
      case "2":
        a = 1 - porcentajeCrecimiento;
        b = 1 + tasa;
        c = a / b;
        resultado =
          (cuotaPeriodica / (tasa + porcentajeCrecimiento)) *
          (1 - Math.pow(c, periodos));
        break;

        break;
    }

    resulValorPresenteSimple.value = resultado.toFixed(2);
  }
}

export default {
  calcularValorFuturo,
  calcularValorPresente,
};
