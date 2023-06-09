function checkArmstrong() {
    var number = document.getElementById('numberInput').value;
    var sum = 0;
    var temp = number;
  
    while (temp > 0) {
      var digit = temp % 10;
      sum += Math.pow(digit, 3);
      temp = Math.floor(temp / 10);
    }
  
    if (sum == number) {
      document.getElementById('result').textContent = number + " is an Armstrong number.";
    } else {
      document.getElementById('result').textContent = number + " is not an Armstrong number.";
    }
  }
  