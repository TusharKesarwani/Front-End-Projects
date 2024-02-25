// Display the loading animation
document.getElementById('loading-animation').style.display = 'block';

// Hide the loading animation after a delay
document.addEventListener('DOMContentLoaded', function() {
  // Task completed
  
  document.getElementById("animation__body").style.display="none"
  setTimeout(function() {
    document.getElementById('loading-animation').style.display = 'none';
    document.getElementById("animation__body").style.display="block";
  }, 4000); // Adjust the delay time (in milliseconds) as needed
});


const list=document.getElementById("list__items")
const openButton=document.getElementById("openButton")
const closeButton=document.getElementById("closeButton")


// openButton.addEventListener("click",change())

function change(){
  list.classList.toggle("active")
  
  // openButton.classList.toggle("active_open__icon")
  // closeButton.classList.toggle("active_close__icon")
}
function close(){

}

// openButton.addEventListener("click", function click(){
//   // list.classList.toggle="active"
//   // openButton.classList.toggle="active"
//   // closeButton.classList.toggle="active"
//   // console.log("clicked")


// })