let firstNum = "";
let secondNum = "";
let operator = "";

let isOperatorPressed = false;
let isEquationDone = false;

let displayNumber = "";

const display = document.querySelector(".display");
const aboveDisplay = document.querySelector(".above-display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const eqButton = document.querySelector(".equals");
const clearButtons = document.querySelectorAll(".clear");
const backspaceButton = document.querySelector(".backspace");
const decimalButton = document.querySelector(".decimal");

//add event listeners to buttons
numberButtons.forEach((button) => {
  button.addEventListener("click", numberButtonPress);
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", operatorButtonPress);
});

eqButton.addEventListener("click", eqButtonPress);

clearButtons.forEach((button) => {
  button.addEventListener("click", clearButtonPress);
});

backspaceButton.addEventListener("click", backspaceButtonPress);

decimalButton.addEventListener("click", decimalButtonPress);

function numberButtonPress(button) {
  const pressedButton = button.target.textContent;

  if (isOperatorPressed && secondNum == "") {
    displayNumber = "";
    updateDisplay(displayNumber);
  }

  if (isEquationDone && !isOperatorPressed) {
    firstNum = "";
    secondNum = "";
    operator = "";
    isOperatorPressed = false;
    isEquationDone = false;

    displayNumber = "";
    updateDisplay(displayNumber);
  }

  if (!isOperatorPressed) {
    firstNum += pressedButton;
  } else {
    secondNum += pressedButton;
  }

  if (displayNumber == "0") {
    displayNumber = pressedButton;
  } else {
    displayNumber += pressedButton;
  }

  updateDisplay(displayNumber);
}

function decimalButtonPress() {
  if (isOperatorPressed) {
    if (secondNum != "" && !secondNum.includes(".")) {
      secondNum += ".";
      displayNumber += ".";
    }
  } else {
    if (firstNum != "" && !firstNum.includes(".")) {
      firstNum += ".";
      displayNumber += ".";
    }
  }
  updateDisplay(displayNumber);
}

function operatorButtonPress(button) {
  const pressedButton = button.target.textContent;

  if (isOperatorPressed && isNum(secondNum)) {
    eqButtonPress();
    operator = pressedButton;
    isOperatorPressed = true;
    // isEquationDone = false;
    return;
  }

  operator = pressedButton;
  isOperatorPressed = true;
  isEquationDone = false;

  displayNumber = "";
  updateDisplay(displayNumber);
}

function eqButtonPress() {
  let result;
  if (isNum(firstNum) && isNum(secondNum) && isOperatorPressed) {
    result = operate(firstNum, secondNum, operator);

    if (result == "error") {
      displayNumber = "math error: cannot divide by 0";
      firstNum = "";
      secondNum = "";
      operator = "";
      isOperatorPressed = false;
      isEquationDone = true;
      updateDisplay(displayNumber);
      return;
    }

    result = customRound(result);
    displayNumber = result;
    updateDisplay(displayNumber);

    //check if there is an error
    if (isNaN(result)) {
      return;
    }

    firstNum = result;
    secondNum = "";
    operator = "";
    isOperatorPressed = false;
    isEquationDone = true;
  }
}

function clearButtonPress() {
  displayNumber = "";
  firstNum = "";
  secondNum = "";
  operator = "";
  isOperatorPressed = false;
  updateDisplay(displayNumber);
}

function backspaceButtonPress() {
  if (!isOperatorPressed) {
    firstNum = firstNum.slice(0, -1);
  } else {
    secondNum = secondNum.slice(0, -1);
  }

  displayNumber = displayNumber.slice(0, -1);
  updateDisplay(displayNumber);
}

function updateDisplay(displayNumber) {
  display.textContent = displayNumber;
  aboveDisplay.textContent = `${firstNum} ${operator} ${secondNum} | isoperatorpressed: ${isOperatorPressed} isequationdone: ${isEquationDone}`;
}

function operate(a, b, operator) {
  let result;
  a = Number(a);
  b = Number(b);

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

  return result;
}

function customRound(value) {
  return parseFloat(parseFloat(value).toPrecision(8));
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
  return "error";
}

function isNum(str) {
  return !isNaN(str);
}
