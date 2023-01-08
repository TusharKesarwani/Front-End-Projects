const secondhand=document.querySelector('.second-hand');
const mindhand = document.querySelector('.min-hand');
const hourhand = document.querySelector('.hour-hand');

function setdate()
{
  const now = new Date();
  const seconds = now.getSeconds();
  const seconddegrees=((seconds/60)*360)+90;
  secondhand.style.transform = `rotate(${seconddegrees}deg)`;
  console.log(seconds);
  const min = now.getMinutes();
  const mindegrees=((min/60)*360)+90;
  mindhand.style.transform = `rotate(${mindegrees}deg)`;

  const hour = now.getHours();
  const hourdegrees=((hour/12)*360)+90;
  hourhand.style.transform = `rotate(${hourdegrees}deg)`;
  
}
setInterval(setdate,1000);