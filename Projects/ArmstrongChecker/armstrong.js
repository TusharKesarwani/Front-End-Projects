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

function check() {
    let text = document.getElementById("text").value;
    let newtext = text.replace(/[^0-9]/g, '');
    const numberOfDigits = newtext.length;
    let temp = newtext;
    let sum = 0;
    while (temp > 0) {
        let remainder = temp % 10;
        sum += remainder ** numberOfDigits;
        temp = parseInt(temp / 10);
    }
    if (sum == newtext) {
        res.innerHTML = (`${newtext} is an Armstrong number`);
    }
    else {
        res.innerHTML = (`${newtext} is not an Armstrong number.`);
    }
}
// });value;