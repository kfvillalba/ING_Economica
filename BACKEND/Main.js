import Interes_Simple from './Scripts/Interes_Simple/InteresSimple.js'

import Interes_Compuesto from './Scripts/Interes_Compuesto/InteresCompuesto.js'

const opcValorPresenteSimple = document.getElementById(
  'inputGroupSelectValorPresenteSimple'
)
const btnValorPresenteSimple = document.getElementById('btnValorPresenteSimple')
const btnValorFuturoSimple = document.getElementById('btnValorFuturoSimple')

const btnValorFuturoCompuesto = document.getElementById(
  'btnValorFuturoCompuesto'
)
const btnValorPresenteCompuesto = document.getElementById(
  'btnValorPresenteCompuesto'
)

if (btnValorPresenteSimple) {
  btnValorPresenteSimple.addEventListener('click', () => {
    event.preventDefault()
    Interes_Simple.calcularValorPresente()
  })
}

if (btnValorFuturoSimple) {
  btnValorFuturoSimple.addEventListener('click', () => {
    event.preventDefault()
    Interes_Simple.calcularValorFuturo()
  })
}

if (btnValorFuturoCompuesto) {
  btnValorFuturoCompuesto.addEventListener('click', () => {
    event.preventDefault()
    Interes_Compuesto.calcularValorFuturo()
  })
}

if (btnValorPresenteCompuesto) {
  btnValorPresenteCompuesto.addEventListener('click', () => {
    event.preventDefault()
    Interes_Compuesto.calcularValorPresente()
  })
}

if (opcValorPresenteSimple) {
  opcValorPresenteSimple.addEventListener('change', () => {
    event.preventDefault()
    Interes_Simple.hide_show_options(opcValorPresenteSimple.value)
  })
}

if (opcValorPresenteSimple) {
  opcValorPresenteSimple.addEventListener('change', () => {
    event.preventDefault()
    Interes_Compuesto.hide_show_options(opcValorPresenteSimple.value)
  })
}
