const navIcon = document.getElementById("nav-icon");
const navBar = document.querySelector(".navbar");
const ball = document.querySelector(".ball");
const moon = document.querySelector(".fa-moon");
const sun = document.querySelector(".fa-sun");
const _switch = document.querySelector(".switch-container");
const box = document.querySelector(".box");

navIcon?.addEventListener("click", () => {
  navBar.classList.toggle("navBarMobile");
  navIcon.classList.toggle("open");
});

let ltheme = localStorage.getItem("theme");
console.log(ltheme);
let theme = ltheme === null ? "light" : ltheme;

_switch?.addEventListener("click", () => {
  console.log("listener ran bruv");
  if (theme === "light") {
    sun.style.transform = "translateX(45px) rotate(250deg) ";
    sun.style.opacity = "0";
    moon.style.transform = "translateX(-45px) rotate(350deg)";
    moon.style.opacity = "1";
    theme = "dark";
  } else {
    sun.style.transform = "translateX(0)";
    sun.style.opacity = "1";
    moon.style.transform = "translateX(0)";
    moon.style.opacity = "0";
    theme = "light";
  }
});

setInterval(() => {
  document.body.className = localStorage.getItem("theme");
  localStorage.setItem("theme", theme);
}, 1);
window.onload = () => {
  if (ltheme === "light") {
    sun.style.transform = "translateX(0)";
    sun.style.opacity = "1";
    moon.style.transform = "translateX(0)";
    moon.style.opacity = "0";
  }
  if (ltheme === "dark") {
    sun.style.transform = "translateX(45px) ";
    sun.style.opacity = "0";
    moon.style.transform = "translateX(-45px)";
    moon.style.opacity = "1";
  }
};
