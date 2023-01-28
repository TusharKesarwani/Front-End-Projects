const playButton = document.getElementById('startBtn');
const startGameContainer = document.getElementById('start');
const inGameContainer = document.getElementById('gameContainer');

//Importing Sound
//const gameStartSound = new Audio('./sound/Game-start.wav')
//const gameEndSound = new Audio('./sound/Game-over.wav')
const bombTouchSound = new Audio('./sound/gank.wav')
//const timeBeepSound = new Audio('./sound/time-beep.wav')
const buttonPushSound = new Audio('./sound/ui-button-push.wav')

let isSwordSoundPlaying = false;
//Sword Sound Effect
const playSwordSound = ()=>{
    //Generating a random audio by random number as per source sound name
    let swordAudio = new Audio(`./sound/Sword_Sound_Effects/Sword-swipe-${Math.floor(Math.random() * 6) + 1}.wav`);
    swordAudio.play();
    //Setting this true to not to play more audio before this ends.
    isSwordSoundPlaying = true;
    swordAudio.addEventListener('ended',()=>{

        isSwordSoundPlaying = false;
    })

}

//Game Status Variables
let isGameStarted = false;
let isGamePause = false;
let isGameEnd = false;


//Using Visibility change to prevent rendering balls when the tab is inactive
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        isGamePause = false;
    } else {
        isGamePause = true;
    }

})

//Front Home Play Button
playButton.addEventListener('click', () => {
    startGameContainer.style.display = 'none';
    inGameContainer.style.display = 'flex';
    alertTimer();
    //Set Score to  0
    score = 0;
    updateScore(0);
    //gameStartSound.play();
    isGameStarted = true;
    isGameEnd = false;

    //Using set time out to start the rendering balls after the alert timer function completes
    setTimeout(() => {
        animate();
        startRenderingBallsInterval();
        startGameTimer();
    }, 4000)
})

//Count Down Function
const alertTimer = () => {
    const countDownContainer = document.getElementById('countDown');
    let currentSecond = 3;
    let timerInterval = setInterval(() => {
        countDownContainer.innerHTML = ``;
        countDownContainer.innerHTML = `<h1>${currentSecond}</h1>`;
        currentSecond -= 1;
        if (currentSecond < 0) {
            clearInterval(timerInterval);
            countDownContainer.innerHTML = ``;
            isGamePause = false;
            return
        }
        //timeBeepSound.play()
    }, 1000)
}

//Game timer function
const startGameTimer = () => {
    if (!isGameStarted) {
        return
    }
    //Number of Minutes the game should run.
    let minutesInGame = 2;
    let totalTime = minutesInGame * 60;

    //Interval to update the timer
    let interval = setInterval(() => {

        let min = Math.floor(totalTime / 60);
        let sec = totalTime % 60;

        document.getElementById('gameMinSec').innerHTML = `${min < 10 ? '0' + min : min} : ${sec < 10 ? '0' + sec : sec}`

        totalTime--;
        //When the time is over
        if (totalTime < 0) {
            clearInterval(interval);
            document.getElementById('gameMinSec').innerHTML = `00 : 00`;
            endGameContainer.style.display = 'flex';
            document.getElementById('endScore').innerHTML = score;
            isGameEnd = true;
            isGameStarted = false;
            //gameEndSound.play();
            //Clearing the canvas
            ballArray = [];
            ballParticlesArray = [];
            enemyBombArray = [];
        }
    }, 1000)
}

let score = 0;
//Trying to fetch high score from the local storage, if not use 0;
let highScore = localStorage.getItem('highScore') || 0;
document.getElementById('highscore').innerHTML = highScore;
document.getElementById('high-Score').innerHTML = highScore;


//Function to update score
const updateScore = (noOfScore) => {
    //If noOfScore is in negative
    if (noOfScore + score < 0) {
        score = 0;
        return
    }
    score = score + noOfScore;
    if (score > highScore) {
        localStorage.setItem('highScore', score);
        document.getElementById('highscore').innerHTML = score;
        document.getElementById('high-Score').innerHTML = score;
    }
    document.getElementById('score').innerHTML = score;
}

updateScore(0);

//Main Logic for canvas

const canvas = document.getElementById('canva');

const context = canvas.getContext('2d');


//Set canvas to full Screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//All Elements array
let ballArray = [];
let ballParticlesArray = [];
let enemyBombArray = [];

//Ball Class
function Ball() {

    this.x = Math.floor(Math.random() * window.innerWidth);
    this.y = Math.floor(window.innerHeight);
    this.size = Math.floor((Math.random() * 10) + 35);
    this.color = `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;

    this.speedY = 10;
    this.speedX = Math.round((Math.random() - 0.5) * 4);

    //Updating Ball Position
    this.update = () => {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.speedY -= .1;
    }

    //Rendering or Drawing Ball on the canvas
    this.draw = () => {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
    }
}

//Ball Particles Class
function BallParticles(x, y, color) {

    this.x = x;
    this.y = y;
    this.size = Math.floor(Math.random() * 3 + 8);
    this.color = color;

    this.speedY = Math.random() * 2 - 2;
    this.speedX = Math.round((Math.random() - 0.5) * 10);

    //Updating Ball Particle
    this.update = () => {
        //Decrease size if this.size is greater then .2
        if (this.size > .2) {
            this.size -= .1;
        }
        this.y += this.speedY;
        this.x += this.speedX;
    }

    //Rendering or Drawing Ball on the canvas
    this.draw = () => {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
    }
}


//Enemy Bomb Class
function EnemyBomb() {

    this.x = Math.floor(Math.random() * window.innerWidth);
    this.y = Math.floor(window.innerHeight);
    this.size = Math.floor((Math.random() * 10) + 40);
    this.color = `black`;

    this.speedY = 10;
    this.speedX = Math.round((Math.random() - 0.5) * 4);

    //Updating Bomb Position
    this.update = () => {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.speedY -= .1;
    }

    this.draw = () => {
        context.fillStyle = this.color;
        context.beginPath();
        context.lineWidth = 6;
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.strokeStyle = 'red';
        context.stroke();
        context.fill();
    }
}


let strikeCount = 1;
//Variable to store when was the last ball sliced
let lastBallSlice;

function renderBalls() {
    for (let i = 0; i < ballArray.length; i++) {
        ballArray[i].draw();
        ballArray[i].update();

        //Detection Collision of Mouse Position and Ball Position
        let distanceBetweenMouseAndBall = Math.hypot(mouseX - ballArray[i].x, mouseY - ballArray[i].y)

        //If Mouse is on the ball i.e Collision
        if (distanceBetweenMouseAndBall - ballArray[i].size < 1) {

            //Rendering Ball Particles
            for (let index = 0; index < 8; index++) {
                ballParticlesArray.push(new BallParticles(ballArray[i].x, ballArray[i].y, ballArray[i].color));
            }
            let timeNow = new Date().getTime()
            //Subtracting the timenow by lastBallSlice and if less then .5 second then add the strike
            if (timeNow - lastBallSlice < 500) {
                strikeCount += 1;
                document.getElementById('strikeCountDiv').innerHTML = `<h1 class="strikeCount">${strikeCount}x</h1>`
            } else {
                strikeCount = 1;
                document.getElementById('strikeCountDiv').innerHTML = `<h1 class="strikeCount">${strikeCount}x</h1>`
            }
            lastBallSlice = new Date().getTime();
            //If ball size is less than 40 update score to 3 or 5
            let scoreToUpdate = (ballArray[i].size < 40 ? 3 : 5) + strikeCount;
            updateScore(scoreToUpdate)

            //Splicing the ball from the array
            ballArray.splice(i, 1);
            i--;
            return
        }

        //Splice the ball if it reached the bottom of the screen
        if (ballArray[i].y > window.innerHeight + 10) {
            ballArray.splice(i, 1);
            i--;
        }
    }
}


function renderEnemyBombs() {
    for (let i = 0; i < enemyBombArray.length; i++) {
        enemyBombArray[i].draw();
        enemyBombArray[i].update();

        //Detection Collision of Mouse Position and Ball Position
        let distanceBetweenMouseAndEnemy = Math.hypot(mouseX - enemyBombArray[i].x, mouseY - enemyBombArray[i].y)

        //If Mouse is on the ball i.e Collision
        if (distanceBetweenMouseAndEnemy - enemyBombArray[i].size < 1) {

            if (isGamePause) {
                return
            }
            //Clearing Canvas when player touches the bomb
            ballArray = [];
            ballParticlesArray = [];
            isGamePause = true;
            //Count Down for 3 Seconds
            alertTimer();
            updateScore(-7);
            bombTouchSound.play();
            //Splicing the ball from the array
            enemyBombArray.splice(i, 1);
            i--;
            return
        }

        //Splice the bomb when reached the bottom
        if (enemyBombArray[i].y > window.innerHeight + 10) {
            enemyBombArray.splice(i, 1);
            i--;
        }
    }
}



function renderBallParticles() {
    for (let i = 0; i < ballParticlesArray.length; i++) {
        ballParticlesArray[i].draw();
        ballParticlesArray[i].update();

        //If ball particles size is too small splice from the array
        if (ballParticlesArray[i].size <= .2) {
            ballParticlesArray.splice(i, 1);
            i--;
        }
    }
}

let numberOfBallsToRender = [1, 2, 3, 4, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1];

//SetInterval to render the balls on an interval of 1 second
const startRenderingBallsInterval = () => {
    let interval = setInterval(() => {
        //Clear the interval if the game is end.
        if (isGameEnd) {
            clearInterval(interval)
            return;
        }
        //Return if the game is pause
        if (isGamePause) {
            return
        }
        const numberOfBalls = Math.round(Math.random() * numberOfBallsToRender.length);
        let indexOf = numberOfBallsToRender[numberOfBalls];

        //If the index generated is greater then length of numberOfBallsToRender array, throw a bomb
        if (numberOfBalls >= Math.floor(numberOfBallsToRender.length / 2)) {
            enemyBombArray.push(new EnemyBomb())
        }

        //Number of balls to be rendered on the canvas using for loop
        for (let i = 0; i < indexOf; i++) {
            ballArray.push(new Ball())
        }

    }, 1000)
}


let animationId;

//Animate function to render every....
function animate() {
    context.fillStyle = 'rgba(24,28,31,.5)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    renderBalls();
    renderBallParticles();
    renderEnemyBombs();
    renderMouseLines();
    //Cancel animation when the game is end.
    if (isGameEnd) {
        cancelAnimationFrame(animationId);
        return
    }
    animationId = requestAnimationFrame(animate);
}

// enemyBombArray.push(new EnemyBomb());

let mouseX = 0;
let mouseY = 0;
let prevMouseX = 0;
let prevMouseY = 0;
let isMouseClicked = false;

let linesArray = [];

function renderMouseLines() {
    for (let i = 0; i < linesArray.length; i++) {
        context.strokeStyle = 'white';
        context.beginPath();

        context.moveTo(linesArray[i].x, linesArray[i].y);
        context.lineTo(linesArray[i].pMouseX, linesArray[i].pMouseY);
        context.stroke();
        context.lineWidth= 4;
        context.closePath();
    }
    //If the length of this array is greater then 4 splice the first object of this array using shift();
    if (linesArray.length > 4) {
        if (!isSwordSoundPlaying) {
            playSwordSound();
        }
        linesArray.shift();
        linesArray.shift();
    }
}


//Event listener to detect when left button of mouse is clicked
canvas.addEventListener('mousedown', (e) => {
    prevMouseX = mouseX;
    prevMouseY = mouseY;
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseClicked = true;
})

//When mouse is moving
canvas.addEventListener('mousemove', (e) => {
    if (isMouseClicked) {
        prevMouseX = mouseX;
        prevMouseY = mouseY;
        mouseX = e.clientX;
        mouseY = e.clientY;
        linesArray.push({x: mouseX,y:mouseY,pMouseX: prevMouseX,pMouseY: prevMouseY})
    }
})

//When the mouse button is released
canvas.addEventListener('mouseup', () => {
    mouseX = 0;
    mouseY = 0;
    linesArray = [];
    isMouseClicked = false;
})
//When the mouse is out of the tab or window
canvas.addEventListener('mouseout', () => {
    mouseX = 0;
    linesArray = [];
    mouseY = 0;
    isMouseClicked = false;
})

//Function and imports to return home when game is end.
const returnHomeButton = document.getElementById('returnHome');
const endGameContainer = document.getElementById('gameEnd');

returnHomeButton.addEventListener('click',()=>{
    if (!isGameEnd) {
        return
    }
    buttonPushSound.play();
    endGameContainer.style.display = 'none';
    startGameContainer.style.display = 'flex';
    inGameContainer.style.display = 'none';
})