const colors=document.getElementsByClassName('theme-button');

let i;
for(i=0;i<colors.length ;i++){
    colors[i].addEventListener('click',changecolor );
}

function changecolor(){

  let color = this.getAttribute('data-color');
  document.documentElement.style.setProperty('--color', color);
  document.getElementById('color').value = color;

  let chng = this.getAttribute('data-color-primary');
  document.documentElement.style.setProperty('--primary-color', chng);
  document.getElementById('seco').value = chng;

  let sucgreen = this.getAttribute('data-color-success');
  document.documentElement.style.setProperty('--success', sucgreen);
  document.getElementById('succ').value= sucgreen;

  
  let warnyel = this.getAttribute('data-color-warning');
  document.documentElement.style.setProperty('--warning', warnyel);
  document.getElementById('warn').value= warnyel;
}



/*------------------------------*/

let colorInput =document.querySelector('#color');
let hexInput =document.querySelector('#hex');

hexInput.addEventListener('click',()=>{
    let clor = colorInput.value;
    document.documentElement.style.setProperty('--color', clor);
    
});

/*----------------------------------*/

let secon =document.querySelector('#seco');
let butIn =document.querySelector('#swatch');

butIn.addEventListener('click',()=>{
    let swa = secon.value;
    document.documentElement.style.setProperty('--primary-color', swa);
});

/*--------------------------------------*/

let succIn =document.querySelector('#succ');
let In =document.querySelector('#swatch2');

In.addEventListener('click',()=>{
    let green = succIn.value;
    document.documentElement.style.setProperty('--success', green);
});

/*---------------------------------------*/


let warnIng =document.querySelector('#warn');
let warn =document.querySelector('#swatch3');

warn.addEventListener('click',()=>{
    let yellow = warnIng.value;
    document.documentElement.style.setProperty('--warning', yellow);
});