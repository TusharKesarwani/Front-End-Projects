import Ball from "./ball.js";
import Paddle from "./Paddle.js";
import { playSound } from "./ball.js";
// define variable for diffrent elements of web page
const ball = new Ball(document.getElementById("ball"));
const player_paddle = new Paddle(document.getElementById("player-paddle"));
const computer_paddle = new Paddle(document.getElementById("computer-paddle"));
const score_of_player = document.getElementById("player-score");
const score_of_computer = document.getElementById("computer-score");
const set_time = document.getElementById("set-time");
const start = document.getElementById("start");
const result_box = document.getElementById("result-box");
const close_result_box_btn = result_box.firstElementChild;

let last_time;
let timespent = 0;

//Function to start the game
function update(time) {
  if (last_time != null) {
    const diff = time - last_time;
    timespent += parseInt(diff) / 1000;
    document.getElementById("clock").innerText = Math.floor(timespent);
    ball.update(diff, [player_paddle.rect(), computer_paddle.rect()]);

    computer_paddle.update(diff, ball.y);

    if (isloose()) {
      handlelose();
    }
  }
  last_time = time;
  if (timespent >= parseInt(set_time.value)) {
    declare_winner();
    return;
  }
  window.requestAnimationFrame(update);
}
//Function to increment score
function handlelose() {
  const rect = ball.rect();
  if (rect.right >= window.innerWidth) {
    playSound("sounds/gainpoint.mp3");
    score_of_player.innerText = parseInt(score_of_player.innerText) + 1;
  }

  if (rect.left <= 0) {
    playSound("sounds/losspoint.mp3");
    score_of_computer.innerText = parseInt(score_of_computer.innerText) + 1;
  }

  ball.reset();
  computer_paddle.reset();
}
//Check whether ball is in between two paddles
function isloose() {
  const rect = ball.rect();
  return rect.right >= window.innerWidth || rect.left <= 0;
}

//Function to move player_paddle
window.onkeydown = function (e) {
  if (e.keyCode == 38 && player_paddle.position >= 12)
    player_paddle.position = player_paddle.position - 2;

  if (e.keyCode == 40 && player_paddle.position <= 88)
    player_paddle.position = player_paddle.position + 2;
};

//Adding on click to start button
start.addEventListener("click", () => {
  if (set_time.value === "") alert("Enter Duration of game");
  else {
    document.getElementById("set-time").style.display = "none";
    document.getElementById("start").disabled = true;
    document.getElementById("refresh").disabled = true;
    document.getElementById("clock").style.display = "block";
    window.requestAnimationFrame(update);
  }
});

// Function to find winner
function declare_winner() {
  result_box.style.display = "block";
  if (
    parseInt(score_of_player.innerText) > parseInt(score_of_computer.innerText)
  ) {
    document.getElementById("result").innerText = "You won";
    document.getElementById("result").style.color = "Green";
  } else if (
    parseInt(score_of_player.innerText) ===
    parseInt(score_of_computer.innerText)
  ) {
    document.getElementById("result").innerText = "Match Tied";
    document.getElementById("result").style.color = "Blue";
  } else {
    document.getElementById("result").innerText = "You lost";
    document.getElementById("result").style.color = "Red";
  }
  document.getElementById("refresh").disabled = false;
}

//Reset everything
document.getElementById("refresh").addEventListener("click", () => {
  ball.x = 50;
  ball.y = 50;
  computer_paddle.position = 50;
  player_paddle.position = 50;
  last_time = null;
  timespent = 0;
  document.getElementById("clock").style.display = "none";
  document.getElementById("clock").innerText = 0;
  set_time.value = "";

  document.getElementById("set-time").style.display = "block";
  document.getElementById("set-time").disabled = false;
  document.getElementById("start").disabled = false;
  document.getElementById("refresh").disabled = false;
  score_of_player.innerText = "0";
  score_of_computer.innerText = "0";
});

//to close the result box
close_result_box_btn.addEventListener("click", () => {
  if (result_box.style.display == "block") {
    result_box.style.display = "none";
  } else {
    result_box.style.display = "block";
  }
});
