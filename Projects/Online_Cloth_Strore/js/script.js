let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let header = document.querySelector('.header-2');

menu.addEventListener('click', () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

window.onscroll = () =>{
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');

    if(window.scrollY > 150){
        header.classList.add('active');
    }else{
        header.classList.remove('active');
    }

}

let countDate = new Date('june 1, 2022 00:00:00').getTime();

function CountDown(){

    let now = new Date().getTime();
    gap = countDate - now;

    let second = 1000;
    let minute = second * 60;
    let hour = minute * 60;
    let day = hour * 24;

    let d = Math.floor(gap / (day));
    let h = Math.floor((gap % (day)) / (hour));
    let m = Math.floor((gap % (hour)) / (minute));
    let s = Math.floor((gap % (minute)) / (second));

    document.getElementById('day').innerText = d;
    document.getElementById('hour').innerText = h;
    document.getElementById('minute').innerText = m;
    document.getElementById('second').innerText = s;

}

setInterval(function(){
    CountDown();
},1000)



// Home Page on Load Function
window.onscroll = function(){
    var button = document.getElementById('topButton');
    if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        button.style.display = "block";
    } else {
        button.style.display = "none";
    }
}

// Read More and Read Less function
var readMore = document.getElementById('read-more');

readMore.addEventListener("click", function(event){
    event.preventDefault();
    document.getElementById('more-text').style.display = "block";
    document.getElementById('read-more').style.display = "none";
    document.getElementById('read-less').style.display = "block";
});


var readLess = document.getElementById("read-less");
readLess.addEventListener("click", function(event){
    event.preventDefault();
    document.getElementById('more-text').style.display = "none";
    document.getElementById('read-more').style.display = "block";
    document.getElementById('read-less').style.display = "none";
});


// Go to top function
function goToTop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
function onLoad() {
    alert('This website is using fontawesome and google fonts . Please make sure to have internet access for better experience');
}

function scrollToNewsletter(){
    document.getElementById('newsletter').scrollIntoView();
}



// counter
