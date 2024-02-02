function onHover(e) {
    let que = document.querySelectorAll('section .ques .que');

    que.forEach(element => {
        element.classList.remove('onHover');
        element.querySelector('.ans').style.display = "none";
    });

    e.classList.add('onHover');
    e.querySelector('.ans').style.display = "block";
}       