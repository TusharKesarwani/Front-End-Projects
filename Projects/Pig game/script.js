"use strict";

const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const rollDice = document.querySelector(".btn--roll");
const newGame = document.querySelector(".btn--new");
const holdBtn = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
let playing;
let activePlayer;
let currentScore;
const scores = [0, 0];
const init = () => {
  document.getElementById("name--0").textContent = "Player 1";
  document.getElementById("name--1").textContent = "Player 2";
  playing = true;
  activePlayer = 0;
  currentScore = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add("hidden");

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  current0El.textContent = 0;
  current1El.textContent = 0;
};

init();

const swithPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = 1 - activePlayer;
  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

rollDice.addEventListener("click", () => {
  if (playing) {
    // 1. Display dice
    const random = Math.floor(Math.random() * 6) + 1;
    // 2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${random}.png`;

    // 3. Check for rolled 1
    if (random !== 1) {
      // Add dice to current score
      currentScore += random;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      //Switch to next player
      swithPlayer();
    }
  }
});

holdBtn.addEventListener("click", () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      diceEl.classList.add("hidden");
      playing = false;
      document.getElementById(`name--${activePlayer}`).textContent =
        "Winner 🎉🎉";
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
    } else {
      swithPlayer();
    }
  }
});

newGame.addEventListener("click", () => {
  init();
});
