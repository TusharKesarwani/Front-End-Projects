let input = '';
let memory = 0;
const inputElement = document.getElementById('input');
const resultElement = document.getElementById('result');

function getIndexOfSubStr(str, subStr, preIndex, output) {
  let temp = str.match(subStr);
  if (temp) {
    output.push(temp.index + preIndex);
    preIndex += temp.index + subStr.length;
    str = str.substring(temp.index + subStr.length);
    getIndexOfSubStr(str, subStr, preIndex, output);
  }
  return output;
}

function handleButtonClick(buttonInput) {
  inputElement.innerHTML = '';
  document.getElementById('memory').innerHTML = '';
  console.log(buttonInput);

  if (resultElement.innerHTML === 'Error') {
    resultElement.innerHTML = '';
  }

  switch (buttonInput) {
    case 'C':
      input = '';
      inputElement.innerHTML = '';
      resultElement.innerHTML = '';
      break;

    case 'x':
      input += '*';
      resultElement.innerHTML += '*';
      break;

    case '=':
      if (input !== '') {
        input = eval(input) + '';
        if (resultElement.innerHTML !== input) {
          inputElement.innerHTML = resultElement.innerHTML + '=';
          resultElement.innerHTML = eval(resultElement.innerHTML) + '';
          input = resultElement.innerHTML;
        }
      }
      break;

    case '\u232B':
      input = input.substring(0, input.length - 1);
      resultElement.innerHTML = resultElement.innerHTML.substring(0, resultElement.innerHTML.length - 1);
      break;

    case 'mc':
      memory = 0;
      break;

    case 'm+':
      memory += Number(eval(input));
      document.getElementById('memory').innerHTML = 'm+';
      break;

    case 'm-':
      memory -= Number(eval(input));
      document.getElementById('memory').innerHTML = 'm-';
      break;

    case 'mr':
      resultElement.innerHTML = memory;
      document.getElementById('memory').innerHTML = 'mr';
      break;

    case '%':
      input += '/(100)';
      resultElement.innerHTML += '/(100)';
      break;

    case '1/x':
      inputElement.innerHTML = '1/(' + resultElement.innerHTML + ')=';
      resultElement.innerHTML = eval(1 / eval(resultElement.innerHTML));
      input = resultElement.innerHTML;
      break;

    default:
      input += buttonInput;
      resultElement.innerHTML += buttonInput;
  }

  if (resultElement.innerHTML === 'NaN') {
    resultElement.innerHTML = 'Error';
  }
}

// Listen for keyboard events
document.addEventListener('keydown', function (event) {
  const key = event.key;
  if (key === 'Enter') {
    handleButtonClick('=');
  } else if (key === 'Escape') {
    handleButtonClick('C');
  } else if (key === 'Backspace') {
    handleButtonClick('\u232B');
  } else if (key === '/' || key === '*' || key === '-' || key === '+' || key === '.') {
    handleButtonClick(key);
  } else if (key >= '0' && key <= '9') {
    handleButtonClick(key);
  }
});

// Listen for button clicks
const buttons = document.querySelectorAll('button');
for (const button of buttons) {
  button.addEventListener('click', function (event) {
    const buttonInput = event.target.innerHTML;
    handleButtonClick(buttonInput);
  });
}
