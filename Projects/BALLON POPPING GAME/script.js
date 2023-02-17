// const pop = document.querySelector(".baloon");
let popped = 0;
document.addEventListener("mouseover", function (event) {
  if (event.target.className === "baloon") {
    event.target.style.backgroundColor = "#bbf5ef";
    event.target.style.padding = "1% 11% 1% 1%";
    event.target.textContent = "POP!";
    popped++;
    disableEvent(event);
    isAllPopped();
  }
});

// const pop_fun = (e) =>{

// };

function disableEvent(event) {
  event.target.removeEventListener("click", function () {});
}
function isAllPopped() {
  console.log(popped);
  if (popped == 25) {
    console.log("all baloons popped");
    let area = document.querySelector(".game-area");
    let text = document.querySelector("#message");

    area.innerHTML = "";
    text.style.display = "block";
  }
}
