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

function calcularValorFuturo(){
  // obtener los valores de los inputs y select
  let montoConstante = document.getElementById("inputMontoConstante").value;
  let montoCrecimiento = document.getElementById("inputMontoCrecimiento").value;
  let periodos = document.getElementById("inputNumeroPeriodos").value;
  let tasaActual = document.getElementById("inputTasaInteres").value / 100;
  let resulValorPresenteSimple = document.getElementById("inputResultado");
  let tiempoActual = document.getElementById(
    "inputGroupSelectUnidadInteres"
  ).value;
  let tiempoDestino = document.getElementById(
    "inputGroupSelectUnidadPeriodos"
  ).value;
  let tipoGradiente = document.getElementById("inputGroupSelectTipoGradiente").value;
  let tasa = transformarTasa(tiempoActual, tasaActual, tiempoDestino);
  let alerta = document.getElementById("alert");
  let resultado;

  // Funcion

  if (validarCampos()){
    switch (tipoGradiente) {
        case "1":
            resultado = montoConstante *((Math.pow(1 + tasa, periodos)-1)/tasa)+(montoCrecimiento/tasa)*(((Math.pow(1 + tasa, periodos)-1)/tasa)-periodos);                          
            break;
        case "2":
            resultado = montoConstante *((Math.pow(1 + tasa, periodos)-1)/tasa)-(montoCrecimiento/tasa)*(((Math.pow(1 + tasa, periodos)-1)/tasa)-periodos);  
            break;
    }
    
    resulValorPresenteSimple.value = resultado.toFixed(2);
  }

}

function calcularCuotaPeriodica(){
    // obtener los valores de los inputs y select
    let valor = document.getElementById("inputValor").value;
    let montoCrecimiento = document.getElementById("inputMontoCrecimiento").value;
    let periodos = document.getElementById("inputNumeroPeriodos").value;
    let tasaActual = document.getElementById("inputTasaInteres").value / 100;
    let resulValorPresenteSimple = document.getElementById("inputResultado");
    let tiempoActual = document.getElementById(
      "inputGroupSelectUnidadInteres"
    ).value;
    let tiempoDestino = document.getElementById(
      "inputGroupSelectUnidadPeriodos"
    ).value;
    let tipoGradiente = document.getElementById("inputGroupSelectTipoGradiente").value;
    let tasa = transformarTasa(tiempoActual, tasaActual, tiempoDestino);
    let alerta = document.getElementById("alert");
    let resultado;  
    
    // Funcion

    
    let a = montoCrecimiento/tasa
    let b= 1-Math.pow(1+tasa,-periodos)
    let c = b/tasa
    let d = Math.pow(1+tasa,periodos)
    let e = periodos/d
    
    

 
    if (validarCampos()){
      switch (tipoGradiente) {
          case "1":
              resultado = ((valor - ((montoCrecimiento/tasa)*(((Math.pow(1 + tasa, periodos)-1)/tasa)-periodos)))) / ((Math.pow(1 + tasa, periodos)-1)/tasa)             
              break;
          case "2":            
          resultado = (valor - (a*(c-e)))/c
              break;
      }
      
      resulValorPresenteSimple.value = resultado.toFixed(2);
    }
  
  }

  function calcularValorPresente(){
    // obtener los valores de los inputs y select
    let cuotaPeriodica = document.getElementById("inputMontoConstante").value;
    let montoCrecimiento = document.getElementById("inputMontoCrecimiento").value;
    let periodos = document.getElementById("inputNumeroPeriodos").value;
    let tasaActual = document.getElementById("inputTasaInteres").value / 100;
    let resulValorPresenteSimple = document.getElementById("inputResultado");
    let tiempoActual = document.getElementById(
      "inputGroupSelectUnidadInteres"
    ).value;
    let tiempoDestino = document.getElementById(
      "inputGroupSelectUnidadPeriodos"
    ).value;
    let tipoGradiente = document.getElementById("inputGroupSelectTipoGradiente").value;
    let tasa = transformarTasa(tiempoActual, tasaActual, tiempoDestino);
    let alerta = document.getElementById("alert");
    let resultado;
  
    // Funcion
  
    if (validarCampos()){
      switch (tipoGradiente) {
          case "1":
              resultado = (cuotaPeriodica * ((1-(Math.pow(1+tasa,-periodos)))/(tasa)))  + ((montoCrecimiento/tasa)*(((1-(Math.pow(1+tasa,-periodos)))/(tasa)) - (periodos/Math.pow(1+tasa,periodos)) ))      
              break;
          case "2":
              
              break;
      }
      
      resulValorPresenteSimple.value = resultado.toFixed(2);
    }
  
  }

export default {calcularValorFuturo,calcularCuotaPeriodica}