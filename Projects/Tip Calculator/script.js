const btnEl = document.getElementById("calculate");
const resetBtnEl = document.getElementById("reset");
const billInput = document.getElementById("bill");
const tipInput = document.getElementById("tip");
const splitInput = document.getElementById("split");
const totalSpan = document.getElementById("total");
const tipAmountSpan = document.getElementById("tipAmount");
const amountPerPersonSpan = document.getElementById("amountPerPerson");

function calculateTotal() {
  const billValue = billInput.value;
  const tipValue = tipInput.value;
  const splitValue = splitInput.value;

  const tipAmount = billValue * (tipValue / 100);
  const totalValue = parseFloat(billValue) + tipAmount;

  totalSpan.innerText = totalValue.toFixed(2);
  tipAmountSpan.innerText = tipAmount.toFixed(2);

  if (splitValue && splitValue > 0) {
    const amountPerPerson = totalValue / splitValue;
    amountPerPersonSpan.innerText = amountPerPerson.toFixed(2);
  } else {
    amountPerPersonSpan.innerText = "";
  }
}

function resetValues() {
  billInput.value = "";
  tipInput.value = "";
  splitInput.value = "";
  totalSpan.innerText = "";
  tipAmountSpan.innerText = "";
  amountPerPersonSpan.innerText = "";
}

btnEl.addEventListener("click", calculateTotal);
resetBtnEl.addEventListener("click", resetValues);
