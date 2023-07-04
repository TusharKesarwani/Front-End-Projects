/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/

const convertEl = document.querySelector("#convert-btn")
const supText1 = document.querySelector("#supporting-text-1")
const supText2 = document.querySelector("#supporting-text-2")
const supText3 = document.querySelector("#supporting-text-3")
let input = document.querySelector("#input-text")

convertEl.addEventListener("click", function () {
    supText1.innerHTML = `${Number(input.value)} meters = ${(Number(input.value) * 3.281).toFixed(3)} feet | ${Number(input.value)} feet = ${Number(Number(input.value) * 0.3048).toFixed(3)} meters`

    supText2.innerHTML = `${Number(input.value)} liters = ${(Number(input.value) * 0.264).toFixed(3)} gallons | ${Number(input.value)} gallons = ${Number(Number(input.value) * 4.54609).toFixed(3)} liters`

    supText3.innerHTML = `${Number(input.value)} kilos = ${(Number(input.value) * 2.204).toFixed(3)} pounds | ${Number(input.value)} pounds = ${Number(Number(input.value) * 0.453592).toFixed(3)}  kilos`
})

// input.addEventListener('keydown', function (event) {
//     const key = event.key; // const {key} = event; ES6+
//     if (key === "Backspace") {

//         this.style.width = ((this.value.length - 1)) + 'ch';
//         this.style.margin - left = ((this.value.length - 1)) + 'ch';

//         //   alert(key);
//         //   return false;
//     }
// });