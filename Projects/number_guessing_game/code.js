let msg1 = document.getElementById("message1");
let msg2 = document.getElementById("message2");
let msg3 = document.getElementById("message3");
let answer = Math.trunc(Math.random() * 100) + 1;
let no_of_guesses = 0;
var guesses_num = [];

function play() {
  var user_guess = document.getElementById("guess").value;

  if (user_guess < 1 || user_guess > 100) {
    alert("Please Enter  a number Between 1 to 100");
  } else {
    guesses_num.push(user_guess);
    no_of_guesses += 1;

    if (user_guess < answer) {
      msg1.textContent = "Your Guess is Too low";
      msg2.textContent = "No. Of Guesses : " + no_of_guesses;
      msg3.textContent = "Guessed Number Are: " + guesses_num;
    } else if (user_guess > answer) {
      msg1.textContent = "Your Guess is Too High";
      msg2.textContent = "No. Of Guesses : " + no_of_guesses;
      msg3.textContent = "Guessed Number Are: " + guesses_num;
    } else if (user_guess == answer) {
      msg1.textContent = "Yayyyyy You won It!!";

      document.querySelector("body").style.background =
        "linear-gradient(to right, #000428 , #004e92)";

      msg2.textContent = "the Number was " + answer;
      msg3.textContent = " You guessd it in " + no_of_guesses + " " + "Guesses";
      // disable the guess button if won
      document.getElementById("my_btn").disabled = true;
    }
  }
}

document.querySelector(".again").addEventListener("click", function () {
  answer = Math.trunc(Math.random() * 100) + 1;

  no_of_guesses = 0;
  guesses_num = [];
  msg1.textContent = "No. of Guesss : 0";
  msg2.textContent = "Guessed number are : none";
  msg3.textContent = "";
  document.querySelector("body").style.background =
    "linear-gradient(to right, #7f53ac, #657ced)";

  document.querySelector("#guess").value = "";
});
