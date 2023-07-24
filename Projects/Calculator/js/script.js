let baseNumber = null;
let squareNumber = null;
let cubeNumber = null;
let input;
let inputValue = "";
let result;
let buttons;
let buttonInput;
let memory = 0;
let mainButtons;
let digit = "";
let ind;
let subResult;
let rootIndex = null;

input = document.getElementById("input");
result = document.getElementById("result");
buttons = document.querySelectorAll("button");

for (item of buttons) {
  item.addEventListener("click", function (event) {
    buttonInput = event.target.innerHTML;
    document.getElementById("memory").innerHTML = "";
    if (result.innerHTML == " Error") {
      result.innerHTML = "";
    }

    switch (buttonInput) {
      case "C":
        inputValue = "";
        input.innerHTML = "";
        result.innerHTML = "";
        break;

      case "*":
        inputValue += "*";
        input.innerHTML += "*";
        break;

      case "/":
        inputValue += "/";
        input.innerHTML += "/";
        break;

      case "equal":
        equal();
        break;

      case "Ans":
        if (buttonInput === "=") {
          ans();
        }
        break;

      case "\u232B":
        inputValue = inputValue.substring(0, inputValue.length - 1);
        result.innerHTML = result.innerHTML.substring(
          0,
          result.innerHTML.length - 1
        );
        input.innerHTML = inputValue;
        break;

      case "1/x":
        inverse();
        break;

      case "sin":
        sin();
        break;

      case "cos":
        cos();
        break;

      case "tan":
        tan();
        break;

      case "sec":
        tan();
        break;

      case "cosec":
        cosec();
        break;

      case "cot":
        cot();
        break;

      case "sin-1":
        inverseSin();
        break;

      case "cos-1":
        inverseCos();
        break;

      case "tan-1":
        inverseTan();
        break;

      case "x^y":
        baseNumber = eval(inputValue);
        inputValue = "";
        input.innerHTML = "";
        result.innerHTML = "";
        input.innerHTML = baseNumber + "^";
        break;

      case "x²":
        squareNumber = eval(inputValue);
        inputValue = "";
        input.innerHTML = "";
        result.innerHTML = "";
        input.innerHTML = squareNumber + " ^ 2";
        break;

      case "x³":
        cubeNumber = eval(inputValue);
        inputValue = "";
        input.innerHTML = "";
        result.innerHTML = "";
        input.innerHTML = cubeNumber + " ^ 3";
        break;

      case "²√":
        squareRoot();
        break;

      case "y√x":
        rootIndex = parseFloat(inputValue);
        inputValue = "";
        input.innerHTML = rootIndex + "√";
        break;
      case "ln":
        naturalLog();
        break;

      case "log":
        log();
        break;

      case "10^x":
        powerOfTen();
        break;

      case "x!":
        factorial();
        break;

      default:
        inputValue += buttonInput;
        input.innerHTML += buttonInput;
    }

    if (result.innerHTML == "NaN") {
      result.innerHTML = "Invalid Input/Syntax Error";
      inputValue = "";
    }
  });
}

function ans() {
  if (baseNumber) {
    let exponent = eval(inputValue);
    let resultValue = Math.pow(baseNumber, exponent);
    result.innerHTML = resultValue;
    inputValue = resultValue;
    baseNumber = null;
  } else if (squareNumber) {
    let power = squareNumber ** "2";
    result.innerHTML = power;
    inputValue = power;
    squareNumber = null;
  } else if (rootIndex) {
    let radicand = parseFloat(inputValue);
    let resultValue = Math.pow(radicand, 1 / rootIndex);
    result.innerHTML = resultValue;
    inputValue = resultValue;
    rootIndex = null;
  } else if (cubeNumber) {
    let power = cubeNumber ** "3";
    result.innerHTML = power;
    inputValue = power;
    cubeNumber = null;
  } else {
    if (inputValue !== "") {
      if (inputValue.includes("%")) {
        let values = inputValue.split("%");
        let percentage = (parseFloat(values[0]) / parseFloat(values[1])) * 100;
        result.innerHTML = percentage;
        inputValue = percentage;
      } else {
        inputValue = eval(inputValue) + "";
        result.innerHTML = inputValue;
      }
      baseNumber = null;
      squareNumber = null;
    }
  }
}

function equal() {
  if (baseNumber) {
    let exponent = eval(inputValue);
    let resultValue = Math.pow(baseNumber, exponent);
    result.innerHTML = resultValue;
    inputValue = resultValue;
    baseNumber = null;
  } else if (squareNumber) {
    let power = squareNumber ** "2";
    result.innerHTML = power;
    inputValue = power;
    squareNumber = null;
  } else if (rootIndex) {
    let radicand = parseFloat(inputValue);
    let resultValue = Math.pow(radicand, 1 / rootIndex);
    result.innerHTML = resultValue;
    inputValue = resultValue;
    rootIndex = null;
  } else if (cubeNumber) {
    let power = cubeNumber ** "3";
    result.innerHTML = power;
    inputValue = power;
    cubeNumber = null;
  } else {
    if (inputValue !== "") {
      if (inputValue.includes("%")) {
        let values = inputValue.split("%");
        let percentage = (parseFloat(values[0]) / parseFloat(values[1])) * 100;
        result.innerHTML = percentage;
        inputValue = percentage;
      } else {
        inputValue = eval(inputValue) + "";
        result.innerHTML = inputValue;
      }
      baseNumber = null;
      squareNumber = null;
    }
  }
}

//----------------------------------------------------------------

// Trigonometric Functions

function sin() {
  const degree = parseFloat(input.innerHTML);
  const radians = degree * (Math.PI / 180);
  result.innerHTML = Math.sin(radians);
  input.innerHTML = "sin(" + inputValue + "°" + ")";
}

function cos() {
  const degree = parseFloat(input.innerHTML);
  const radians = degree * (Math.PI / 180);
  result.innerHTML = Math.cos(radians);
  input.innerHTML = "cos(" + inputValue + "°" + ")";
}

function tan() {
  const degree = parseFloat(input.innerHTML);
  const radians = degree * (Math.PI / 180);
  result.innerHTML = Math.tan(radians);
  input.innerHTML = "tan(" + inputValue + "°" + ")";
}

function sec() {
  const degree = parseFloat(input.innerHTML);
  const radians = degree * (Math.PI / 180);
  result.innerHTML = 1 / Math.cos(radians);
  input.innerHTML = "sec(" + inputValue + "°" + ")";
}

function cosec() {
  const degree = parseFloat(input.innerHTML);
  const radians = degree * (Math.PI / 180);
  result.innerHTML = 1 / Math.sin(radians);
  input.innerHTML = "cosec(" + inputValue + "°" + ")";
}

function cot() {
  const degree = parseFloat(input.innerHTML);
  const radians = degree * (Math.PI / 180);
  result.innerHTML = 1 / Math.tan(radians);
  input.innerHTML = "cot(" + inputValue + "°" + ")";
}

function inverseSin() {
  const degree = parseFloat(input.innerHTML);

  if (degree >= -1 && degree <= 1) {
    const radians = Math.asin(degree);

    const degrees = radians * (180 / Math.PI);
    result.innerHTML = degrees.toFixed(2) + "°";
    input.innerHTML = "sin⁻¹(" + inputValue + ")";
    return;
  }

  input.innerHTML = "Invalid input/Syntax : ";
  result.innerHTML = "Please Enter a no.then press sin⁻¹";
  inputValue = "";
}

function inverseCos() {
  const degree = parseFloat(input.innerHTML);

  const radian = (degree * Math.PI) / 180;

  if (radian >= -1 && radian <= 1) {
    const radians = Math.acos(radian);

    let degrees = radians * (180 / Math.PI);

    if (degrees < 0) {
      degrees += 360;
    }

    result.innerHTML = degrees.toFixed(2) + "°";
    input.innerHTML = "cos⁻¹(" + inputValue + ")";
    return;
  }
  input.innerHTML = "Invalid input/Syntax : ";
  result.innerHTML = "Please Enter a no. then press cos⁻¹";
  inputValue = "";
}

function inverseTan() {
  const degree = parseFloat(input.innerHTML);

  if (degree >= -Infinity && degree <= Infinity) {
    const radians = Math.atan(degree);

    const degrees = radians * (180 / Math.PI);
    result.innerHTML = degrees.toFixed(2) + "°";
    input.innerHTML = "tan⁻¹(" + inputValue + ")";
    return;
  }

  input.innerHTML = "Invalid input/Syntax : ";
  result.innerHTML = "Please Enter a no. then press tan⁻¹";
  inputValue = "";
}

// Other Functions

function squareRoot() {
  const value = parseFloat(inputValue);
  if (!isNaN(value)) {
    const sqrtValue = Math.sqrt(value);
    result.innerHTML = sqrtValue;
    input.innerHTML = "√" + inputValue;
  } else {
    input.innerHTML = "Invalid input/Syntax : ";
    result.innerHTML = "Please Enter a no. then press √";
  }
}

function nthRoot() {
  let values = inputValue.split("√");
  let rootIndex = parseFloat(values[0]);
  let radicand = parseFloat(values[1]);
  let resultValue = Math.pow(radicand, 1 / rootIndex);
  result.innerHTML = resultValue;
  inputValue = resultValue;
}

function naturalLog() {
  const value = parseFloat(inputValue);

  let lnResult;

  if (isNaN(value) || value <= 0) {
    lnResult = "Invalid input";
  } else {
    lnResult = Math.log(value);
  }
  result.innerHTML = lnResult;
  input.innerHTML = "ln(" + inputValue + ")";
}

function log() {
  const value = parseFloat(inputValue);
  let logResult;
  if (isNaN(value) || value <= 0) {
    logResult = "Invalid input";
  } else {
    logResult = Math.log(value) / Math.log(10);
  }

  result.innerHTML = logResult;
  input.innerHTML = "log(" + inputValue + ")";
}

function factorial() {
  const value = parseFloat(input.innerHTML);
  let fact = 1;
  for (let i = 2; i <= value; i++) {
    fact *= i;
  }
  result.innerHTML = fact;
  input.innerHTML = inputValue + "!";
}

function inverse() {
  if (inputValue !== "0") {
    const inverseValue = 1 / parseFloat(inputValue);
    result.innerHTML = inverseValue;
    input.innerHTML = "1 / " + inputValue;
  } else {
    result.innerHTML = "Invalid Input";
    input.innerHTML = "1 / " + inputValue;
  }
}
function powerOfTen() {
  const x = parseFloat(input.innerHTML.trim());

  if (!isNaN(x)) {
    const powerValue = Math.pow(10, x);

    if (!isNaN(powerValue) && isFinite(powerValue)) {
      result.innerHTML = powerValue;
      inputValue = powerValue;
      input.innerHTML = "10^" + x;
    } else {
      result.innerHTML = "Invalid Input";
      input.innerHTML = "10^" + x;
    }
  } else {
    result.innerHTML = "Please Enter a No. then press 10^x";
    input.innerHTML = "Syntax Error";
  }
}

// ................................................................
// Adding event listener for keyboard input

document.addEventListener("keydown", handleKeyboardInput);
function handleKeyboardInput(event) {
  const key = event.key;

  switch (key) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      inputValue += key;
      input.innerHTML += key;
      break;
    case "%":
      if (inputValue.includes("%")) {
        let values = inputValue.split("%");
        let percentage = (parseFloat(values[0]) / parseFloat(values[1])) * 100;
        result.innerHTML = percentage;
        inputValue = percentage;
      } else {
        inputValue += key;
        input.innerHTML += key;
      }
      break;

    case "+":
    case "-":
    case "*":
    case "/":
      inputValue += key;
      input.innerHTML += key;
      break;

    case "Enter":
      equal();
      break;
    case "Backspace":
      inputValue = inputValue.slice(0, -1);
      input.innerHTML = inputValue;
      break;
    case "Delete":
      inputValue = "";
      input.innerHTML = "";
      result.innerHTML = "";
      break;

    case "Escape":
      inputValue = "";
      input.innerHTML = "";
      result.innerHTML = "";
      break;

    default:
      return;
  }
  event.preventDefault();
}
