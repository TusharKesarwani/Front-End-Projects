let input = document.getElementById('input');
let result = document.getElementById('result');
let buttons = document.querySelectorAll('button');
let inputValues = [];

for (let item of buttons) {
    item.addEventListener('click', function(event) {
        let buttonInput = event.target.innerHTML;
        input.innerHTML = '';
        document.getElementById('memory').innerHTML = '';

        if (result.innerHTML == "Error") {
            result.innerHTML = '';
        }

        switch (buttonInput) {
            case 'C':
                inputValues = [];
                input.innerHTML = '';
                result.innerHTML = '';
                break;

            case '=':
                if (inputValues.length > 0) {
                    let expression = inputValues.join('');
                    let res = evaluateExpression(expression);
                    input.innerHTML = expression + "=";
                    result.innerHTML = res;
                    inputValues = [res];
                }
                break;

            case '\u232B':
                if (inputValues.length > 0) {
                    inputValues.pop();
                    result.innerHTML = inputValues.join('');
                }
                break;

            case 'mc':
                memory = 0;
                break;

            case 'm+':
                memory += Number(eval(inputValues.join('')));
                document.getElementById('memory').innerHTML = 'm+';
                break;

            case 'm-':
                memory -= Number(eval(inputValues.join('')));
                document.getElementById('memory').innerHTML = 'm-';
                break;

            case 'mr':
                result.innerHTML = memory;
                document.getElementById('memory').innerHTML = 'mr';
                break;

            default:
                inputValues.push(getOperationSymbol(buttonInput));
                result.innerHTML += buttonInput;
        }

        if (result.innerHTML == "NaN") {
            result.innerHTML = "Error";
        }
    });
}

function evaluateExpression(expression) {
    try {
        return eval(expression);
    } catch (error) {
        return "Error";
    }
}

function getOperationSymbol(buttonInput) {
    switch (buttonInput) {
        case 'x':
            return '*';
        case '÷':
            return '/';
        default:
            return buttonInput;
    }
}
