// Hold values for display components
let numOne = '';
let operatorSign = '';
let numTwo = '';
let equalSign = '';
let result = '';

// Basic Math Operations
function add(a, b) {
    return Number(a) + Number(b);
}
function subtract(a, b) {
    return Number(a) - Number(b);
}
function multiply(a, b) {
    return Number(a) * Number(b);
}
function divide(a, b) {
    let quotient = Number(a) / Number(b);
    return Math.round(quotient * 100) / 100
}


// Switch function that calls operations using current instance variables
function operate(a, b, operator) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return "Invalid Operator";
    }
}


// Initializes digit buttons on Caclulator interface
function intializeNumButtons() {
    const numberButtons = document.querySelector(".numberButtons");
    for (let i = 9; i >= 0; i--) {
        let button = document.createElement("button");
        button.id = i;
        button.textContent = i;
        button.classList.add("number");
        numberButtons.appendChild(button);
    }
}
intializeNumButtons();


// Updates display of the Calculator interface
function updateDisplay() {
    const operandOne = document.querySelector(".operandOne");
    operandOne.textContent = numOne;
    const operator = document.querySelector(".operatorSign");
    operator.textContent = operatorSign;  
    const operandTwo = document.querySelector(".operandTwo");
    operandTwo.textContent = numTwo;
    const displayEqual = document.querySelector(".equalSign");
    displayEqual.textContent = equalSign;
    const displayResult = document.querySelector(".result");
    displayResult.textContent = result;
}


// Gives buttons on calculator their functionality
const buttons = document.querySelectorAll("button");
buttons.forEach(function(button) {
    button.addEventListener("click", (event) => {
        // Operators
        if (button.classList.contains("operator")) {
            if (numOne !== '') {
                if (result !== '') {
                    numOne = result;
                    operatorSign = button.id;
                    numTwo = '';
                    equalSign = '';
                    result = '';
                    updateDisplay();
                }
                operatorSign = button.id;
                updateDisplay();
            }
        }
        // Digits
        else if (button.classList.contains("number")) {
            // First Operand
            if (operatorSign === '') {
                numOne = numOne.concat(button.id);
                updateDisplay();
            }

            // Second Operand
            if ((operatorSign !== '') && (result === '')) {
                numTwo = numTwo.concat(button.id);
                updateDisplay();
            }
        }
        // Clear Display
        else if (button.id == "AC") {
            numOne = '';
            operatorSign = '';
            numTwo = '';
            equalSign = '';
            result = '';
            updateDisplay();
        }
        // Equate
        else if (button.id == "=") {
            if (!((numOne === '') || (operatorSign === '') || (numTwo === ''))) {
                // Check for divide by zero
                if ((operatorSign === '/') && (Number(numTwo) == 0)) {
                    numOne = '';
                    operatorSign = '';
                    numTwo = '';
                    equalSign = '';
                    result = '4Weird';
                    updateDisplay();
                    result = '';
                } else {
                    equalSign = "=";
                    result = operate(numOne, numTwo, operatorSign);
                    updateDisplay();
                }
            }
        }
    });
});
