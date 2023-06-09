// recomendado para uso de código mais seguro e consistente
'use strict';

// Obtendo referência para o elemento de exibição
const display = document.getElementById('display');

// Obtendo referências para os botões de números e operadores
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');

// Variáveis de controle
let novoNumero = true;
let operador;
let numeroAnterior;

// Verifica se há uma operação pendente
const operacaoPendente = () => operador !== undefined;

// Função para realizar o cálculo
const calcular = () => {
    if (operacaoPendente()) {
        const numeroAtual = parseFloat(display.textContent.replace(',', '.'));
        novoNumero = true;
        const resultado = eval (`${numeroAnterior}${operador}${numeroAtual}`);
        atualizarDisplay(resultado);
        // Executa a operação com base no operador selecionado
        // if (operador == '+') {
        //     atualizarDisplay(numeroAnterior + numeroAtual);
        // } else if (operador == '-') {
        //     atualizarDisplay(numeroAnterior - numeroAtual);
        // } else if (operador == '*') {
        //     atualizarDisplay(numeroAnterior * numeroAtual);
        // } else if (operador == '/') {
        //     atualizarDisplay(numeroAnterior / numeroAtual);
        // }
    }
}

// Função para atualizar o conteúdo do display
const atualizarDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto.toLocaleString('BR');
        novoNumero = false;
    } else {
        display.textContent += texto.toLocaleString('BR');
    }
}

// Função para inserir número no display
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
numeros.forEach(numero => numero.addEventListener('click', inserirNumero));

// Função para selecionar o operador
const selecionarOperador = (evento) => {
    if (!novoNumero) {
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace(',', '.'));
    }
}
operadores.forEach(operador => operador.addEventListener('click', selecionarOperador));

// Função para ativar o botão de igual
const ativarIgual = () => {
    calcular();
    operador = undefined;
}
document.getElementById('igual').addEventListener('click', ativarIgual);

// Função para limpar o display
const limparDisplay = () => display.textContent = '';
document.getElementById('limparDisplay').addEventListener('click', limparDisplay);

// Função para limpar o cálculo
const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}
document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

// Função para remover o último número digitado
const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', removerUltimoNumero);

// Função para inverter o sinal do número
const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1);
};
document.getElementById('inverter').addEventListener('click', inverterSinal);

// Funções auxiliares para o botão decimal
const existeDecimal = () => display.textContent.indexOf(',') !== 1;
const existeValor = () => display.textContent.length > 0;
const inserirDecimal = () => {
    if (!existeDecimal()) {
        if (existeValor) {
            atualizarDisplay(',');
        } else {
            atualizarDisplay('0,');
        }
    }
}
document.getElementById('decimal').addEventListener('click', inserirDecimal);
