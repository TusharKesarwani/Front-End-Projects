// Function to convert temperature based on user input
function convertTemperature() {
    var inputTemperature = parseFloat(document.getElementById("inputTemperature").value);
    var inputUnit = document.getElementById("inputUnit").value;
    var outputUnit = document.getElementById("outputUnit").value;
    var outputTemperature = document.getElementById("outputTemperature");
  
    if (inputUnit === outputUnit) {
      // If input and output units are the same, display the input temperature as the output
      outputTemperature.value = inputTemperature.toFixed(2);
    } else if (inputUnit === "celsius" && outputUnit === "fahrenheit") {
      // Convert Celsius to Fahrenheit
      outputTemperature.value = (inputTemperature * 9/5 + 32).toFixed(2);
    } else if (inputUnit === "fahrenheit" && outputUnit === "celsius") {
      // Convert Fahrenheit to Celsius
      outputTemperature.value = ((inputTemperature - 32) * 5/9).toFixed(2);
    } else if (inputUnit === "celsius" && outputUnit === "kelvin") {
      // Convert Celsius to Kelvin
      outputTemperature.value = (inputTemperature + 273.15).toFixed(2);
    } else if (inputUnit === "kelvin" && outputUnit === "celsius") {
      // Convert Kelvin to Celsius
      outputTemperature.value = (inputTemperature - 273.15).toFixed(2);
    } else if (inputUnit === "fahrenheit" && outputUnit === "kelvin") {
      // Convert Fahrenheit to Kelvin
      outputTemperature.value = ((inputTemperature + 459.67) * 5/9).toFixed(2);
    } else if (inputUnit === "kelvin" && outputUnit === "fahrenheit") {
      // Convert Kelvin to Fahrenheit
      outputTemperature.value = (inputTemperature * 9/5 - 459.67).toFixed(2);
    } else if (inputUnit === "celsius" && outputUnit === "rankine") {
      // Convert Celsius to Rankine
      outputTemperature.value = ((inputTemperature * 9/5) + 491.67).toFixed(2);
    } else if (inputUnit === "rankine" && outputUnit === "celsius") {
      // Convert Rankine to Celsius
      outputTemperature.value = ((inputTemperature - 491.67) * 5/9).toFixed(2);
    } else if (inputUnit === "fahrenheit" && outputUnit === "rankine") {
      // Convert Fahrenheit to Rankine
      outputTemperature.value = (inputTemperature + 459.67).toFixed(2);
    } else if (inputUnit === "rankine" && outputUnit === "fahrenheit") {
      // Convert Rankine to Fahrenheit
      outputTemperature.value = (inputTemperature - 459.67).toFixed(2);
    } else if (inputUnit === "kelvin" && outputUnit === "rankine") {
      // Convert Kelvin to Rankine
      outputTemperature.value = (inputTemperature * 9/5).toFixed(2);
    } else if (inputUnit === "rankine" && outputUnit === "kelvin") {
      // Convert Rankine to Kelvin
      outputTemperature.value = (inputTemperature * 5/9).toFixed(2);
    }
  }
  