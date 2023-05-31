// IMPORTS
import InteresSimple from "./Scripts/Interes_Simple/InteresSimple.js";
import InteresCompuesto from "./Scripts/Interes_Compuesto/InteresCompuesto.js";
import PrinterNavbar from "./Scripts/PrinterNavbar.js";

// VARIABLES

const formValorPresenteSimple = document.getElementById(
  "formValorPresenteSimple"
);
const SelectCalcular = document.getElementById("SelectCalcular");

// FUNCIONES

function ImprimirResultado(id) {
  switch (id) {
    case "btnValorPresenteSimple":
      InteresSimple.calcularValorPresente();
      break;
    case "btnValorPresenteCompuesto":
      InteresCompuesto.calcularValorPresente();
      break;
    case "btnValorFuturoSimple":
      InteresSimple.calcularValorFuturo();
      break;
    case "btnValorFuturoCompuesto":
      InteresCompuesto.calcularValorFuturo();
      break;
    case "btnCalcularInteresSimple":
      InteresSimple.calcularInteres();
      break;
    case "btnCalcularPeriodosSimple":
      InteresSimple.calcularPeriodos();
      break;
    case "btnCalcularInteresCompuesto":
      InteresCompuesto.calcularInteres();
      break;
    case "btnCalcularPeriodosCompuesto":
      InteresCompuesto.calcularPeriodos();
      break;
  }
}

function ImprimirFormulario() {
  switch (SelectCalcular.value) {
    //NADA
    case "0":
      PrinterInteresSimple.PrintNada();
      break;

    //VALOR PRESENTE
    case "1":
      PrinterInteresSimple.PrintValorPresente();
      break;

    //TASA DE INTERES
    case "2":
      PrinterInteresSimple.PrintCalcularInteres();
      break;

    //NUMERO DE PERIODOS
    case "3":
      PrinterInteresSimple.PrintCalcularPeriodos();
      break;

    case "4":
      PrinterInteresSimple.PrintValorFuturo();
      break;

    default:
      break;
  }
}

//EVENT LISTENERS
window.onload = () => {
  console.log("first");
  PrinterNavbar.PrintNavBar();
};

if (SelectCalcular) {
  SelectCalcular.addEventListener("change", () => {
    ImprimirFormulario();
  });
}

if (formValorPresenteSimple) {
  formValorPresenteSimple.addEventListener("click", (e) => {
    e.preventDefault();
    ImprimirResultado(e.target.id);
  });
}
