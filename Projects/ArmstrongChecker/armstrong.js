const textinput = document.querySelector("#text");
// console.log(textinput);
const res = document.getElementById("demo");
const invalid = document.getElementById("invalid");
const checkbtn = document.getElementById("btn");

function textfxn() {
  // let text = document.getElementById("text").value;
//   res.innerHTML = "";
  invalid.innerHTML = "";
  const text = textinput.value;
  const hasOnlyNumbers = /^\d+$/.test(text);
  console.log(text, hasOnlyNumbers);

  if (text && hasOnlyNumbers) {
    checkbtn.style.opacity = "1";
    checkbtn.classList.add("buttonjs");
    document.getElementById("btn").addEventListener("click", check);
    checkbtn.disabled = false;
    // document.getElementById("btn").addEventListener("enter",check );
  } else {
    if (text) {
      invalid.innerHTML = "Invalid Input: Please use numbers only.";
    }
    // alert("invalid input!");
    checkbtn.style.opacity = "0.25";
    checkbtn.classList.remove("buttonjs");
    checkbtn.disabled = true;
    // window.location.reload();
  }
}

function check() {
  if (checkbtn.disabled) {
    return;
  }
  res.innerHTML="";

  const numStr = textinput.value;
  const numberOfDigits = numStr.length;
  let sum = 0;
  let temp = parseInt(numStr, 10);

  // An empty input shouldn't be checked
  if (numStr === "") {
    return;
  }

  while (temp > 0) {
    const remainder = temp % 10;
    sum += remainder ** numberOfDigits;
    temp = parseInt(temp / 10, 10);
  }

  if (sum == numStr) {
    res.innerHTML = `${numStr} is an Armstrong number ✨`;
  } else {
    res.innerHTML = `${numStr} is not an Armstrong number.`;
  }
}
// });value;
// textinput.addEventListener("keyup", textfxn);
checkbtn.addEventListener("click", check);
textinput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    check();
  }
});
textfxn();
