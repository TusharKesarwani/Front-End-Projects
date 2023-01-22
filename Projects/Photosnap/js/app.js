// MOBILE NAVIGATION MENU
const menuButton = document.querySelector('.menu_toggle');
const open = document.querySelector('.open');
const close = document.querySelector('.close');
const navList = document.querySelector('.nav_list');

menuButton.addEventListener('click', function () {
    navList.classList.toggle('active');
    open.classList.toggle('active');
    close.classList.toggle('active');
});

// CLOSE THE NAV WHEN NAVLNKS ARE CLICKED
let navLinks = document.querySelectorAll('.nav_list-link');

navLinks.forEach(function (navLink) {
    navLink.addEventListener('click', function () {
        navList.classList.remove('active');
    })
})

// PRICING TABS SWITCH
const priceToggle = document.getElementById('toggle');
const priceGrid = document.querySelector('.price-grid');

priceToggle.addEventListener('change', e => {
    priceGrid.classList.toggle('show-yearly');
});
