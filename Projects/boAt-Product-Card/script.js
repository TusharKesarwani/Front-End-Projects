let menuIcon = document.querySelector('.menu_icon');
let navbar = document.querySelector('.header__navbar');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('active');
    navbar.classList.toggle('show');

    if (!menuIcon.classList.contains('active')) {
        menuIcon.classList.toggle('not-active');
    } else {
        menuIcon.classList.remove('not-active');
    }
})

const productImage = document.querySelector('.product__img')
const changeImg = (id) => {
    document.querySelectorAll('.img__holder').forEach(holder => {
        holder.classList.remove('img__selected')
    })
    switch (id) {
        case 'i01':
            productImage.src = '/assets/headphone01.png';
            document.getElementById(id).classList.add('img__selected');
            break;
        case 'i02':
            productImage.src = '/assets/headphone02.png'
            document.getElementById(id).classList.add('img__selected');
            break;
        case 'i03':
            productImage.src = '/assets/headphone03.png'
            document.getElementById(id).classList.add('img__selected');
            break;
        case 'i04':
            productImage.src = '/assets/headphone06.png'
            document.getElementById(id).classList.add('img__selected');
            break;
    }
}

const variantSect = document.querySelectorAll('.variant__sect');
variantSect.forEach(variant => {
    // if (variant.classList.contains('active__choice'))
    variant.addEventListener('click', () => {
        variant.classList.toggle('active__choice');
    })
    variant.classList.remove('active__choice');
})

