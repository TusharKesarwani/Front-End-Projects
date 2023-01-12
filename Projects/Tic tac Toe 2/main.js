let turn = "X";
let finish = false;
let aud1 = new Audio('Ting Sound Effect.mp3');
//change turn 
const changeTurn = function () {

  return turn === "X" ? "0" : "X";
}

//winChance
const winChance = function () {
  let wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
  [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  let boxtests = document.getElementsByClassName('boxtext');
  wins.forEach((element) => {
    if ((boxtests[element[0]].innerText === boxtests[element[1]].innerText) && (boxtests[element[2]].innerText === boxtests[element[1]].innerText) && (boxtests[element[0]].innerText !== "")) {
      document.querySelector('.side1').innerText = boxtests[element[0]].innerText + " " + "won"
      finish = true
      document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width="200px";   
    }
  });

}

//game logic

const gameLogic = function () {
  let boxes = document.getElementsByClassName("box");
  Array.from(boxes).forEach((element) => {
    let boxtest = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
      if (boxtest.innerText === '') {
        boxtest.innerText = turn;
        aud1.play();
        turn = changeTurn();
        winChance();
        if(!finish){
         document.getElementsByClassName("side1")[0].innerText = "Turn for" + turn;
         }
      }
    });
  });
}

gameLogic();
 

//reset button
let reset = document.getElementById('btn');
reset.addEventListener('click',function(){
  let boxtests = document.getElementsByClassName('boxtext');
  Array.from(boxtests).forEach((element)=>{
    element.innerText=" ";
  })
  finish=false;
  turn="X";
  document.getElementsByClassName("side1")[0].innerText = "Turn for" + turn;
  document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width="0px";   
})