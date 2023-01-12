let bars = document.getElementById("bars");

function nav() {
  // console.log("logged");
  // let cross=document.getElementsByClassName('cross');
  if (bars.classList.contains("hidden")) {
    bars.classList.add("flex");
    bars.classList.remove("hidden");
  } else {
    bars.classList.remove("flex");
    bars.classList.add("hidden");
  }
}
function scrolledBg() {
  alert("hii its scrolling");
}
