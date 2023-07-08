const textArea = document.getElementById("textArea");

const characters = document.getElementById("characters");
const alphabets = document.getElementById("alphabets");
const numbers = document.getElementById("numbers");
const specialChars = document.getElementById("specialChars");
const words = document.getElementById("words");

textArea.addEventListener("keyup", (e) => {
  const value = e.target.value;
  count(value);
});

function count(value) {
  let charactersCount = value.length;
  let alphabetsCount = 0;
  let numbersCount = 0;
  let specialCharsCount = 0;
  let wordsCount = value.split(" ").filter((word) => word != "").length;
  for (let i = 0; i < value.length; i++) {
    const c = value.charAt(i);
    if (c >= "a" && c <= "z") {
      alphabetsCount++;
    } else if (c >= "0" && c <= "9") {
      numbersCount++;
    } else if (c != " ") {
      specialCharsCount++;
    }
  }

  characters.textContent = charactersCount;
  alphabets.textContent = alphabetsCount;
  numbers.textContent = numbersCount;
  specialChars.textContent = specialCharsCount;
  words.textContent = wordsCount;
}
