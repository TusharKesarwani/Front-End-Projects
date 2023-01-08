const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp=false;
let score = 0;


moles.forEach(mole => mole.addEventListener('click',bonk));


function randomTime(min, max){
    return Math.round(Math.random() * (max-min) + min);
}


function randomHole(holes){
    //console.log(holes.length); //You can check the whole node list of holes available
    const idx = Math.floor(Math.random() * holes.length);
    const hole=holes[idx];
    //but we do not want the same hole to repeat and make the mole pop twice
    if(hole === lastHole){
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}


function pop(){
    const time = randomTime(200, 1000); //time for which moles will pop
    const hole = randomHole(holes);
    hole.classList.add('up');   //this will trigger the css with class up
    setTimeout(() => {
        hole.classList.remove('up');
        if(!timeUp) pop();      //if time is not up keep on popping
    } ,time);
}


function bonk(e){
    if(!e.isTrusted) return;    //to stop cheaters from facking click and only true click works
    score++;
    this.classList.remove('up');
    scoreBoard.textContent=score;
}


function startGame(){
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    pop();
    setTimeout(() => timeUp = true, 45000)
}