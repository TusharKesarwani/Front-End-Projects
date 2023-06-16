const signUpBtn = document.querySelector(".signup-btn");
const signInBtn = document.querySelector(".signin-btn");
const formsWrapper = document.querySelector(".forms-wrapper");
const signinForm = document.querySelector(".signin-form");
const signupForm = document.querySelector(".signup-form");

signUpBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formsWrapper.classList.add("change");
  signupForm.classList.add("animate");
  signinForm.classList.remove("animate");
});

signInBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formsWrapper.classList.remove("change");
  signupForm.classList.add("animate");
  signinForm.classList.remove("animate");
});


  




