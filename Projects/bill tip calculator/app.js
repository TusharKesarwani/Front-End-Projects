

window.addEventListener("load", () => {
    init()
})

const $ = (elm) => document.querySelector(elm);
const $all = (elm) => document.querySelectorAll(elm);
const log = (val) => console.log(val);


// global variables
let billTipPerPerson = $(".bill-tip-amt");
let tipTotalPerPerson = $(".total-per-person");
let tipCurrency = $all(".tip-curr");
let billTotal = $(".bill-total");


let billInput = $("#bill-input");
let allTipBtn = $all(".tip-btn");
const customTipBtn = $(".custom-tip-btn");
const customTipSelect = $(".custom-tip-percentage")
const incBtn = $(".inc");
const decBtn = $(".dec");
const peopleOup = $(".people-oup");


const resetBtn = $(".reset-btn");
const calcBtn = $(".calc-btn");



function init() {
    let numOfPeople = 1;
    let tipPercentage = 0;
    let billAmt = 0;


    // handle bill amount
    billInput.onkeyup = (e) => {
        const amt = e.target.value;
        const reg = /^\d+$/
        if (reg.test(+amt)) {
            billAmt = +amt;
        }
    }

    // handle bill splitting
    incBtn.onclick = () => {
        numOfPeople++
        peopleOup.innerHTML = numOfPeople;
    };
    decBtn.onclick = () => {
        if (numOfPeople <= 1) {
            numOfPeople = 1;
            return;
        }
        numOfPeople--
        peopleOup.innerHTML = numOfPeople;
    }

    calcBtn.onclick = () => calculateTip(+billAmt, +numOfPeople, +tipPercentage)


    // handle tip percentage
    allTipBtn.forEach((button) => {
        if (button.classList.contains("active")) {
            tipPercentage = +button.value
        }
        button.addEventListener("click", handleTipButtonClick);
    });

    // Function to handle the click event on the tip buttons
    function handleTipButtonClick(event) {
        // Remove the "active" class from all buttons
        allTipBtn.forEach((button) => {
            button.classList.remove("active");
        });

        // Add the "active" class to the clicked button
        event.target.classList.add("active");
        tipPercentage = +event.target.value;

        // show the custom tip percentage button back
        customTipBtn.classList.remove("hidden")
        customTipBtn.classList.add("visible")
        customTipSelect.classList.add("hidden")
    }

    // handle custom tip selection
    customTipBtn.onclick = () => {
        customTipBtn.classList.remove("visible")
        customTipBtn.classList.add("hidden")
        customTipSelect.classList.remove("hidden")
    }

    // handle custom tip selection
    customTipSelect.onchange = (e) => {
        tipPercentage = e.target.value
    }

}


// reset current state
resetBtn.onclick = () => {
    numOfPeople = 1;
    tipPercentage = 0;
    billAmt = 0;
    billTotal.innerHTML = `$ 0.00`
    tipTotalPerPerson.innerHTML = `$ 0.00`
    billTipPerPerson.innerHTML = `$ 0.00`
}

function calculateTip(billAmt, numberOfPeople, tipPercentage) {
    const tipAmt = (billAmt * (tipPercentage / 100))
    const tipAmtPerPeron = (tipAmt / numberOfPeople)
    const totalPerPerson = ((billAmt / 4) + tipAmtPerPeron)
    const billTotalAmt = (billAmt + tipAmt);

    billTotal.innerHTML = `$ ${billTotalAmt.toFixed(2)}`
    tipTotalPerPerson.innerHTML = `$ ${totalPerPerson.toFixed(2)}`
    billTipPerPerson.innerHTML = `$ ${tipAmtPerPeron.toFixed(2)}`

    console.log({ tip: tipAmt.toFixed(2), perP: tipAmtPerPeron.toFixed(2), total: totalPerPerson.toFixed(2), billTotalAmt })
}