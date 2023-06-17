document.getElementById('sub').addEventListener('click', function() {
  let h = document.getElementById('height').value;
  let w = document.getElementById('weight').value;

  if (!h || !w || isNaN(h) || isNaN(w)) {
    document.getElementById('res').innerHTML = 'Please enter valid height and weight values.';
    document.getElementById('info').setAttribute('class', 'card show');
    return;
  }

  h /= 100.0;
  let bmi = w / (h * h);
  bmi = parseFloat(bmi.toFixed(2));

  let imgPath = '';
  let bmiCategory = '';

  function determineCategoryAndImage() {
    if (bmi < 19) {
      bmiCategory = 'Underweight';
      imgPath = './assets/underweight.jpg';
    } else if (bmi >= 19 && bmi <= 25) {
      bmiCategory = 'Healthy';
      imgPath = './assets/healthy.jpg';
    } else if (bmi > 25 && bmi <= 30) {
      bmiCategory = 'Overweight';
      imgPath = './assets/overweight.jpg';
    } else {
      bmiCategory = 'Obese';
      imgPath = './assets/obese.jpg';
    }
  }

  determineCategoryAndImage();

  document.getElementById('body').setAttribute('src', imgPath);
  document.getElementById('res').innerHTML = `You Are ${bmiCategory}.`;
  document.getElementById('result').innerHTML = `Your BMI is <strong>${bmi}</strong>.`;
  document.getElementById('info').setAttribute('class', 'card show');
});
