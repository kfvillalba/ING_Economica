// IMPORTS
import InteresSimple from "./Scripts/Interes_Simple/InteresSimple.js";
import InteresCompuesto from "./Scripts/Interes_Compuesto/InteresCompuesto.js";
import PrinterNavbar from "./Scripts/PrinterNavbar.js";
import GradienteLinear from "./Scripts/Gradientes/Gradiente_Lineal.js";
import GradienteGeometrico from "./Scripts/Gradientes/Gradiente_Geometrico.js";

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
    case "btnCalcularValorFuturoGradienteLineal":
      GradienteLinear.calcularValorFuturo();
      break;
    case "btnCalcularCuotaPeriodicaGradienteLineal":
      GradienteLinear.calcularCuotaPeriodica();
      break;
    case "btnCalcularValorPresenteGradienteLineal":
      GradienteLinear.calcularValorPresente();
      break;
    case "btnCalcularCuotaAumentoGradienteLineal":
      GradienteLinear.calcularGradiente();
      break;
    case "btnCalcularValorFuturoGradienteGeometrico":
      GradienteGeometrico.calcularValorFuturo();
      break;
    case "btnCalcularValorPresenteGradienteGeometrico":
      GradienteGeometrico.calcularValorPresente();
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

// Americano

// Obtener los elementos del formulario

// Frances

// Alemán
