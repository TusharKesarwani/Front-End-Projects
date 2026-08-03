const res = document.getElementById("demo");
const checkbtn = document.getElementById("btn");
const input = document.getElementById("text");

// Clear message while typing
input.addEventListener("input", () => {
  res.textContent = "";
  checkbtn.style.opacity = "1";
  checkbtn.classList.add("buttonjs");
});

// Validate and check Armstrong number on click
checkbtn.addEventListener("click", () => {
  const text = input.value.trim();

  // Empty or invalid input
  if (!text || /[^0-9]/.test(text)) {
    res.textContent = "⚠️ Please enter a valid positive number.";
    res.style.color = "#f87171"; // red
    return;
  }

  const num = Number(text);
  const digits = text.length;
  let temp = num;
  let sum = 0;

  while (temp > 0) {
    const remainder = temp % 10;
    sum += Math.pow(remainder, digits);
    temp = Math.floor(temp / 10);
  }

  res.style.color = "#fff"; // reset color

  if (sum === num) {
    res.textContent = `${num} is an Armstrong number.`;
  } else {
    res.textContent = `${num} is not an Armstrong number.`;
  }
});
