// obtener los valores de los inputs y select
function calcularValorPresente() {
  let valorFuturo = document.getElementById("valFuturoSimple").value;
  let valorPresente = document.getElementById("valPresenteSimple").value;
  let resulValorPresenteSimple = document.getElementById("resulPresenteSimple");
  let tasaActual = document.getElementById("tasaValPresenteSimple").value / 100;
  let tiempoActual = document.getElementById(
    "inputGroupSelectUnidadInteres"
  ).value;
  let tiempoDestino = document.getElementById(
    "inputGroupSelectUnidadPeriodo"
  ).value;
  let tasa = transformarTasa(tiempoActual, tasaActual, tiempoDestino);
  let periodos = document.getElementById("periodosValorPresenteSimple").value;
  let alerta = document.getElementById("alert");
  let resultado;

  if (
    valorFuturo != "" &&
    tasa != "" &&
    periodos != "" &&
    valorPresente == ""
  ) {
    resultado = valorFuturo / Math.pow(1 + tasa, periodos); //valor presente
  } else if (
    valorFuturo != "" &&
    tasa == "" &&
    periodos != "" &&
    valorPresente != ""
  ) {
    resultado =
      transformarTasa(
        tiempoDestino,
        Math.pow(valorFuturo / valorPresente, 1 / periodos) - 1,
        tiempoActual
      ) * 100; //tasa
  } else if (
    valorFuturo != "" &&
    tasa != "" &&
    periodos == "" &&
    valorPresente != ""
  ) {
    resultado = Math.log(valorFuturo / valorPresente) / Math.log(1 + tasa); //tiempo
  } else if (
    valorFuturo != "" &&
    tasa != "" &&
    periodos != "" &&
    valorPresente != ""
  ) {
    alerta.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert" >
    <strong>ERROR!</strong> Ya tienes toda la informacion.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  } else {
    alerta.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert" >
    <strong>ERROR!</strong> Falta informacion.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  }

  if (resultado) {
    resulValorPresenteSimple.value = resultado.toFixed(2);
  }
}

function calcularValorFuturo() {
  let valorFuturo = document.getElementById("valFuturoSimple").value;
  let valorPresente = document.getElementById("valPresenteSimple").value;
  let resulValorPresenteSimple = document.getElementById("resulPresenteSimple");
  let tasaActual = document.getElementById("tasaValPresenteSimple").value / 100;
  let tiempoActual = document.getElementById(
    "inputGroupSelectUnidadInteres"
  ).value;
  let tiempoDestino = document.getElementById(
    "inputGroupSelectUnidadPeriodo"
  ).value;
  let tasa = transformarTasa(tiempoActual, tasaActual, tiempoDestino);
  let periodos = document.getElementById("periodosValorPresenteSimple").value;
  let alerta = document.getElementById("alert");
  let resultado;

  console.log(tasa);

  if (
    valorFuturo == "" &&
    tasa != "" &&
    periodos != "" &&
    valorPresente != ""
  ) {
    resultado = valorPresente * Math.pow(1 + tasa, periodos); //valor Futuro
  } else if (
    valorFuturo != "" &&
    tasa == "" &&
    periodos != "" &&
    valorPresente != ""
  ) {
    resultado =
      transformarTasa(
        tiempoDestino,
        Math.pow(valorFuturo / valorPresente, 1 / periodos) - 1,
        tiempoActual
      ) * 100; //tasa
  } else if (
    valorFuturo != "" &&
    tasa != "" &&
    periodos == "" &&
    valorPresente != ""
  ) {
    resultado = Math.log(valorFuturo / valorPresente) / Math.log(1 + tasa); //tiempo
  } else if (
    valorFuturo != "" &&
    tasa != "" &&
    periodos != "" &&
    valorPresente != ""
  ) {
    alerta.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert" >
    <strong>ERROR!</strong> Ya tienes toda la informacion.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  } else {
    alerta.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert" >
    <strong>ERROR!</strong> Falta informacion.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  }
  if (resultado) {
    resulValorPresenteSimple.value = resultado.toFixed(2);
  }
}

function transformarTasa(tiempoActual, tasaActual, tiempoDestino) {
  return (
    Math.exp([(tiempoActual * Math.log(1 + tasaActual)) / tiempoDestino]) - 1
  );
}

function ocultar() {
  document.getElementById("divopc1").classList.add("hide");
  document.getElementById("divopc2").classList.add("hide");
  document.getElementById("divopc3").classList.add("hide");
  document.getElementById("divopc4").classList.add("hide");
  document.getElementById("divopc5").classList.add("hide");
  document.getElementById("divResultado").classList.add("hide");
}
function limpiar() {
  document.getElementById("formValorPresenteSimple").reset();
}

function mostrar() {
  document.getElementById("divopc1").classList.remove("hide");
  document.getElementById("divopc2").classList.remove("hide");
  document.getElementById("divopc3").classList.remove("hide");
  document.getElementById("divopc4").classList.remove("hide");
  document.getElementById("divopc5").classList.remove("hide");
  document.getElementById("divResultado").classList.remove("hide");
  document.getElementById("periodosValorPresenteSimple").disabled = false;
  document.getElementById("tasaValPresenteSimple").disabled = false;
}

function hide_show_options(opc) {
  switch (opc) {
    case "0":
      ocultar();
      limpiar();
      break;

    case "1":
      ocultar();
      mostrar();
      document.getElementById("divopc4").classList.add("hide");
      limpiar();
      break;

    case "2":
      ocultar();
      mostrar();
      document.getElementById("tasaValPresenteSimple").disabled = true;
      limpiar();
      break;

    case "3":
      ocultar();
      mostrar();
      document.getElementById("periodosValorPresenteSimple").disabled = true;
      limpiar();
      break;

    default:
      ocultar();
      break;
  }
}

export default {
  calcularValorFuturo,
  calcularValorPresente,
  hide_show_options,
};
