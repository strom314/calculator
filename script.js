let firstNum = "";
let secondNum = "";
let operator;

let isOperatorPressed = false;

let displayNumber = "";

const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator")
const eqButton = document.querySelector(".equals")
const clearButtons = document.querySelectorAll(".clear")
const backspaceButton = document.querySelector(".backspace")

//add event listeners to buttons
numberButtons.forEach(button => {
    button.addEventListener("click", numberButtonPress)
});

operatorButtons.forEach(button => {
    button.addEventListener("click", operatorButtonPress)
});

eqButton.addEventListener("click", eqButtonPress)

clearButtons.forEach(button => {
    button.addEventListener("click", clearButtonPress)
});

backspaceButton.addEventListener("click", backspaceButtonPress);

function numberButtonPress(button) {
    const pressedButton = button.target.textContent;

    if (isOperatorPressed && secondNum == undefined) {
        displayNumber = ""
        updateDisplay(displayNumber)
    }

    if (!isOperatorPressed) {
        firstNum += pressedButton;
    }
    else {
        secondNum += pressedButton;
    }



    if (displayNumber == "0") {
        displayNumber = pressedButton;
    }
    else {
        displayNumber += pressedButton;
    }


    updateDisplay(displayNumber);
}

function operatorButtonPress(button) {
    const pressedButton = button.target.textContent;

    if (isOperatorPressed && isNum(secondNum)) {
        eqButtonPress();
        operator = pressedButton;
        isOperatorPressed = true;
        return;
    }

    operator = pressedButton;
    isOperatorPressed = true;

    displayNumber = "";
    updateDisplay(displayNumber)
}

function eqButtonPress() {
    let result;
    if (isNum(firstNum) && isNum(secondNum) && isOperatorPressed) {
        result = operate(firstNum, secondNum, operator);

        displayNumber = result;
        updateDisplay(displayNumber);

        //check if there is an error
        if (isNaN(result)) {
            return;
        }

        firstNum = result;
        secondNum = ""
        operator = undefined;
        isOperatorPressed = false;
    }
}

function clearButtonPress() {
    displayNumber = "";
    firstNum = "";
    secondNum = "";
    operator = undefined;
    updateDisplay(displayNumber);
}

function backspaceButtonPress() {
    if (!isOperatorPressed) {
        firstNum = firstNum.slice(0, -1);
    }
    else {
        secondNum = secondNum.slice(0, -1);
    }

    displayNumber = displayNumber.slice(0, -1);
    updateDisplay(displayNumber);
}

function updateDisplay(displayNumber) {
    display.textContent = displayNumber;
}

function operate(a, b, operator) {
    let result;
    a = Number(a)
    b = Number(b)

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
