let count = 0;
document.querySelectorAll(".seat").forEach((seat) => {
  seat.addEventListener("click", (seatSelected) => {
    if (
      !seat.classList.contains("seat-booked") &&
      !seat.classList.contains("user-booking")
    ) {
      seat.classList.toggle("user-booking");
      updateSelectedCount();
    } else if (seat.classList.contains("user-booking")) {
      count--;
      document.querySelector(".count").innerText = count;
      seat.classList.remove("user-booking");
    }
  });
});

function updateSelectedCount() {
  count++;
  document.querySelector(".count").innerText = count;
}

document.querySelector(".btn-primary").addEventListener("click", () => {
    let btn=document.querySelector(".show")
    btn.style.display="block"
})


