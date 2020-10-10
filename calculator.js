var screen;
var lastNumber = undefined;
var lastOperator = undefined;
var lastPress = undefined;
var float = false;
var bNewNumber = true;

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
        } else if (e.innerText === "C") {
            e.addEventListener("click", clear);
        } else if (e.innerText === "=") {
            e.addEventListener("click", calculate);
        } else {
            e.addEventListener("click", operator);
        }

    });
}

function clearScreen() {
    screen.innerText = "";
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
    }
}

function clear(oEv) {
    clearScreen();
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
}