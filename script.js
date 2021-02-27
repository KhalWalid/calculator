const numberButtons = document.querySelectorAll('.numbers')
const operationButtons = document.querySelectorAll('.operation')
const enterButton = document.querySelector('#enter')
const clearButton = document.querySelector('#clear')
const deleteButton = document.querySelector('#del')
const display = document.querySelector('#display')
let firstOperandText = document.querySelector('#firstOperand')
let secondOperandText = document.querySelector('#secondOperand')


let firstOperand = ''
let secondOperand = ''
let operation = ''

function add(x, y) {
    return y + x;
}

function substract(x, y) {
    return y - x;
}

function multiply(x, y) {
    return y * x;
}

function divide(x, y) {
    if (x == 0) return `Error, can't divide by 0`
    return y / x;
}

function operate(operator, x, y) {
    switch (operator) {
        case '+':
            return add(x, y);
            break;
        case '-':
            return substract(x, y);
            break;
        case '×':
            return multiply(x, y);
            break;
        case '÷':
            return divide(x, y);
            break;
        default:
            return
    }
}

function updateDisplay() {
    firstOperandText.innerText = firstOperand
    secondOperandText.innerText = secondOperand
}

function addNumber(number) {
    if (number == '.') {
        if (!firstOperand.includes('.')) firstOperand += number.toString()
    } else firstOperand += number.toString()
}

function addOperation(theOperation) {
    if (firstOperand == '') return
    if (secondOperand != '') {
        firstOperand = operate(operation, parseFloat(firstOperand), parseFloat(secondOperand))
        operation = undefined
        secondOperand = ''
    }
    operation = theOperation
    secondOperand = firstOperand + ' ' + theOperation
    firstOperand = ''
}

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        addNumber(button.innerText);
        updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        addOperation(button.innerText);
        updateDisplay();
    })
})

enterButton.addEventListener('click', () => {
    if (isNaN(parseFloat(firstOperand)) || isNaN(parseFloat(secondOperand))) return
    firstOperand = +operate(operation, parseFloat(firstOperand), parseFloat(secondOperand)).toFixed(8)
    operation = undefined
    secondOperand = ''
    updateDisplay()
})

clearButton.addEventListener('click', () => {
    firstOperand = ''
    secondOperand = ''
    operation = undefined
    updateDisplay()
})

deleteButton.addEventListener('click', () => {
    firstOperand = firstOperand.slice(0,-1)
    updateDisplay()
})