function calcularValorPresente() {
  // obtener los valores de los inputs y select
  let valorFuturo = document.getElementById("inputValorFuturo").value;
  let resulValorPresenteSimple = document.getElementById("inputResultado");
  let periodos = document.getElementById("inputNumeroPeriodos").value;
  let tasaActual = document.getElementById("inputTasaInteres").value / 100;
  let tiempoActual = document.getElementById(
    "inputGroupSelectUnidadInteres"
  ).value;
  let tiempoDestino = document.getElementById(
    "inputGroupSelectUnidadPeriodos"
  ).value;
  let tasa = transformarTasa(tiempoActual, tasaActual, tiempoDestino);
  let alerta = document.getElementById("alert");
  let resultado;

  // FUNCION
  if (validarCampos()) {
    resultado = valorFuturo / (1 + periodos * tasa);

    if (resultado) {
      resulValorPresenteSimple.value = resultado.toFixed(2);
    }
  }
}
function calcularValorFuturo() {
  // obtener los valores de los inputs y select
  let valorPresente = document.getElementById("inputValorPresente").value;
  let resulValorPresenteSimple = document.getElementById("inputResultado");
  let periodos = document.getElementById("inputNumeroPeriodos").value;
  let tasaActual = document.getElementById("inputTasaInteres").value / 100;
  let tiempoActual = document.getElementById(
    "inputGroupSelectUnidadInteres"
  ).value;
  let tiempoDestino = document.getElementById(
    "inputGroupSelectUnidadPeriodos"
  ).value;
  let tasa = transformarTasa(tiempoActual, tasaActual, tiempoDestino);
  let alerta = document.getElementById("alert");
  let resultado;

  // FUNCION

  if (validarCampos()) {
    resultado = valorPresente * (1 + periodos * tasa);

    if (resultado) {
      resulValorPresenteSimple.value = resultado.toFixed(2);
    }
  }
}

function calcularPeriodos() {
  // obtener los valores de los inputs y select
  let valorFuturo = document.getElementById("inputValorFuturo").value;
  let valorPresente = document.getElementById("inputValorPresente").value;
  let resulValorPresenteSimple = document.getElementById("inputResultado");
  let tasaActual = document.getElementById("inputTasaInteres").value / 100;
  let tiempoActual = document.getElementById(
    "inputGroupSelectUnidadInteres"
  ).value;
  let tiempoDestino = document.getElementById(
    "inputGroupSelectUnidadPeriodos"
  ).value;
  let tasa = transformarTasa(tiempoActual, tasaActual, tiempoDestino);
  let alerta = document.getElementById("alert");
  let resultado;

  // FUNCION

  if (validarCampos()) {
    resultado = (1 / tasa) * (valorFuturo / valorPresente - 1);
    if (resultado) {
      resulValorPresenteSimple.value = resultado.toFixed(2);
    }
  }
}

function calcularInteres() {
  // obtener los valores de los inputs y select
  let valorFuturo = document.getElementById("inputValorFuturo").value;
  let valorPresente = document.getElementById("inputValorPresente").value;
  let resulValorPresenteSimple = document.getElementById("inputResultado");
  let periodos = document.getElementById("inputNumeroPeriodos").value;
  let tiempoActual = document.getElementById(
    "inputGroupSelectUnidadInteres"
  ).value;
  let tiempoDestino = document.getElementById(
    "inputGroupSelectUnidadPeriodos"
  ).value;
  let alerta = document.getElementById("alert");
  let resultado;

  // FUNCION

  if (validarCampos()) {
    resultado = transformarTasa(
      tiempoDestino,
      (1 / periodos) * (valorFuturo / valorPresente - 1) * 100,
      tiempoActual
    );
    if (resultado) {
      resulValorPresenteSimple.value = resultado.toFixed(2);
    }
  }
}

function transformarTasa(tiempoActual, tasaActual, tiempoDestino) {
  return (tasaActual * tiempoActual) / tiempoDestino;
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

export default {
  calcularValorFuturo,
  calcularValorPresente,
  calcularInteres,
  calcularPeriodos,
};
