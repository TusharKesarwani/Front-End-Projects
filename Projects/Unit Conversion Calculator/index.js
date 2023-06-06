
let inputEl = document.getElementById("input");

const convertBtn = document.getElementById("convert-btn");

const lengthUnit = document.getElementById("length-unit");

const litersUnit = document.getElementById("liters-unit");

const kgUnit = document.getElementById("kg-unit");

convertBtn.addEventListener("click", () => {

    let num = inputEl.value;

    lengthUnit.innerHTML = `${num} meters = ${(num * 3.281).toFixed(3)} feet | ${num} feet = ${(num / 3.281).toFixed(3)} meters`

    litersUnit.innerHTML = `${num} liters = ${(num * 0.264).toFixed(3)} gallons | ${num} gallons = ${(num / 0.264).toFixed(3)} liters`

    kgUnit.innerHTML = `${num} kilos = ${(num * 2.204).toFixed(3)} pounds | ${num} pounds = ${(num / 3.281).toFixed(3)} kilos`
})