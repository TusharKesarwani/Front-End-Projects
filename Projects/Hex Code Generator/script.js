const button = document.getElementById('generator');
const gradient = document.getElementById('gradient')
const reset = document.getElementById('reset')
const hexCode = document.getElementById('code')
var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var color3 = document.querySelector(".color3");

button.addEventListener('click', generate)

function generate(){
    const hex = color3.value
    hexCode.innerHTML = `CSS Code=> background-color: ${hex};`
    document.body.style.background = hex
}

gradient.addEventListener('click', gradColour)

function gradColour(){
    const hex1 = color1.value
    const hex2 = color2.value
    hexCode.innerHTML = `CSS Code=> backgroung-image: linear-gradient(to bottom right, ${hex1}, ${hex2});`
    document.body.style.background = `linear-gradient(to bottom right, ${hex1}, ${hex2})`
}

reset.addEventListener('click', () =>{
    document.body.style.background = "white";
    console.log('gren');
    hexCode.innerHTML = '';
})

