const buttonPlay = document.getElementById('buttonPlay');
const playIcon = document.getElementById('playIcon');
const buttonReset = document.getElementById('buttonReset');
const timeLeftDOM = document.getElementById('timeLeft');
const labelSessionBreak = document.getElementById('labelSessionBreak');
const sessionLengthDOM = document.getElementById('sessionLength');
const breakLengthDOM = document.getElementById('breakLength');
const sessionDecrement = document.getElementById('sessionDecrement');
const sessionIncrement = document.getElementById('sessionIncrement');
const breakDecrement = document.getElementById('breakDecrement');
const breakIncrement = document.getElementById('breakIncrement');


const arrayTime = timeLeftDOM.innerText.split(":");
let timeLeft = parseInt(arrayTime[0] * 60) + parseInt(arrayTime[1]); 
let playIsClicked = true;
let isSession = false;
let breakLength = 5*60;
let timeLength = 25*60;

function convertSeconds(seconds) {
    return {
        minutes: Math.floor(seconds / 60), 
        seconds: seconds % 60 
    }
}

let interval;

buttonPlay.addEventListener('click', () => {

    if(playIsClicked) {

        if(interval) {
            clearInterval(interval)
        }
        interval = setInterval(handleTime, 1000);

      
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');

        function handleTime() {
         
            if(timeLeft <= 0) {
                
                if(isSession) {
                    labelSessionBreak.innerText = "Session";
                    timeLeft = timeLength;
                } 
                
                
                else {
                    labelSessionBreak.innerText = "Break";
                    timeLeft = breakLength;
                    
                    
                }
                isSession = !isSession;
            } 
            
           
            else if(playIsClicked) {
                clearInterval(interval);
            }

          
            else {
                timeLeft--;
                const minutesAndSeconds = convertSeconds(timeLeft);
                timeLeftDOM.innerText = `${('0'+minutesAndSeconds.minutes).slice(-2)}:${('0'+minutesAndSeconds.seconds).slice(-2)}`;
            }
        }
    } 
    
   
    else {
      
        playIcon.classList.add('fa-play');
        playIcon.classList.remove('fa-pause');
    }
    playIsClicked = !playIsClicked;
}); 


buttonReset.addEventListener('click', () => {
    breakLength = 5*60;
    timeLength = 25*60;
    timeLeft = timeLength;
    breakLengthDOM.innerText = "5";
    sessionLengthDOM.innerText = "25";
    timeLeftDOM.innerText = "25:00";
    if(!playIsClicked) {
        buttonPlay.click();
    }
});


function handleLengthButton(lengthValue, htmlElement, isAddition, isBreakLength) {
    let result = 1;
    if(isAddition) {
        result = ++lengthValue;
        htmlElement.innerText = result;
    } else {
        if(lengthValue != 1) {
            result = --lengthValue;
            htmlElement.innerText = result;
        }
    }
    if(!playIsClicked) {
        buttonPlay.click();
    }
    let resultSeconds = result * 60;
    if(!isBreakLength) {
        timeLength = resultSeconds;

        if(labelSessionBreak.innerText === 'SESSION') {
            timeLeftDOM.innerText = ('0'+result).slice(-2) + ":00";
            timeLeft = resultSeconds;
        }
    } else {
        breakLength = resultSeconds;

        if(labelSessionBreak.innerText === 'BREAK') {
            timeLeftDOM.innerText = ('0'+result).slice(-2) + ":00";
            timeLeft = resultSeconds;
        }
    }
    return resultSeconds;
}
sessionDecrement.addEventListener('click', () => {
    handleLengthButton(parseInt(sessionLengthDOM.innerText), sessionLengthDOM, false, false);
});
sessionIncrement.addEventListener('click', () => {
    handleLengthButton(parseInt(sessionLengthDOM.innerText), sessionLengthDOM, true, false);
});
breakDecrement.addEventListener('click', () => {
    breakLength = handleLengthButton(parseInt(breakLengthDOM.innerText), breakLengthDOM, false, true);
});
breakIncrement.addEventListener('click', () => {
    breakLength = handleLengthButton(parseInt(breakLengthDOM.innerText), breakLengthDOM, true, true);
});