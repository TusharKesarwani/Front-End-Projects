// Get references to the elements you want to modify
const header = document.querySelector('header');
const h1 = document.querySelector('h1');
const image = document.querySelector('img');

// Function to change the text content of the <h1> element
function changeText() {
  const newText = prompt('Enter new text:');
  if (newText) {
    h1.textContent = newText;
  }
}

// Function to change the background color of the header
function changeBackground() {
  const newColor = prompt('Enter new background color (e.g., #ff0000 for red):');
  if (newColor) {
    header.style.backgroundColor = newColor;
  }
}

// Function to change the image source
function changeImage() {
  const newImage = prompt('Enter new image URL:');
  if (newImage) {
    image.src = newImage;
  }
}

// Attach click event listeners to buttons
document.getElementById('changeTextBtn').addEventListener('click', changeText);
document.getElementById('changeBackgroundBtn').addEventListener('click', changeBackground);
document.getElementById('changeImageBtn').addEventListener('click', changeImage);
