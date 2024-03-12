document.addEventListener("DOMContentLoaded", function() {
    const gradientDiv = document.getElementById("gradient");
    const generateButton = document.getElementById("generateButton");
    const gradientCodeInput = document.getElementById("gradientCode");
    const copyButton = document.getElementById("copyButton");
  
    // Function to generate a random color
    function generateRandomColor() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }
  
    // Function to generate random gradient and set as background
    function generateRandomGradient() {
      const color1 = generateRandomColor();
      const color2 = generateRandomColor();
      const gradientDirection = Math.random() < 0.5 ? "to right" : "to left"; // Random gradient direction
      const gradient = `linear-gradient(${gradientDirection}, ${color1}, ${color2})`;
      gradientDiv.style.background = gradient;
      gradientCodeInput.value = `background: ${gradient};`;
    }
  
    // Event listener for the button click
    generateButton.addEventListener("click", generateRandomGradient);
  
    // Event listener for the copy button click
    copyButton.addEventListener("click", function() {
      gradientCodeInput.select();
      document.execCommand("copy");
    });
  
    // Initial random gradient
    generateRandomGradient();
  });
  