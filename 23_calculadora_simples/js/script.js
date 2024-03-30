const display = document.querySelector("#displayInput");
const botaoIgual = document.querySelector(".igual");
const botaoPonto = document.querySelector(".ponto");
const botoesNumeros = document.querySelectorAll(".num");
const botoesOperadores = document.querySelectorAll(".operador");

//variaveis globais
let operacaoAtual = "";
let operador = null;
let valorAnterior = "";
let calculando = false;
let resultado = null;
//funções
function atualizaDisplay() {
    display.value = operacaoAtual;
}
function insereNumero(evento) {
    if (calculando) {
        operacaoAtual = evento.target.textContent;
        calculando = false;
    } else {
        operacaoAtual += evento.target.textContent;
    }
    atualizaDisplay();
}
function inserPonto() {
    if (operacaoAtual.indexOf(".") === -1) {
        operacaoAtual += ".";
        atualizaDisplay();
    }
}
function insereOperador(evento) {
    if (operacaoAtual !== "") {
        if (!calculando) {
            if (operador !== null) {
                calculando();
            }
            valorAnterior = operacaoAtual;
            operacaoAtual = "";
        }
        operador = evento.target.textContent
    }
}
function calcula() {
    const operandoAnterior = parseFloat(valorAnterior);
    const operandoAtual = parseFloat(operacaoAtual);
    switch (operador) {
        case "+":
            resultado = operandoAnterior + operandoAtual;
            break;
        case "-":
            resultado = operandoAnterior - operandoAtual;
            break;
        case "*":
            resultado = operandoAnterior * operandoAtual;
            break;
        case "/":
            resultado = operandoAnterior / operandoAtual;
            break;
    }
    operacaoAtual = String(resultado);
    valorAnterior = operacaoAtual;
    calculando = true;
    atualizaDisplay()
    // console.log(valorAnterior, operador, operacaoAtual, resultado)

}
///eventos
botaoPonto.addEventListener("click", inserPonto);
botoesNumeros.forEach((botao) => botao.addEventListener("click", insereNumero))
botoesOperadores.forEach((botao) => botao.addEventListener("click", insereOperador))
botaoIgual.addEventListener("click", calcula)