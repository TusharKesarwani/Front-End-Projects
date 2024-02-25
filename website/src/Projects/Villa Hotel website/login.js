let loginForm = document.querySelector('.login-wrap')
let signupform = document.querySelector('.signup-wrap')
let title = document.querySelector('title');

let signupToggleBtn= document.querySelector('#toggle-signup')
let loginToggleBtn= document.querySelector('#toggle-login')

signupToggleBtn.onclick = () =>{
  loginForm.classList.remove("active");
  signupform.classList.add("active");
  title.textContent="SignUp";
}

loginToggleBtn.onclick = () =>{
  signupform.classList.remove("active");
  loginForm.classList.add("active");
  title.textContent="LogIn";
}