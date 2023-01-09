window.onload = function () {

    start();
}

let main = document.createElement("main");
main.setAttribute("id", "main");


let paragraph = document.createElement("p");
paragraph.setAttribute("id", "paragraph");
paragraph.innerHTML = "START GAME";

let divChoice = document.createElement("div");
divChoice.setAttribute("class", "divChoice");

let divScore = document.createElement("div");
divScore.setAttribute("class", "divScore");

let divImg = document.createElement("div");
divImg.setAttribute("id", "divImg");


let button = document.createElement("button");
button.setAttribute("id", "startButton");
button.innerHTML = "button";


let stone = document.createElement("button");
stone.setAttribute("id", "stone");
stone.innerHTML = "rock";

let paper = document.createElement("button");
paper.setAttribute("id", "paper");
paper.innerHTML = "paper";

let scissor = document.createElement("button");
scissor.setAttribute("id", "scissor");
scissor.innerHTML = "scissor";


let restart = document.createElement("button");
restart.setAttribute("id", "restart");
restart.innerHTML = "RESTART GAME";


let imgChoice = document.createElement("img");
imgChoice.setAttribute("id", "ImgChoice");

let random = document.createElement("p"); 
random.setAttribute("id", "computerChoice");
random.innerHTML = "COMPUTER CHOICE";


let wins = 0;

let lost = 0;

let draws = 0;


let winner = document.createElement("p");
winner.setAttribute("id", "winner");
winner.innerHTML = " WINNER : " + wins;

let loser = document.createElement("p");
loser.setAttribute("id", "loser")
loser.innerHTML = "LOSER : " + lost;

let draw = document.createElement("p");
draw.setAttribute("id", "draw");
draw.innerHTML = "DRAW : " + draws;



const computerChoice = ["STONE", "PAPER", "SCISSOR"];

function start() {
    let starter = document.getElementById("start");

    starter.appendChild(main);

    main.appendChild(paragraph);

    main.appendChild(button);

    button.addEventListener("click", board_Game);
}



function board_Game() {

    let starter = document.getElementById("start");
    let delete_Paragraph = document.getElementById("paragraph");
    let delete_Button = document.getElementById("startButton");
    delete_Paragraph.remove();
    delete_Button.remove();

    let paragraph = document.createElement("p");
    paragraph.setAttribute("id", "introduction");
    paragraph.innerHTML = "ROCK SCISSOR PAPER";

    starter.appendChild(paragraph);

    starter.appendChild(divChoice);
    starter.appendChild(divScore);
    starter.appendChild(divImg);


    divChoice.appendChild(stone);
    divChoice.appendChild(paper);
    divChoice.appendChild(scissor);

    divScore.appendChild(winner);
    divScore.appendChild(loser);
    divScore.appendChild(draw);
    imgChoice.src = "img/robot.png";
    divImg.appendChild(imgChoice)

    stone.addEventListener("click", stones);
    scissor.addEventListener("click", scissors);
    paper.addEventListener("click", papers);
    starter.appendChild(restart);


    restart.addEventListener("click", restart_Game);
}

function restart_Game() {
    wins = 0;
    draws = 0;
    lost = 0;
    let startImage = document.getElementById("ImgChoice");
    startImage.src = "img/robot.png";
    document.getElementById("draw").innerHTML = "DRAW: " + draws;
    document.getElementById("winner").innerHTML = "WINNER: " + wins;
    document.getElementById("loser").innerHTML = "LOSER: " + lost;

}




function stones(computer, player) {
    let l = document.getElementById("loser");
    let w = document.getElementById("winner");
    let d = document.getElementById("draw");

    player = "STONE";

    let cc = Math.floor(Math.random() * 3);

    computer = computerChoice[cc];
    imgOutput(computer);

    if (player === computer) {
        draws++;
        random.innerHTML = computer;
        d.innerHTML = "DRAW: " + draws;
        console.log(computer);


    }
    else if (computer === "PAPER") {
        lost++;
        random.innerHTML = computer;


        l.innerHTML = "LOSER: " + lost;

    }
    else {
        wins++;
        random.innerHTML = computer;

        w.innerHTML = "WINNER: " + wins;

    }


}


function scissors(computer, player) {

    let l = document.getElementById("loser");
    let w = document.getElementById("winner");
    let d = document.getElementById("draw");

    player = "SCISSOR";


    let cc = Math.floor(Math.random() * 3);

    computer = computerChoice[cc];
    imgOutput(computer);



    if (player === computer) {
        draws++;
        d.innerHTML = "DRAW: " + draws;
        random.innerHTML = computer;

    }

    else if(computer === "STONE") {

        lost++;

        l.innerHTML = "LOSER: " + lost;
        random.innerHTML = computer;


    }
    
    else {
        wins++;
        w.innerHTML = "WINNER: " + wins;

        random.innerHTML = computer;

    }

}


function papers(computer, player) {

    let l = document.getElementById("loser");
    let w = document.getElementById("winner");
    let d = document.getElementById("draw");

    player = "PAPER";


    let cc = Math.floor(Math.random() * 3);

    computer = computerChoice[cc];
    imgOutput(computer);


    if (player === computer) {
        draws++;
        d.innerHTML = "DRAW: " + draws;
        random.innerHTML = computer;

    }

    else if (computer === "SCISSOR") {

        console.log(computer);

        lost++;

        l.innerHTML = "LOSER: " + lost;
        random.innerHTML = computer;


    }
    else {
        wins++;
        w.innerHTML = "WINNER: " + wins;
        random.innerHTML = computer;


    }

}

    function imgOutput(computerImg){

        let starter = document.getElementById("divImg");
        console.log(starter)
        console.log(computerImg)
    
        if(computerImg == "STONE"){
            imgChoice.src = "img/rock.png";
            starter.appendChild(imgChoice);
        }
        else if(computerImg == "PAPER"){
            imgChoice.src = "img/paper.png";
            starter.appendChild(imgChoice);

        }
        else{
            imgChoice.src = "img/scissor.png";
            starter.appendChild(imgChoice);

        }
    
    }


