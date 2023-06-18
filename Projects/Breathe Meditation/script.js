const container = document.querySelector('#container');
const text = document.querySelector('#text');


const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

breathAnimation();

function breathAnimation() {
  text.innerText = 'Breathe In!';
  container.classList.add('grow');

  setTimeout(() => {
    text.innerText = 'Hold';

    setTimeout(() => {
      text.innerText = 'Breathe Out!';
      container.classList.remove('grow');
      container.classList.add('shrink');
    }, holdTime);
  }, breatheTime);
}


setInterval(breathAnimation, totalTime);
