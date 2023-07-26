const signUpBtn = document.querySelector(".signup-btn");
const signInBtn = document.querySelector(".signin-btn");
const formsWrapper = document.querySelector(".forms-wrapper");
const signInForm = document.querySelector(".signin-form");
const signUpForm = document.querySelector(".signup-form");

signUpBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formsWrapper.classList.add("change");
  signInForm.classList.add("hidden");
  signUpForm.classList.remove("hidden");
});

signInBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formsWrapper.classList.remove("change");
  signUpForm.classList.add("hidden");
  signInForm.classList.remove("hidden");
});
