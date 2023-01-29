let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('pow-90398.mp3');
const gameOverSound = new Audio('hiss3-103123.mp3');
const moveSound = new Audio('snake-hissing-6092.mp3');
const musicSound = new Audio('music.mp3');
let speed = 3;
let score =0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
food={ x: 6, y: 7 };


//Game Function
function main(ctime) {

    window.requestAnimationFrame(main);
    // console.log(ctime)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

}
function isCollide(snake){
    //if u bump into urself
    for (let i = 1; i< snakeArr.length; i++) {
        // const element = array[index];
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // If you bump into the wall;
    if(snake[0].x>= 18 || snake[0].x <=0 ||snake[0].y >= 18 || snake[0].y<=0){
           return true;
        }
        return false;
    
}
    

function gameEngine() {
    //part1:updating the sanke array &food
    if(isCollide(snakeArr)){
        score += 1;
        score.innerHTML="Score"+score;
        musicSound.play();
        inputDir = { x: 0,y:0};
        alert("Game Over.Press any key to play again.");
        snakeArr =[ { x: 13, y: 15 }];
        // musicSound.play();
        score = 0;
    }

    //If u have eaten the food, increment and regenerate the food.
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodSound.play();
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x,  y: snakeArr[0].y + inputDir.y});
        let a=2;
        let b=16;
        food = {x : Math.round(a + (b-a)* Math.random()),y : Math.round(a + (b-a)* Math.random())}
    }
    //moving the snake
    for(let i =snakeArr.length-2; i>=0; i-- ){
        // const element =array[i];
        snakeArr[i+1]={...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    


    //pert2:Display the snake 
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        sankeElement = document.createElement('div');
        sankeElement.style.gridRowStart = e.y;
        sankeElement.style.gridColumnStart = e.x;
        // sankeElement.classList.add('snake')
        if(index === 0){
            sankeElement.classList.add('head');
        }
        else{
            sankeElement.classList.add('snake');
        }
        board.appendChild(sankeElement);
    })
    //Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir ={x:0, y:1}//start the game
    moveSound.play();
    switch(e.key){ 
        case"ArrowUp":
          console.log("ArrowUp");
          inputDir.x= 0;
          inputDir.y= -1;
          break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x= 0;
            inputDir.y= 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x= -1;
            inputDir.y= 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1 ;
            inputDir.y=0 ;
            break;
        default:
            break;
        
    }
})