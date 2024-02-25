// Declaring global variables
const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheckbox = document.querySelector(".keys-checkbox input");

// Initialising variables
let allKeys = [];
let audio = new Audio();

// function play the tunes of the different buttons on click
const playTune = (key) => {
    // Audio controls
    audio.src = `./tunes/${key}.wav`;
    audio.play();
    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add("active");
    setTimeout(() => {
        clickedKey.classList.remove("active");
    }, 150);
}

// Mouse click functioning
pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key);
    key.addEventListener("click", () => playTune(key.dataset.key));
});

// function to hide the keys labels
const showHideKeys = () => {
    pianoKeys.forEach(key => key.classList.toggle("hide"));
}

// Keyboard buttons press functioning
const pressedKey = (e) => {
    if (allKeys.includes(e.key)) playTune(e.key);
}

// function to control the volume of the game
const handleVolume = (e) => {
    audio.volume = e.target.value;
}

// Adding functioning to the different variables
keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);
