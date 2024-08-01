/* variables */

let operator = '';
let previousVal = '';
let currentVal = '';
const operators = {
    '+': '+',
    'x': 'x',
    '-': '-',
    '/': '/',
}

let history = document.querySelector('.history')
let current = document.querySelector('.current')
let numBtns = Array.from(document.querySelectorAll('[data-number]'));
let opBtns = Array.from(document.querySelectorAll('[data-operator]'));
let clearBtn = document.querySelector('.btn-clr');
let delBtn = document.querySelector('.btn-del');
let eqBtn = document.querySelector('#equalsBtn');
let pntBtn = document.querySelector('#pointBtn');

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(select, a, b) {
    a = Number(a)
    b = Number(b)
    switch (select) {
        case '+':
            return add(a, b)
        case 'x':
            return multiply(a, b)
        case '-':
            return subtract(a, b)
        case '/':
            if (b === 0) {
                alert('bad boysh');
                reset();
                return '';
            }
            return divide(a, b)
    }
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000
  }

function reset() {
    history.textContent = '';
    current.textContent = '';
    operator = '';
    previousVal = '';
    currentVal = '';
}

function display() {
    history.textContent = `${previousVal} ${operator} ${currentVal}`;
    current.textContent = currentVal;
}

function appendText(t) {
    if (t in operators) {
        if (previousVal === '' & currentVal === '') {
            currentVal = '0';
        }
        if (!previousVal) {
            previousVal = currentVal;
            currentVal = '';
            operator = t;
        }
        else if (currentVal && previousVal) {
            previousVal = operate(operator, previousVal, currentVal).toString();
            currentVal = '';
            operator = t;
        }
        else operator = t
    }
    else {
        currentVal += t;
    }
    display();
}

function addPoint() {
    if (!currentVal && !previousVal) {
        currentVal = '0.'
    }
    else if (currentVal.includes('.')) return
    else if (currentVal) {
        currentVal += '.';
    }
    display();
}

function deleteNumber() {
    if (currentVal) {
        currentVal = currentVal.slice(0, -1)
    }
    else if (operator) {
        if (previousVal) {
            currentVal = previousVal;
            previousVal = '';
        }
        operator = '';
    }
    display();
  }

function eqOperate() {
    if (currentVal && previousVal) {
        currentVal = operate(operator, previousVal, currentVal).toString();
        previousVal = '';
        operator = '';
    }
    display()
}

numBtns.forEach((btn) => btn.addEventListener('click', (e) => appendText(e.target.textContent)))
opBtns.forEach((btn) => btn.addEventListener('click', (e) => appendText(e.target.textContent)))

clearBtn.addEventListener('click', () => reset())
eqBtn.addEventListener('click', () => eqOperate())
pntBtn.addEventListener('click', () => addPoint())
delBtn.addEventListener('click', () => deleteNumber())
