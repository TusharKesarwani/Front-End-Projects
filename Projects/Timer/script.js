// Variables
let timerInterval;
let hours = 0;
let minutes = 0;
let seconds = 0;

// Selecting elements
const timer = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

// Event listeners
startBtn.addEventListener("click", startStopwatch);
stopBtn.addEventListener("click", stopStopwatch);
resetBtn.addEventListener("click", resetStopwatch);

// Stopwatch functions
function startStopwatch() {
  timerInterval = setInterval(updateStopwatch, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function stopStopwatch() {
  clearInterval(timerInterval);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

function resetStopwatch() {
  clearInterval(timerInterval);
  hours = 0;
  minutes = 0;
  seconds = 0;
  timer.textContent = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

function updateStopwatch() {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }
  }
  timer.textContent = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);
}

function formatTime(time) {
  return time < 10 ? "0" + time : time;
}
