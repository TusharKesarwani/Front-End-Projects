// Inserting the Images
function insertImage() {
  document.querySelectorAll(".box").forEach((image) => {
    if (image.innerText.length !== 0) {
      if (image.innerText == "Wpawn" || image.innerText == "Bpawn") {
        image.innerHTML = `${image.innerText} <img class='allimg allpawn' src="${image.innerText}.png" alt="">`;
        image.style.cursor = "pointer";
      } else {
        image.innerHTML = `${image.innerText} <img class='allimg' src="${image.innerText}.png" alt="">`;
        image.style.cursor = "pointer";
      }
    }
  });
}
insertImage();

//Coloring

function coloring() {
  const color = document.querySelectorAll(".box");

  color.forEach((color) => {
    getId = color.id;
    arr = Array.from(getId);
    arr.shift();
    aside = eval(arr.pop());
    aup = eval(arr.shift());
    a = aside + aup;

    if (a % 2 == 0) {
      color.style.backgroundColor = "#799cb1";
    }
    if (a % 2 !== 0) {
      color.style.backgroundColor = "#d5e0e5";
    }
  });
}
coloring();

//function to not remove the same team element

function reddish() {
  document.querySelectorAll(".box").forEach((i1) => {
    if (i1.style.backgroundColor == "pink") {
      document.querySelectorAll(".box").forEach((i2) => {
        if (i2.style.backgroundColor == "green" && i2.innerText.length !== 0) {
          greenText = i2.innerText;

          pinkText = i1.innerText;

          pinkColor = Array.from(pinkText).shift().toString();
          greenColor = Array.from(greenText).shift().toString();

          getId = i2.id;
          arr = Array.from(getId);
          arr.shift();
          aside = eval(arr.pop());
          aup = eval(arr.shift());
          a = aside + aup;

          if (a % 2 == 0 && pinkColor == greenColor) {
            i2.style.backgroundColor = "rgb(240, 201, 150)";
          }
          if (a % 2 !== 0 && pinkColor == greenColor) {
            i2.style.backgroundColor = "rgb(100, 75, 43)";
          }
        }
      });
    }
  });
}

tog = 1;

document.querySelectorAll(".box").forEach((item) => {
  item.addEventListener("click", function () {
    // To delete the opposite element

    if (item.style.backgroundColor == "green" && item.innerText.length == 0) {
      tog = tog + 1;
    } else if (
      item.style.backgroundColor == "green" &&
      item.innerText.length !== 0
    ) {
      document.querySelectorAll(".box").forEach((i) => {
        if (i.style.backgroundColor == "pink") {
          pinkId = i.id;
          pinkText = i.innerText;

          document.getElementById(pinkId).innerText = "";
          item.innerText = pinkText;
          coloring();
          insertImage();
          tog = tog + 1;
        }
      });
    }

    getId = item.id;
    arr = Array.from(getId);
    arr.shift();
    aside = eval(arr.pop());
    arr.push("0");
    aup = eval(arr.join(""));
    a = aside + aup;
    if (!gameStarted) {
      gameStarted = true;
      startTimer2();
      startTimer1();
      isFirstMove = true;
    }

    // Stop and start the respective timer based on the current turn
    if (isFirstMove) {
      if (isWhiteTurn) {
        stopTimer1();
        startTimer2();
      } else {
        stopTimer2();
        startTimer1();
      }
      isFirstMove = false;
    }

    // Swap turn after each move
    isWhiteTurn = !isWhiteTurn;

    // Check if the current move is the second move of the player
    if (!isFirstMove) {
      if (isWhiteTurn) {
        stopTimer1();
        startTimer2();
      } else {
        stopTimer2();
        startTimer1();
      }
    }
    // -------------------

    // Function to display the available paths for all pieces

    function whosTurn(toggle) {
      // PAWN
      if (item.innerText == `${toggle}pawn`) {
        item.style.backgroundColor = "pink";
        let firstMove = false;
        if (tog % 2 !== 0 && aup < 800) {
          if (aup === 200) firstMove = true;
          if (document.getElementById(`b${a + 100}`).innerText.length == 0) {
            document.getElementById(`b${a + 100}`).style.backgroundColor =
              "green";
            if (
              firstMove &&
              document.getElementById(`b${a + 200}`).innerText.length == 0
            ) {
              document.getElementById(`b${a + 200}`).style.backgroundColor =
                "green";
            }
          }
          if (
            aside < 8 &&
            document.getElementById(`b${a + 100 + 1}`).innerText.length !== 0
          ) {
            document.getElementById(`b${a + 100 + 1}`).style.backgroundColor =
              "green";
          }
          if (
            aside > 1 &&
            document.getElementById(`b${a + 100 - 1}`).innerText.length !== 0
          ) {
            document.getElementById(`b${a + 100 - 1}`).style.backgroundColor =
              "green";
          }

          // En passant
          let enPassantColor = toggle === "W" ? "B" : "W";
          if (
            document.getElementById(`b${a - 1}`) &&
            document.getElementById(`b${a - 1}`).innerText ===
              `${enPassantColor}pawn` &&
            aup === 500
          ) {
            document.getElementById(`b${a + 99}`).style.backgroundColor =
              "green";
          }
          if (
            document.getElementById(`b${a + 1}`) &&
            document.getElementById(`b${a + 1}`).innerText ===
              `${enPassantColor}pawn` &&
            aup === 500
          ) {
            document.getElementById(`b${a + 101}`).style.backgroundColor =
              "green";
          }
        }
        if (tog % 2 == 0 && aup > 100) {
          if (aup === 700) firstMove = true;
          if (document.getElementById(`b${a - 100}`).innerText.length == 0) {
            document.getElementById(`b${a - 100}`).style.backgroundColor =
              "green";
            if (
              firstMove &&
              document.getElementById(`b${a - 200}`).innerText.length == 0
            ) {
              document.getElementById(`b${a - 200}`).style.backgroundColor =
                "green";
            }
          }
          if (
            aside < 8 &&
            document.getElementById(`b${a - 100 + 1}`).innerText.length !== 0
          ) {
            document.getElementById(`b${a - 100 + 1}`).style.backgroundColor =
              "green";
          }
          if (
            aside > 1 &&
            document.getElementById(`b${a - 100 - 1}`).innerText.length !== 0
          ) {
            document.getElementById(`b${a - 100 - 1}`).style.backgroundColor =
              "green";
          }
          // En passant
          let enPassantColor = toggle === "W" ? "B" : "W";
          if (
            document.getElementById(`b${a - 1}`) &&
            document.getElementById(`b${a - 1}`).innerText ===
              `${enPassantColor}pawn` &&
            aup === 400
          ) {
            document.getElementById(`b${a - 101}`).style.backgroundColor =
              "green";
          }
          if (
            document.getElementById(`b${a + 1}`) &&
            document.getElementById(`b${a + 1}`).innerText ===
              `${enPassantColor}pawn` &&
            aup === 400
          ) {
            document.getElementById(`b${a - 99}`).style.backgroundColor =
              "green";
          }
        }
      }
      // KING

      if (item.innerText == `${toggle}king`) {
        if (aside < 8) {
          document.getElementById(`b${a + 1}`).style.backgroundColor = "green";
        }
        if (aside > 1) {
          document.getElementById(`b${a - 1}`).style.backgroundColor = "green";
        }
        if (aup < 800) {
          document.getElementById(`b${a + 100}`).style.backgroundColor =
            "green";
        }
        if (aup > 100) {
          document.getElementById(`b${a - 100}`).style.backgroundColor =
            "green";
        }

        if (aup > 100 && aside < 8) {
          document.getElementById(`b${a - 100 + 1}`).style.backgroundColor =
            "green";
        }
        if (aup > 100 && aside > 1) {
          document.getElementById(`b${a - 100 - 1}`).style.backgroundColor =
            "green";
        }
        if (aup < 800 && aside < 8) {
          document.getElementById(`b${a + 100 + 1}`).style.backgroundColor =
            "green";
        }
        if (aup < 800 && aside > 1) {
          document.getElementById(`b${a + 100 - 1}`).style.backgroundColor =
            "green";
        }

        item.style.backgroundColor = "pink";
      }

      // ROOK

      if (item.innerText == `${toggle}rook`) {
        for (let i = 1; i < 9; i++) {
          if (
            a + i * 100 < 900 &&
            document.getElementById(`b${a + i * 100}`).innerText == 0
          ) {
            document.getElementById(`b${a + i * 100}`).style.backgroundColor =
              "green";
          } else if (
            a + i * 100 < 900 &&
            document.getElementById(`b${a + i * 100}`).innerText !== 0
          ) {
            document.getElementById(`b${a + i * 100}`).style.backgroundColor =
              "green";
            break;
          }
        }

        for (let i = 1; i < 9; i++) {
          if (
            a - i * 100 > 100 &&
            document.getElementById(`b${a - i * 100}`).innerText == 0
          ) {
            document.getElementById(`b${a - i * 100}`).style.backgroundColor =
              "green";
          } else if (
            a - i * 100 > 100 &&
            document.getElementById(`b${a - i * 100}`).innerText !== 0
          ) {
            document.getElementById(`b${a - i * 100}`).style.backgroundColor =
              "green";
            break;
          }
        }

        for (let i = 1; i < 9; i++) {
          if (
            a + i < aup + 9 &&
            document.getElementById(`b${a + i}`).innerText == 0
          ) {
            document.getElementById(`b${a + i}`).style.backgroundColor =
              "green";
          } else if (
            a + i < aup + 9 &&
            document.getElementById(`b${a + i}`).innerText !== 0
          ) {
            document.getElementById(`b${a + i}`).style.backgroundColor =
              "green";
            break;
          }
        }

        for (let i = 1; i < 9; i++) {
          if (
            a - i > aup &&
            document.getElementById(`b${a - i}`).innerText == 0
          ) {
            document.getElementById(`b${a - i}`).style.backgroundColor =
              "green";
          } else if (
            a - i > aup &&
            document.getElementById(`b${a - i}`).innerText !== 0
          ) {
            document.getElementById(`b${a - i}`).style.backgroundColor =
              "green";
            break;
          }
        }

        item.style.backgroundColor = "pink";
      }

      // BISHOP

      if (item.innerText == `${toggle}bishop`) {
        for (let i = 1; i < 9; i++) {
          if (
            i < (900 - aup) / 100 &&
            i < 9 - aside &&
            document.getElementById(`b${a + i * 100 + i}`).innerText.length == 0
          ) {
            document.getElementById(
              `b${a + i * 100 + i}`
            ).style.backgroundColor = "green";
          } else if (
            i < (900 - aup) / 100 &&
            i < 9 - aside &&
            document.getElementById(`b${a + i * 100 + i}`).innerText.length !==
              0
          ) {
            document.getElementById(
              `b${a + i * 100 + i}`
            ).style.backgroundColor = "green";
            break;
          }
        }

        for (let i = 1; i < 9; i++) {
          if (
            i < aup / 100 &&
            i < 9 - aside &&
            document.getElementById(`b${a - i * 100 + i}`).innerText.length == 0
          ) {
            document.getElementById(
              `b${a - i * 100 + i}`
            ).style.backgroundColor = "green";
          } else if (
            i < aup / 100 &&
            i < 9 - aside &&
            document.getElementById(`b${a - i * 100 + i}`).innerText.length !==
              0
          ) {
            document.getElementById(
              `b${a - i * 100 + i}`
            ).style.backgroundColor = "green";
            break;
          }
        }

        for (let i = 1; i < 9; i++) {
          if (
            i < (900 - aup) / 100 &&
            i < aside &&
            document.getElementById(`b${a + i * 100 - i}`).innerText.length == 0
          ) {
            document.getElementById(
              `b${a + i * 100 - i}`
            ).style.backgroundColor = "green";
          } else if (
            i < (900 - aup) / 100 &&
            i < aside &&
            document.getElementById(`b${a + i * 100 - i}`).innerText.length !==
              0
          ) {
            document.getElementById(
              `b${a + i * 100 - i}`
            ).style.backgroundColor = "green";
            break;
          }
        }

        for (let i = 1; i < 9; i++) {
          if (
            i < aup / 100 &&
            i < aside &&
            document.getElementById(`b${a - i * 100 - i}`).innerText.length == 0
          ) {
            document.getElementById(
              `b${a - i * 100 - i}`
            ).style.backgroundColor = "green";
          } else if (
            i < aup / 100 &&
            i < aside &&
            document.getElementById(`b${a - i * 100 - i}`).innerText.length !==
              0
          ) {
            document.getElementById(
              `b${a - i * 100 - i}`
            ).style.backgroundColor = "green";
            break;
          }
        }

        item.style.backgroundColor = "pink";
      }

      // QUEEN

      if (item.innerText == `${toggle}queen`) {
        for (let i = 1; i < 9; i++) {
          if (
            a + i * 100 < 900 &&
            document.getElementById(`b${a + i * 100}`).innerText == 0
          ) {
            document.getElementById(`b${a + i * 100}`).style.backgroundColor =
              "green";
          } else if (
            a + i * 100 < 900 &&
            document.getElementById(`b${a + i * 100}`).innerText !== 0
          ) {
            document.getElementById(`b${a + i * 100}`).style.backgroundColor =
              "green";
            break;
          }
        }

        for (let i = 1; i < 9; i++) {
          if (
            a - i * 100 > 100 &&
            document.getElementById(`b${a - i * 100}`).innerText == 0
          ) {
            document.getElementById(`b${a - i * 100}`).style.backgroundColor =
              "green";
          } else if (
            a - i * 100 > 100 &&
            document.getElementById(`b${a - i * 100}`).innerText !== 0
          ) {
            document.getElementById(`b${a - i * 100}`).style.backgroundColor =
              "green";
            break;
          }
        }

        for (let i = 1; i < 9; i++) {
          if (
            a + i < aup + 9 &&
            document.getElementById(`b${a + i}`).innerText == 0
          ) {
            document.getElementById(`b${a + i}`).style.backgroundColor =
              "green";
          } else if (
            a + i < aup + 9 &&
            document.getElementById(`b${a + i}`).innerText !== 0
          ) {
            document.getElementById(`b${a + i}`).style.backgroundColor =
              "green";
            break;
          }
        }

        for (let i = 1; i < 9; i++) {
          if (
            a - i > aup &&
            document.getElementById(`b${a - i}`).innerText == 0
          ) {
            document.getElementById(`b${a - i}`).style.backgroundColor =
              "green";
          } else if (
            a - i > aup &&
            document.getElementById(`b${a - i}`).innerText !== 0
          ) {
            document.getElementById(`b${a - i}`).style.backgroundColor =
              "green";
            break;
          }
        }

        for (let i = 1; i < 9; i++) {
          if (
            i < (900 - aup) / 100 &&
            i < 9 - aside &&
            document.getElementById(`b${a + i * 100 + i}`).innerText.length == 0
          ) {
            document.getElementById(
              `b${a + i * 100 + i}`
            ).style.backgroundColor = "green";
          } else if (
            i < (900 - aup) / 100 &&
            i < 9 - aside &&
            document.getElementById(`b${a + i * 100 + i}`).innerText.length !==
              0
          ) {
            document.getElementById(
              `b${a + i * 100 + i}`
            ).style.backgroundColor = "green";
            break;
          }
        }

        for (let i = 1; i < 9; i++) {
          if (
            i < aup / 100 &&
            i < 9 - aside &&
            document.getElementById(`b${a - i * 100 + i}`).innerText.length == 0
          ) {
            document.getElementById(
              `b${a - i * 100 + i}`
            ).style.backgroundColor = "green";
          } else if (
            i < aup / 100 &&
            i < 9 - aside &&
            document.getElementById(`b${a - i * 100 + i}`).innerText.length !==
              0
          ) {
            document.getElementById(
              `b${a - i * 100 + i}`
            ).style.backgroundColor = "green";
            break;
          }
        }

        for (let i = 1; i < 9; i++) {
          if (
            i < (900 - aup) / 100 &&
            i < aside &&
            document.getElementById(`b${a + i * 100 - i}`).innerText.length == 0
          ) {
            document.getElementById(
              `b${a + i * 100 - i}`
            ).style.backgroundColor = "green";
          } else if (
            i < (900 - aup) / 100 &&
            i < aside &&
            document.getElementById(`b${a + i * 100 - i}`).innerText.length !==
              0
          ) {
            document.getElementById(
              `b${a + i * 100 - i}`
            ).style.backgroundColor = "green";
            break;
          }
        }

        for (let i = 1; i < 9; i++) {
          if (
            i < aup / 100 &&
            i < aside &&
            document.getElementById(`b${a - i * 100 - i}`).innerText.length == 0
          ) {
            document.getElementById(
              `b${a - i * 100 - i}`
            ).style.backgroundColor = "green";
          } else if (
            i < aup / 100 &&
            i < aside &&
            document.getElementById(`b${a - i * 100 - i}`).innerText.length !==
              0
          ) {
            document.getElementById(
              `b${a - i * 100 - i}`
            ).style.backgroundColor = "green";
            break;
          }
        }

        item.style.backgroundColor = "pink";
      }

      // KNIGHT

      if (item.innerText == `${toggle}knight`) {
        if (aside < 7 && aup < 800) {
          document.getElementById(`b${a + 100 + 2}`).style.backgroundColor =
            "green";
        }
        if (aside < 7 && aup > 200) {
          document.getElementById(`b${a - 100 + 2}`).style.backgroundColor =
            "green";
        }
        if (aside < 8 && aup < 700) {
          document.getElementById(`b${a + 200 + 1}`).style.backgroundColor =
            "green";
        }
        if (aside > 1 && aup < 700) {
          document.getElementById(`b${a + 200 - 1}`).style.backgroundColor =
            "green";
        }
        if (aside > 2 && aup < 800) {
          document.getElementById(`b${a - 2 + 100}`).style.backgroundColor =
            "green";
        }
        if (aside > 2 && aup > 100) {
          document.getElementById(`b${a - 2 - 100}`).style.backgroundColor =
            "green";
        }
        if (aside < 8 && aup > 200) {
          document.getElementById(`b${a - 200 + 1}`).style.backgroundColor =
            "green";
        }
        if (aside > 1 && aup > 200) {
          document.getElementById(`b${a - 200 - 1}`).style.backgroundColor =
            "green";
        }

        item.style.backgroundColor = "pink";
      }
    }

    // winning()

    numOfKings = 0;

    document.querySelectorAll(".box").forEach((win) => {
      if (win.innerText == "Wking" || win.innerText == "Bking") {
        numOfKings += 1;
      }
    });

    if (numOfKings == 1) {
      setTimeout(() => {
        if (tog % 2 == 0) {
          alert("White Wins !!");
          location.reload();
        } else if (tog % 2 !== 0) {
          alert("Black Wins !!");
          location.reload();
        }
      }, 100);
    }

    // Toggling the turn

    if (tog % 2 !== 0) {
      document.getElementById("tog").innerText = "White's Turn";
      whosTurn("W");
    }
    if (tog % 2 == 0) {
      document.getElementById("tog").innerText = "Black's Turn";
      whosTurn("B");
    }

    reddish();

    function handleMove() {
      if (tog % 2 !== 0) {
        // White's turn
        isWhiteTurn = true;
        stopTimer(); // Stop the timer for the previous player
        player1Time = selectedTimeControl;
        displayTime(player1Time, "player1Time");
        startTimer();
      } else {
        // Black's turn
        isWhiteTurn = false;
        stopTimer();
        player2Time = selectedTimeControl;
        displayTime(player2Time, "player2Time");
        startTimer();
      }
    }

    handleMove();
  });
});
// -----------------------------------------------------------

// Moving the element
document.querySelectorAll(".box").forEach((hathiTest) => {
  hathiTest.addEventListener("click", function () {
    if (hathiTest.style.backgroundColor == "pink") {
      pinkId = hathiTest.id;
      pinkText = hathiTest.innerText;

      document.querySelectorAll(".box").forEach((hathiTest2) => {
        hathiTest2.addEventListener("click", function () {
          if (
            hathiTest2.style.backgroundColor == "green" &&
            hathiTest2.innerText.length == 0
          ) {
            document.getElementById(pinkId).innerText = "";
            hathiTest2.innerText = pinkText;
            coloring();
            insertImage();
          }
        });
      });
    }
  });
});

// ---------------------------------------------

// Prvents from selecting multiple elements
z = 0;
document.querySelectorAll(".box").forEach((ee) => {
  ee.addEventListener("click", function () {
    z = z + 1;
    if (z % 2 == 0 && ee.style.backgroundColor !== "green") {
      coloring();
    }
  });
});

//---------------stopwatch-------------
let selectedTimeControl = 0;
let player1Time = 0;
let player2Time = 0;
let isWhiteTurn = true;
let timerInterval1 = null;
let timerInterval2 = null;
let isTimerRunning1 = false;
let isTimerRunning2 = false;
let gameStarted = false;
let isFirstMove = false;

function startTimer1() {
  if (!isTimerRunning1) {
    clearInterval(timerInterval1);
    isTimerRunning1 = true;
    timerInterval1 = setInterval(() => {
      if (player1Time > 0) {
        player1Time--;
        displayTime(player1Time, "player1Time");
      } else {
        stopTimer1();
        alert("Time's up for Black!");
      }
    }, 1000);
  }
}

function stopTimer1() {
  clearInterval(timerInterval1);
  isTimerRunning1 = false;
}

function startTimer2() {
  if (!isTimerRunning2) {
    clearInterval(timerInterval2);
    isTimerRunning2 = true;
    timerInterval2 = setInterval(() => {
      if (player2Time > 0) {
        player2Time--;
        displayTime(player2Time, "player2Time");
      } else {
        stopTimer2();
        alert("Time's up for White!");
      }
    }, 1000);
  }
}

function stopTimer2() {
  clearInterval(timerInterval2);
  isTimerRunning2 = false;
}

function displayTime(time, elementId) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const hoursDisplay = hours.toString().padStart(2, "0");
  const minutesDisplay = minutes.toString().padStart(2, "0");
  const secondsDisplay = seconds.toString().padStart(2, "0");

  const element = document.getElementById(elementId);
  element.innerHTML = `
    <span class="digit" id="${elementId}-hr">
      ${hoursDisplay} : </span>
    <span class="digit" id="${elementId}-min">
      ${minutesDisplay} : </span>
    <span class="digit" id="${elementId}-sec">
      ${secondsDisplay}  </span>
  `;
}

document.getElementById("player1").addEventListener("click", handleFirstMove);

function handleFirstMove() {
  if (!isFirstMove) {
    isFirstMove = true;
    let temp = player1Time;
    player1Time = player2Time;
    player2Time = temp;

    if (isWhiteTurn) {
      stopTimer2();
      startTimer1();
    } else {
      stopTimer1();
      startTimer2();
    }
  }
}

document.getElementById("timecontrol").addEventListener("change", function () {
  gameStarted = false;
  isFirstMove = false;
  stopTimer1();
  stopTimer2();

  selectedTimeControl = parseInt(this.value);
  player1Time = selectedTimeControl;
  player2Time = selectedTimeControl;
  displayTime(player1Time, "player1Time");
  displayTime(player2Time, "player2Time");
});
