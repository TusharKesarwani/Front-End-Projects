const choices = ["snake", "water", "gun"];
let playerScore = 0;
let computerScore = 0;

const snakeButton = document.getElementById("snake-button");
const waterButton = document.getElementById("water-button");
const gunButton = document.getElementById("gun-button");
const computerChoiceText = document.getElementById("computer-choice-text");
const resultText = document.getElementById("result-text");

snakeButton.addEventListener("click", function() {
  playGame("snake");
});

waterButton.addEventListener("click", function() {
  playGame("water");
});

gunButton.addEventListener("click", function() {
  playGame("gun");
});

function playGame(playerChoice) {
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  computerChoiceText.innerHTML = computerChoice;

  if (playerChoice === "snake" && computerChoice === "gun") {
    resultText.innerHTML = "Congratulations You win!";
    playerScore++;
  } else if (playerChoice === "snake" && computerChoice === "water") {
    resultText.innerHTML = "Computer Wins!!";
    computerScore++;
  } else if (playerChoice === "water" && computerChoice === "snake") {
    resultText.innerHTML = "Congratulations You win!";
    playerScore++;
  } else if (playerChoice === "water" && computerChoice === "gun") {
    resultText.innerHTML = "Computer Wins!!";
    computerScore++;
  } else if (playerChoice === "gun" && computerChoice === "snake") {
    resultText.innerHTML = "Computer Wins!!";
    computerScore++;
  } else if (playerChoice === "gun" && computerChoice === "water") {
    resultText.innerHTML = "Congratulations You win!";
    playerScore++;
  } else {
    resultText.innerHTML = "It's a tie.";
  }
}
