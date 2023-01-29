const dropdown= document.querySelector('#dropdown');
const Menu=document.querySelector('#Menu');
dropdown.addEventListener('click', (e) => {
    if (Menu.classList.contains('hidden')) {
      Menu.classList.remove('hidden');
    } else {
      Menu.classList.add('hidden');
    }
  });