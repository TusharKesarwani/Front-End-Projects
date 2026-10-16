class ColorGame {
    constructor() {
        this.colors = [
            '#FF0000', '#00FF00', '#0000FF', '#FFFF00', 
            '#FF00FF', '#00FFFF', '#FFA500', '#800080',
            '#008000', '#800000', '#008080', '#000080'
        ];
        this.score = 0;
        this.targetColor = '';
        this.optionsContainer = document.querySelector('.options-container');
        this.colorBox = document.querySelector('.box-color');
        this.gameStatus = document.querySelector('.game-status');
        this.scoreElement = document.querySelector('.score');
        this.newGameButton = document.querySelector('.new-game-btn');

        this.newGameButton.addEventListener('click', () => this.resetGame());
        this.startNewGame();
    }

    resetGame() {
        this.score = 0;
        this.updateScore();
        this.startNewGame();
    }

    updateScore() {
        this.scoreElement.textContent = `Score: ${this.score}`;
    }

    startNewGame() {
        this.gameStatus.textContent = '';
        this.gameStatus.className = 'game-status';
        this.optionsContainer.innerHTML = '';
        
        const shuffledColors = [...this.colors]
            .sort(() => Math.random() - 0.5)
            .slice(0, 6);
        
        this.targetColor = shuffledColors[Math.floor(Math.random() * 6)];
        this.colorBox.style.backgroundColor = this.targetColor;

        shuffledColors.forEach(color => {
            const button = document.createElement('button');
            button.className = 'color-option';
            button.setAttribute('data-testid', 'colorOption');
            button.style.backgroundColor = color;
            button.addEventListener('click', () => this.checkGuess(color));
            this.optionsContainer.appendChild(button);
        });
    }

    checkGuess(color) {
        if (color === this.targetColor) {
            this.score++;
            this.updateScore();
            this.gameStatus.textContent = 'Correct!';
            this.gameStatus.className = 'game-status correct-animation';
            setTimeout(() => this.startNewGame(), 1000);
        } else {
            this.gameStatus.textContent = 'Wrong!';
            this.gameStatus.className = 'game-status wrong-animation';
            setTimeout(() => this.resetGame(), 1000);
        }
    }
}

new ColorGame();
