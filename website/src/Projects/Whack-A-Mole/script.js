let hole = document.querySelector(".hole")
let ground = document.querySelector(".ground")
let score = 0;
let scoreboard = document.querySelector(".scoreBoard")
for (let i = 0; i < 8; i++) {
    ground.append(hole.cloneNode(true))
}

function whacked(mole){
    scoreboard.innerHTML="Score : " + ++score;
    mole.style.display = "none";
}
moles = document.querySelectorAll(".mole")
moles.forEach((mole)=>{
    mole.setAttribute('draggable', "false");
    mole.addEventListener("click",()=>{
        whacked(mole);
    })
})
function showMole(){
    let selectedMole = Math.floor(Math.random() * (8))
    moles[selectedMole].style.display = "block";
    setTimeout(()=>{moles[selectedMole].style.display = "none"},750)
}
setInterval(showMole,2000)