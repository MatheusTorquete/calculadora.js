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
        const numeroAtual = parseFloat(display.textContent);
        novoNumero = true;
        
        // Executa a operação com base no operador selecionado
        if (operador == '+') {
            atualizarDisplay(numeroAnterior + numeroAtual);
        } else if (operador == '-') {
            atualizarDisplay(numeroAnterior - numeroAtual);
        } else if (operador == '*') {
            atualizarDisplay(numeroAnterior * numeroAtual);
        } else if (operador == '/') {
            atualizarDisplay(numeroAnterior / numeroAtual);
        }
    }
}

// Função para atualizar o conteúdo do display
const atualizarDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto;
        novoNumero = false;
    } else {
        display.textContent += texto;
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
        numeroAnterior = parseFloat(display.textContent);
    }
}
operadores.forEach(operador => operador.addEventListener('click', selecionarOperador));
