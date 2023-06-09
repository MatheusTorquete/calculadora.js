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
        // Obtém o número atual do display
        const numeroAtual = parseFloat(display.textContent.replace('.','').replace(',', '.'));
        novoNumero = true;
        
        // Realiza o cálculo usando o eval
        const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);
        
        // Atualiza o display com o resultado
        atualizarDisplay(resultado);
    }
};

// Função para atualizar o conteúdo do display
const atualizarDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto.toLocaleString('BR');
        novoNumero = false;
    } else {
        display.textContent += texto.toLocaleString('BR');
    }
    
    // Define o foco no botão de igual para facilitar a digitação contínua
    document.querySelector('#igual').focus();
};

// Função para inserir número no display
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
numeros.forEach((numero) => numero.addEventListener('click', inserirNumero));

// Função para selecionar o operador
const selecionarOperador = (evento) => {
    if (!novoNumero) {
        // Realiza o cálculo se houver uma operação pendente
        calcular();
        
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace('.','').replace(',', '.'));
    }
};
operadores.forEach((operador) => operador.addEventListener('click', selecionarOperador));

// Função para acionar o cálculo quando o botão igual é pressionado
const ativarIgual = () => {
    calcular();
    operador = undefined;
};
document.getElementById('igual').addEventListener('click', ativarIgual);

// Função para limpar o display
const limparDisplay = () => (display.textContent = '');
document.getElementById('limparDisplay').addEventListener('click', limparDisplay);

// Função para limpar o cálculo e reiniciar as variáveis de controle
const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
};
document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

// Função para remover o último número do display
const removerUltimoNumero = () => {
    display.textContent = display.textContent.slice(0, -1);
};
document.getElementById('backspace').addEventListener('click', removerUltimoNumero);

// Função para inverter o sinal do número exibido no display
const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1);
};
document.getElementById('inverter').addEventListener('click', inverterSinal);

// Verifica se já existe uma vírgula no número exibido no display
const existeDecimal = () => display.textContent.indexOf(',') !== -1;

// Verifica se existe algum valor no display
const existeValor = () => display.textContent.length > 0;

// Função para inserir a vírgula no número exibido no display
const inserirDecimal = () => {
    if (!existeDecimal()) {
        if (novoNumero) {
            atualizarDisplay('0,');
        } else {
            atualizarDisplay(',');
        }
    }
};
document.getElementById('decimal').addEventListener('click', inserirDecimal);

// Mapeamento das teclas do teclado para os botões correspondentes
const mapaTeclado = {
    0: 'tecla0',
    1: 'tecla1',
    2: 'tecla2',
    3: 'tecla3',
    4: 'tecla4',
    5: 'tecla5',
    6: 'tecla6',
    7: 'tecla7',
    8: 'tecla8',
    9: 'tecla9',
    '/': 'operadorDividir',
    '*': 'operadorMultiplicar',
    '-': 'operadorSubtrair',
    '+': 'operadorAdicionar',
    '=': 'igual',
    Enter: 'igual',
    Backspace: 'backspace',
    c: 'limparDisplay',
    Escape: 'limparCalculo',
    ',': 'decimal',
};

// Função para mapear as teclas do teclado para os botões correspondentes
const mapearTeclado = (evento) => {
    const tecla = evento.key;
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
    if (teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
};
document.addEventListener('keydown', mapearTeclado);
