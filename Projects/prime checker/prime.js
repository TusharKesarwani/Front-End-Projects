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
    // if (newtext == 1) {
    //     res.innerHTML = (`${newtext} is neither prime nor composite number.`);
    // }
    let isPrime = true;
    if (newtext == 2) {
        res.innerHTML = (`${newtext} is an even and prime number.`);
    }
    else if (newtext % 2 == 0) {
        res.innerHTML = (`${newtext} is an Even number.`);
    }
    else {
        for (let i = 2; i < newtext; i++) {
            if (newtext % i == 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            res.innerHTML = (`${newtext} is an odd and prime number.`);
        } else {
            res.innerHTML = (`${newtext} is an odd number.`);
        }
    }
}
// });value;