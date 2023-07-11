const openMenu = () => {
    document.querySelector('.backdrop').className = 'backdrop active';
    document.querySelector('aside').className = 'active';
}

const closeMenu = () => {
    document.querySelector('.backdrop').className = 'backdrop';
    document.querySelector('aside').className = '';
}

document.getElementById('menubtn').onclick = function (e) {
    e.preventDefault();
    openMenu();
}

document.querySelector('aside button.close').onclick = () => {
    closeMenu();
}

document.querySelector('.backdrop').onclick = () => {
    closeMenu();
}