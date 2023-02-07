let text = document.getElementById("text");
let faculty = document.getElementById("faculty");
let faculty2 = document.getElementById("faculty-2");
let flies = document.getElementById("flies");
let bird = document.getElementById("bird");
let bird2 = document.getElementById("bird-2");
window.addEventListener("scroll", function () {
  let value = window.scrollY;

  text.style.top = 45 + value * -0.1 + "%";
  bird.style.left = 80 + value * -0.2 + "%";
  bird.style.top = 10 + value * -0.001 + "%";
  bird2.style.left = 10 + value * +0.2 + "%";
  bird2.style.top = 20 + value * -0.1 + "%";
});

// second  *************          *****************         sec *****************
let info = document.querySelectorAll(".info");

function fst() {
  info[0].classList.add("active");
  info[1].classList.remove("active");
  info[2].classList.remove("active");
}
function sec() {
  info[1].classList.add("active");
  info[0].classList.remove("active");
  info[2].classList.remove("active");
}
function thd() {
  info[2].classList.add("active");
  info[1].classList.remove("active");
  info[0].classList.remove("active");
}

let bar = document.getElementById("bar");
let ex = document.getElementById("ex");
let menu = document.getElementById("menu");

bar.addEventListener("click", function () {
  menu.style.display = "flex";
  ex.style.display = "block";
  bar.style.display = "none";
});

ex.addEventListener("click", function () {
  menu.style.display = "none";
  ex.style.display = "none";
  bar.style.display = "block";
});

// ************

let video = document.getElementById("video");
let figure = document.getElementById("figure");
let exit = document.getElementById("exit");
let overlay = document.getElementById("overlay");
// console.log(video, figure, exit, overlay);
figure.addEventListener("click", function () {
  video.style.display = "block";
  exit.style.display = "block";
  overlay.style.zIndex = "5";
});

exit.addEventListener("click", function () {
  video.style.display = "none";
  exit.style.display = "none";
  overlay.style.zIndex = "-100";
});

video.addEventListener("blur", function () {
  video.style.display = "none";
  exit.style.display = "none";
  overlay.style.zIndex = "-100";
  video.pause();
});
