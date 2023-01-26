var display = document.querySelector("h3");
var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var body = document.getElementById("gradient");

function LinearGradient() {

	console.log(color1.value)
	console.log(color2.value)

	body.style.background = 
		"linear-gradient(to right, " + color1.value + ", " + color2.value +")";
		
	display.textContent = body.style.background ;
}

color1.addEventListener('input',LinearGradient);
color2.addEventListener('input',LinearGradient);



