var screen;
var clear;
var lastNumber;
var lastOperator;
var lastPress;
var float;
var bNewNumber;
var result;

initializeVariables()

document.addEventListener("DOMContentLoaded", function (event) {
    screen = document.getElementsByClassName("screen")[0];
    attachEventListeners();
});

function attachEventListeners() {
    var elements = document.getElementsByClassName("clickable");
    var aElements = [].slice.call(elements);
    aElements.forEach(e => {
        if (!isNaN(e.innerText) || e.innerText === ".") {
            e.addEventListener("click", changeNumber);
        } else if (e.innerText === "AC") {
            clear = e;
            e.addEventListener("click", handleClear);
        } else if (e.innerText === "=") {
            e.addEventListener("click", calculate);
        } else {
            e.addEventListener("click", operator);
        }

    });
}

function calculateNumber(operator) {
    switch (operator) {
        case "+":
            screen.innerText = lastNumber + parseFloat(screen.innerText);
            break;
        case "-":
            screen.innerText = lastNumber - parseFloat(screen.innerText);
            break;
        case "×":
            screen.innerText = lastNumber * parseFloat(screen.innerText);
            break;
        case "÷":
            debugger
            screen.innerText = lastNumber / parseFloat(screen.innerText);
            debugger
            break;
        default:
            break;
function handleClear(oEv) {
    if (clear.innerText === "C") {
        clear.innerText = "AC";
        clear.style.backgroundColor = "red";
    } else if (clear.innerText === "AC") {
        initializeVariables();
        clear.style.backgroundColor = "#3A3A3A";
    }
    clearScreen();
    lastPress = "handleClear";
}

function operator(oEv) {
    if (lastNumber && lastPress === "changeNumber") {
        calculateNumber(lastOperator);
    }
    lastOperator = oEv.target.innerText;
    lastNumber = parseFloat(screen.innerText);
    bNewNumber = true;
    lastPress = "operator";
}

function calculate(oEv) {
    calculateNumber(lastOperator);
    lastPress = "calculate";
}

function changeNumber(oEv) {
    if (bNewNumber) {
        clearScreen();
        bNewNumber = false;
        float = false;
    }
    if (oEv.target.innerText === ".") {
        if (float === true) {
            return;
        } else {
            float = true;
        }
    }
    screen.innerText += oEv.target.innerText;
    lastPress = "changeNumber";

function setClear(char) {
    clear.innerText = char;
    clear.style.backgroundColor = "#3A3A3A";
}

function clearScreen() {
    screen.innerText = "";
}

function setScreen(x) {
    screen.innerText = x;
}

function getScreen() {
    return screen.innerText;
}

function getScreenParsed() {
    return parseFloat(screen.innerText);
}

function initializeVariables() {
    lastNumber = undefined;
    lastOperator = undefined;
    lastPress = undefined;
    float = false;
    bNewNumber = true;
}