let firstNum = "";
let secondNum = "";
let operator;

let isOperatorPressed = false;

let displayNumber = "";

const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator")

//add event listeners to buttons
numberButtons.forEach(button => {
    button.addEventListener("click", numberButtonPress)
});

operatorButtons.forEach(button => {
    button.addEventListener("click", operatorButtonPress)
});


function numberButtonPress(button) {
    const pressedButton = button.target.textContent;

    if (!isOperatorPressed) {
        firstNum += pressedButton;
    }
    else {
        secondNum += pressedButtonl;
    }

    displayNumber += pressedButton;
    updateDisplay(displayNumber);
}

function operatorButtonPress(button) {
    const pressedButton = button.target.textContent;
    operator = pressedButton;

    displayNumber = "";
    updateDisplay()
}

function updateDisplay(displayNumber) {
    display.textContent = displayNumber;
}

function operate(a, b, operator) {
    let result;

    switch (operator) {
        case "+":
            result = add(a, b);
            break;
        case "-":
            result = subtract(a, b);
            break;
        case "*":
            result = multiply(a, b);
            break;
        case "/":
            result = divide(a, b);
            break;

        default:
            result = "error";
            break;
    }

    return result
}



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
    if (b != 0) {
        return a / b;
    }
    return "cannot divide by 0";
}

function isNum(str) {
    return !isNaN(str);
}
