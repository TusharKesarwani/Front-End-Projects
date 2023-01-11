const menu = document.querySelector('#menu');

const sidebar = document.querySelector('.sidebar');

menu.addEventListener('click', function(){
    sidebar.classList.toggle('show-sidebar');
})