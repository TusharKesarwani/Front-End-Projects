document.querySelector('button').addEventListener("click",(event)=>{
    toss();
})

function toss(){
    setTimeout(() => {
        document.querySelector('#ball').style.animation='slide-top1 1.5s linear';
    },0);
    setTimeout(() => {
        document.querySelector('#ball').style.animation='slide-top2 1.5s linear';
    }, 1500);
    setTimeout(() => {
        document.querySelector('#ball').style.animation='slide-top3 1.5s linear';
    }, 3000);
}