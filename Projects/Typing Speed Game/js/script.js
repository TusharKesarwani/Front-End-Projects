const typingText = document.querySelector(".typing-text p"),
  inpField = document.querySelector(".wrapper .input-field"),
  timeTag = document.querySelector(".time span b"),
  timeContainer = document.querySelector(".time"),
  mistakeTag = document.querySelector(".mistakes span"),
  wpmTag = document.querySelector(".wpm span"),
  cpmTag = document.querySelector(".cpm span"),
  tryAgainBtn = document.querySelector(".try-again-btn"),
  resetBtn = document.querySelector(".reset-btn"),
  timeBtns = document.querySelectorAll(".time-btn");

const wrapperElement = document.querySelector(".wrapper");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const themeIcon = document.getElementById("themeIcon");
const bodyElement = document.body;

let timer,
  maxTime = 60,
  timeLeft = maxTime,
  charIndex = 0,
  mistakes = 0,
  isTyping = false,
  startTime = null;
let currentParagraphText = "";

function getDurationKey(seconds) {
  if (seconds == 30) return "30s";
  if (seconds == 60) return "1m";
  if (seconds == 120) return "2m";
  if (seconds == 300) return "5m";
  if (seconds == 600) return "10m";
  return "1m";
}

const savedTheme = localStorage.getItem("typingTheme");
if (savedTheme === "light") {
  bodyElement.setAttribute("data-theme", "light");
  themeIcon.className = "fa-solid fa-sun";
} else {
  themeIcon.className = "fa-solid fa-moon";
}

themeToggleBtn.addEventListener("click", () => {
  let currentTheme = bodyElement.getAttribute("data-theme");

  if (currentTheme === "light") {
    bodyElement.removeAttribute("data-theme");
    localStorage.setItem("typingTheme", "dark");
    themeIcon.className = "fa-solid fa-moon";
  } else {
    bodyElement.setAttribute("data-theme", "light");
    localStorage.setItem("typingTheme", "light");
    themeIcon.className = "fa-solid fa-sun";
  }
});

function formatTime(seconds) {
  if (seconds >= 60) {
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }
  return seconds;
}

function randomParagraph() {
  let durationKey = getDurationKey(maxTime);
  let paragraphs = TYPING_DATA[durationKey] || TYPING_DATA["1m"];

  let randIndex = Math.floor(Math.random() * paragraphs.length);
  let item = paragraphs[randIndex];
  currentParagraphText = typeof item === "object" ? item.text : item;

  loadParagraphText();
}
function loadParagraphText() {
  typingText.innerHTML = currentParagraphText
    .split("")
    .map((char) => `<span>${char}</span>`)
    .join("");

  typingText.querySelectorAll("span")[0].classList.add("active");
  
  if (typingText.parentElement) {
    typingText.parentElement.scrollTop = 0;
  }
  typingText.scrollTop = 0;

  inpField.value = "";
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = mistakes = isTyping = 0;
  startTime = null;
  
  timeTag.innerText = formatTime(timeLeft);
  
  if (timeContainer) timeContainer.classList.remove("warning");
  if (wrapperElement) wrapperElement.classList.remove("blast"); // Clear blast on reload
  
  mistakeTag.innerText = mistakes;
  wpmTag.innerText = 0;
  cpmTag.innerText = 0;
}

function initTimer() {
  if (startTime) {
    let elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    timeLeft = Math.max(0, maxTime - elapsedSeconds);
    
    timeTag.innerText = formatTime(timeLeft);

    if (timeContainer) {
      if (timeLeft <= 10 && timeLeft > 0) {
        timeContainer.classList.add("warning");
      } else {
        timeContainer.classList.remove("warning");
      }
    }

    if (timeLeft <= 0) {
      clearInterval(timer);
      if (timeContainer) {
        timeContainer.classList.remove("warning");
      }
      if (wrapperElement) {
        wrapperElement.classList.add("blast");
        
        setTimeout(() => {
          wrapperElement.classList.remove("blast");
        }, 800);
      }
    }
  }
}

function initTimer() {
  if (startTime) {
    let elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    timeLeft = Math.max(0, maxTime - elapsedSeconds);
    
    timeTag.innerText = formatTime(timeLeft);

    if (timeContainer) {
      if (timeLeft <= 10 && timeLeft > 0) {
        timeContainer.classList.add("warning");
      } else {
        timeContainer.classList.remove("warning");
      }
    }

    if (timeLeft <= 0) {
      clearInterval(timer);
      if (timeContainer) {
        timeContainer.classList.remove("warning");
      }
      if (wrapperElement) {
        wrapperElement.classList.add("blast");
        
        setTimeout(() => {
          wrapperElement.classList.remove("blast");
        }, 800);
      }
    }
  }
}

function initTyping() {
  const characters = typingText.querySelectorAll("span");
  let typedChar = inpField.value.split("")[charIndex];

  if (charIndex < characters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      startTime = Date.now();
      timer = setInterval(initTimer, 100);
      isTyping = true;
    }
    if (typedChar == null) {
      if (charIndex > 0) {
        charIndex--;
        if (characters[charIndex].classList.contains("incorrect")) {
          mistakes--;
        }
        characters[charIndex].classList.remove("correct", "incorrect");
      }
    } else {
      if (characters[charIndex].innerText === typedChar) {
        characters[charIndex].classList.add("correct");
      } else {
        mistakes++;
        characters[charIndex].classList.add("incorrect");
      }
      charIndex++;
    }

    characters.forEach((span) => span.classList.remove("active"));
    if (characters[charIndex]) {
      characters[charIndex].classList.add("active");
    }

    let timeElapsed = Math.floor((Date.now() - startTime) / 1000);
    let effectiveTime = Math.max(1, timeElapsed);
    let wpm = Math.round((charIndex - mistakes) / 5 / (effectiveTime / 60));
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

    mistakeTag.innerText = mistakes;
    wpmTag.innerText = wpm;
    cpmTag.innerText = charIndex - mistakes;
  } else {
    inpField.value = "";
    clearInterval(timer);
  }
}

function tryAgainGame() {
  loadParagraphText();
}

function fullResetGame() {
  randomParagraph();
}

timeBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    timeBtns.forEach((b) => b.classList.remove("active"));
    e.target.classList.add("active");

    maxTime = parseInt(e.target.dataset.time);
    timeLeft = maxTime;
    timeTag.innerText = formatTime(timeLeft);
    timeTag.parentElement.classList.remove("warning");

    randomParagraph();
    inpField.focus();
  });
});

document.addEventListener("keydown", () => inpField.focus());
typingText.addEventListener("click", () => inpField.focus());

inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", tryAgainGame);
resetBtn.addEventListener("click", fullResetGame);

document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    e.preventDefault();
    tryAgainGame();
  } else if (e.key === "Enter") {
    e.preventDefault();
    fullResetGame();
  }
});

randomParagraph();
