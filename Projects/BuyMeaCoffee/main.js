const app = document.querySelector("#apps");

app.addEventListener("click", function () {
  const appData = document.querySelector(".app__data");
  appData.classList.toggle("app__data__active");
});

let lastKnownScrollPosition = 0;
let ticking = false;

function doSomething(scrollPos) {
  // Do something with the scroll position
  if (window.scrollY > 300) {
    const img1 = document.querySelector("#img__1");
    img1.classList.remove("hide");
    img1.classList.add("animate__animated", "animate__backInLeft");
  }

  if (window.scrollY > 900) {
    const donationdiv = document.querySelector(".donation_1");
    donationdiv.classList.add("animate__animated", "animate__backInRight");

    donationdiv.classList.remove("hide");
  }
  if (window.scrollY > 1700) {
    const lower = document.querySelector(".donation_2");
    lower.classList.add("animate__animated", "animate__fadeInBottomRight");
    lower.classList.remove("hide");
  }
}

document.addEventListener("scroll", (event) => {
  lastKnownScrollPosition = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      doSomething(lastKnownScrollPosition);
      ticking = false;
    });

    ticking = true;
    // console.log(lastKnownScrollPosition);
  }
});
