const sideMenu  = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
})

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
})  

themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variales');

    themeToggler.querySelector('span').classList.toggle('active');
})  

