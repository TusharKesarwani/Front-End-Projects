console.clear();

const curlen = 20;

const cursor = document.getElementById('cursor');

let mouseX = 0;
let mouseY = 0;

let circles;
let history = Array(curlen).fill({x: 0, y: 0});

function onMouseMove(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}

function initCursor() {
  for (let i = 0; i < curlen; i++) {
    let div = document.createElement('div');
    div.classList.add('cursor-circle') ;
    cursor.append(div);
  }
  circles = Array.from(document.querySelectorAll('.cursor-circle'));
}

function updateCursor() {  
  history.shift();
  history.push({ x: mouseX, y: mouseY });
    
  for (let i = 0; i < curlen; i++) {
    let current = history[i];
    let next = history[i + 1] || history[curlen - 1];
    
    let diffx = next.x - current.x;
    let diffy = next.y - current.y;
    
    current.x += diffx * 0.35;
    current.y += diffy * 0.35;
    circles[i].style.transform = `translate(${current.x}px, ${current.y}px) scale(${i/curlen})`;  
  }
  requestAnimationFrame(updateCursor)
}

document.addEventListener('mousemove', onMouseMove, false);

initCursor();
updateCursor();