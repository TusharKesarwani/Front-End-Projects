let submitButton = document.getElementById("submit-button");
let userInput = document.getElementById("user-input");
let canvas = document.getElementById("canvas");
let reloadButton = document.getElementById("reload-button");
let text = "";
const textGenerator = () => {
  let generatedText = "";
  for (let i = 0; i < 3; i++) {
    generatedText += String.fromCharCode(randomNumber(65, 90));
    generatedText += String.fromCharCode(randomNumber(97, 122));
    generatedText += String.fromCharCode(randomNumber(48, 57));
  }
  return generatedText;
};
const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
function drawStringOnCanvas(string) {
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  const textColors = ["rgb(0,0,0)", "rgb(130,130,130)"];
  const letterSpace = 150 / string.length;
  for (let i = 0; i < string.length; i++) {
    const xInitialSpace = 25;
    ctx.font = "20px Roboto Mono";
    ctx.fillStyle = textColors[randomNumber(0, 1)];
    ctx.fillText(
      string[i],
      xInitialSpace + i * letterSpace,
      randomNumber(25, 40),
      100
    );
  }
}
function triggerFunction() {
  userInput.value = "";
  text = textGenerator();
  console.log(text);
  text = [...text].sort(() => Math.random() - 0.5).join("");
  drawStringOnCanvas(text);
}
reloadButton.addEventListener("click", triggerFunction);
window.onload = () => triggerFunction();
submitButton.addEventListener("click", () => {
  if (userInput.value === text) {
    alert("Success");
  } else {
    alert("Incorrect");
    triggerFunction();
  }
});
