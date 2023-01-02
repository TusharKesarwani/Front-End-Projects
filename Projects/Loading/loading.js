const btn = document.querySelector('.cart-btn')
const spinIcon = document.querySelector('.rotate')
const btntext = document.querySelector('.text')

btn.addEventListener('click', () =>{
    btn.classList.add('clicked')
    spinIcon.classList.add('spin')
    btntext.textContent ="Loading"


    setTimeout(() => {
        spinIcon.classList.replace("rotate", "check")
        spinIcon.classList.replace("fa-circle-notch", "fa-check")
        btntext.textContent= "Done"
    }, 4000);
    
})