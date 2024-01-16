const PAPER = 1;
const SCISSORS = 2;
const ROCK = 3;

const gameElements = {
  resultHtml: document.getElementById("result"),
  gameHtml: document.getElementById("game"),
  playerHtml: document.getElementById("player"),
  computerHtml: document.getElementById("computer"),
  resultTextHtml: document.getElementById("result-text"),
  scoreHtml: document.getElementById("score"),
};

const Main = {
  score: 0,
  player: null,
  computer: null,
  result: "",

  play(type) {
    this.computer = this.getRandomItem([PAPER, SCISSORS, ROCK]);
    this.player = type;

    this.updateImages(type, this.computer);
    this.calculateResult();
    this.displayResult();
  },

  getRandomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
  },

  updateImages(playerType, computerType) {
    gameElements.playerHtml.src = `./assets/svg/icon-${this.getTypeName(
      playerType
    )}.svg`;
    gameElements.computerHtml.src = `./assets/svg/icon-${this.getTypeName(
      computerType
    )}.svg`;
  },

  getTypeName(type) {
    switch (type) {
      case PAPER:
        return "paper";
      case SCISSORS:
        return "scissors";
      case ROCK:
        return "rock";
      default:
        return "";
    }
  },

  calculateResult() {
    if (this.player === this.computer) {
      this.result = "Draw";
    } else if (
      (this.player === PAPER && this.computer === ROCK) ||
      (this.player === SCISSORS && this.computer === PAPER) ||
      (this.player === ROCK && this.computer === SCISSORS)
    ) {
      this.result = "You win";
      this.score++;
    } else {
      this.result = "You Lose";
      this.score--;
    }
  },

  displayResult() {
    this.hideElement(gameElements.gameHtml);
    this.showElement(gameElements.resultHtml);
    gameElements.resultTextHtml.textContent = this.result;
    gameElements.scoreHtml.textContent = this.score;
  },

  hideElement(element) {
    element.classList.add("hidden");
    element.classList.remove("block");
  },

  showElement(element) {
    element.classList.remove("hidden");
    element.classList.add("block");
  },

  playAgain() {
    this.showElement(gameElements.gameHtml);
    this.hideElement(gameElements.resultHtml);
  },
};
