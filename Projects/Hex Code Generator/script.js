const button = document.getElementById('generator');
const gradient = document.getElementById('gradient')
const reset = document.getElementById('reset')
const hexCode = document.getElementById('code')

button.addEventListener('click', generate)

function generate(){
    const hex = "#" + Math.random().toString(16).slice(2,8)
    hexCode.innerHTML = `CSS Code=> background-color: ${hex};`
    document.body.style.background = hex
}

gradient.addEventListener('click', gradColour)

function gradColour(){
    const hex1 = "#" + Math.random().toString(16).slice(2,8)
    const hex2 = "#" + Math.random().toString(16).slice(2,8)
    hexCode.innerHTML = `CSS Code=> backgroung-image: linear-gradient(to bottom right, ${hex1}, ${hex2});`
    document.body.style.background = `linear-gradient(to bottom right, ${hex1}, ${hex2})`
}

reset.addEventListener('click', () =>{
    document.body.style.background = "white";
    console.log('gren');
    hexCode.innerHTML = '';
})

