//navigation bar
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

//for closing the menu on clicking any nav link i.e home,about us etc

document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

//membuat event listener
document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("form");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });

  const searchForm = document.getElementById("search");
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    mySearch();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

//menangkap event ondatasaved
document.addEventListener("ondatasaved", () => {
  console.log("Data berhasil disimpan.");
});

//menangkap event ondataloaded
document.addEventListener("ondataloaded", () => {
  refreshDataFromBooks();
});
