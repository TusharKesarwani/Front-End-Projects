const wrapper=document.querySelector('.wrapper');
const loginLink=document.querySelector('.login-link');
const registerLink=document.querySelector('.register-link');

registerLink.addEventListener('click',()=>{
    wrapper.classList.add('active');
});
 
loginLink.addEventListener('click',()=>{
    wrapper.classList.remove('active');
});

function register(){
    alert("You have registered succesfully.");
    wrapper.classList.remove('active');
}
