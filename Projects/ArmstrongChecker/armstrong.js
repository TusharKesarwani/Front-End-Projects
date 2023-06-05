const textinput = document.querySelector(".text");
console.log(textinput);
const res = document.getElementById("demo");
const checkbtn = document.getElementById("btn");
function textfxn() {
    res.innerHTML = "";
    let text = document.getElementById("text").value;
    let newtext = text.replace(/[^0-9]/g, '');
    let alphatext = text.replace(/[0-9]/g, '');
    console.log(newtext, alphatext);

    if (newtext && !alphatext) {
        checkbtn.style.opacity = "1";
        document.getElementById("btn").addEventListener("click", check);
        checkbtn.classList.add("buttonjs");
    }
    else {
        checkbtn.style.opacity = "0.25";
        checkbtn.classList.remove("buttonjs");
    }
}

function checkArmstrong() {
    var input = document.getElementById("text").value;
    var result = document.getElementById("result");

    // Check if the input is a positive number
    if (input === "" || isNaN(input) || parseInt(input) <= 0) {
        result.innerHTML = "Please enter a positive number.";
        return;
    }

    var number = parseInt(input);
    var numberOfDigits = input.length;
    var sum = 0;
    var temp = number;

    // Calculate the sum of digits raised to the power of the number of digits
    while (temp > 0) {
        var digit = temp % 10;
        sum += Math.pow(digit, numberOfDigits);
        temp = Math.floor(temp / 10);
    }

    // Check if it is an Armstrong number
    if (sum === number) {
        result.innerHTML = number + " is an Armstrong number.";
    } else {
        result.innerHTML = number + " is not an Armstrong number.";
    }
}
