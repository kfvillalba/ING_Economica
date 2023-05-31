// obtener los valores de los inputs y select
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
    resultado = valorFuturo / Math.pow(1 + tasa, periodos); //valor presente

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
    resultado = valorPresente * Math.pow(1 + tasa, periodos); //valor Futuro
    if (resultado) {
      resulValorPresenteSimple.value = resultado.toFixed(2);
    }
  }
}

function transformarTasa(tiempoActual, tasaActual, tiempoDestino) {
  return (
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
    resultado = Math.log(valorFuturo / valorPresente) / Math.log(1 + tasa); //tiempo
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
    resultado =
      transformarTasa(
        tiempoDestino,
        Math.pow(valorFuturo / valorPresente, 1 / periodos) - 1,
        tiempoActual
      ) * 100; //tasa
    if (resultado) {
      resulValorPresenteSimple.value = resultado.toFixed(2);
    }
  }
}

export default {
  calcularValorFuturo,
  calcularValorPresente,
  calcularInteres,
  calcularPeriodos,
};
