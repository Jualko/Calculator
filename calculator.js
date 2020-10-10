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
            e.addEventListener("click", handleNumber);
        } else if (e.innerText === "AC") {
            clear = e;
            e.addEventListener("click", handleClear);
        } else if (e.innerText === "=") {
            e.addEventListener("click", handleCalculate);
        }
        else if (e.dataset.conv) {
            e.addEventListener("click", handleConvert);
        } else {
            e.addEventListener("click", handleOperator);
        }

    });
}

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

function handleOperator(oEv) {
    setClear("C");
    if (lastNumber && lastPress === "handleNumber") {
        calculateNumber(lastOperator);
    }
    lastOperator = oEv.target.innerText;
    lastNumber = getScreenParsed();
    bNewNumber = true;
    lastPress = "handleOperator";
}

function handleCalculate(oEv) {
    calculateNumber(lastOperator);
    lastPress = "handleCalculate";
}

function handleNumber(oEv) {
    setClear("C");

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

    setScreen(getScreen() + oEv.target.innerText);
    lastPress = "handleNumber";
}

function handleConvert(oEv) {
    if (oEv.target.dataset.conv === "dec") {
        convertToDec();
    }
    else if (oEv.target.dataset.conv === "bin") {
        convertToBin();
    }
}

function convertToDec() {
    if (getScreen().match(/[2-9.e]/) || !getScreen().match(/[01]/)) {
        console.log("invalid binary number")
        return;
    }

    /*result = 0;

    (getScreenParsed() + "").split("").forEach(function (e, i, a) {
        result += parseInt(e) * (2 ** (a.length - i - 1));
    })

    setScreen(result);*/

    setScreen(parseInt(getScreen(), 2));
}

function convertToBin() {
    if (getScreen().match(/[e.]/) || !getScreen().match(/[0-9]/)) {
        console.log("invalid decimal number")
        return;
    }

    setScreen(getScreenParsed().toString(2));
}

function calculateNumber(operator) {
    if (operator && getScreen() !== "") {
        switch (operator) {
            case "+":
                result = lastNumber + getScreenParsed();
                break;
            case "-":
                if (lastPress === "handleCalculate") {
                    result = getScreenParsed() - lastNumber;
                } else {
                    result = lastNumber - getScreenParsed();
                }
                break;
            case "×":
                result = lastNumber * getScreenParsed();
                break;
            case "÷":
                if (lastPress === "handleCalculate") {
                    result = getScreenParsed() / lastNumber;
                } else {
                    result = lastNumber / getScreenParsed();
                }
                break;
        }

        if (lastPress !== "handleCalculate") {
            lastNumber = getScreenParsed();
        }

    }
    if (result || result === 0) {
        setScreen(result);
    }
}

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
    result = undefined;
}