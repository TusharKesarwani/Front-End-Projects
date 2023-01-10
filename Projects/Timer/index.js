let seconds=00
let tens=00
let Interval;
let time=true;

let OutputSeconds=document.getElementById('second')
let OutputTens=document.getElementById('ten')
let buttonStart=document.getElementById('btn-start')
let buttonReset=document.getElementById('btn-reset')

buttonStart.addEventListener('click',()=>{
    
    if(time){
        clearInterval(Interval)
        Interval=setInterval(startTime,10)
        time=false;
        buttonStart.innerText="stop" 
        buttonStart.classList.add('active')
    }
    else{
         clearInterval(Interval)
         time=true
         buttonStart.innerText="start"
       
         buttonStart.classList.remove('active')
    }
}
)



buttonReset.addEventListener('click',()=>{
    clearInterval(Interval)
    seconds="00"
    tens="00"
    OutputSeconds.innerHTML=seconds
    OutputTens.innerHTML=tens
})

function startTime(){
  tens++
  if(tens<9){
      OutputTens.innerHTML='0'+tens;
  }
  if(tens<99){
      OutputTens.innerHTML=tens;
  }
  if(tens>99){
      seconds++
      OutputSeconds.innerHTML='0'+seconds
      tens=0
      OutputTens.innerHTML='0'+tens
  }
  if(seconds>9){
      OutputSeconds.innerHTML=seconds
  }
}