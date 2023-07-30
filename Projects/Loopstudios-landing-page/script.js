// copyright year

let copyRightYear = document.getElementById("copyright-year");
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
copyRightYear.innerText = currentYear;

// toggle mobile menu

const toggleButtons = document.querySelectorAll(".toggle");

toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    document.getElementById("mobile-nav").classList.toggle("hidden");
  });
});