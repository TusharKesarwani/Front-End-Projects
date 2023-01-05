// target is button --> click is the type and handleclick is listener
// Applying eventlistner to all button
var numberOfDrumButtons = document.querySelectorAll(".drum").length;

for(var i=0; i<numberOfDrumButtons; i++){

document.querySelectorAll(".drum")[i].addEventListener("click",handleclick);

function handleclick(){



  //when clicked the color of button changes by triggering its identities using this
this.style.color = "white";

// now seeing which button got clicked and selecting sound for it using switch case
var buttonInnerHTML = this.innerHTML;

switch (buttonInnerHTML) {
  case "w":
  var tom1 = new Audio("sounds/tom-1.mp3");
  tom1.play();
    break;

    case "a":
    var tom2 = new Audio("sounds/tom-2.mp3");
    tom2.play();
      break;

    case "s":
      var tom3 = new Audio("sounds/tom-3.mp3");
      tom3.play();
        break;

    case "d":
        var tom4 = new Audio("sounds/tom-4.mp3");
        tom4.play();
          break;

    case "j":
    var crash = new Audio("sounds/crash.mp3");
    crash.play();
      break;

      case "k":
      var kick = new Audio("sounds/kick-bass.mp3");
      kick.play();
        break;

    case "l":
  var snare = new Audio("sounds/snare.mp3");
    snare.play();
    break;

    //like else statement  --> good practice to include
  default: console.log(buttonInnerHTML);

}

}


}

// Anonymous function
/*document.querySelector("button").addEventListener("click",function(){
  alert("I got Clicked!");
});*/
