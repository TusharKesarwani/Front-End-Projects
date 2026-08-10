const rows = 10;
const cols = 10;
const minesCount = 20;
let grid = [];
let minePositions = [];
let timer = 0;
let timerInterval;

function startTimer() {
  timer = 0;
  clearInterval(timerInterval);
  updateTimerDisplay(0, 0);
  timerInterval = setInterval(() => {
    timer++;
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    updateTimerDisplay(minutes, seconds);
  }, 1000);
}

function updateTimerDisplay(minutes, seconds) {
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');
  document.getElementById('timer').textContent = `Time: ${formattedMinutes}:${formattedSeconds}`;
}


function initGame() {
    const container = document.getElementById('game-container');
    container.style.gridTemplateRows = `repeat(${rows}, auto)`;
    container.style.gridTemplateColumns = `repeat(${cols}, auto)`;
    
  startTimer();

  grid = Array(rows).fill().map(() => Array(cols).fill({}));
  container.innerHTML = '';

  minePositions = [];
  while (minePositions.length < minesCount) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (!minePositions.some(([x, y]) => x === r && y === c)) {
      minePositions.push([r, c]);
      grid[r][c] = { mine: true, revealed: false, flag: false };
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!grid[r][c].mine) {
        const adjacentMines = countAdjacentMines(r, c);
        grid[r][c] = { mine: false, revealed: false, flag: false, adjacentMines };
      }
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.addEventListener('click', () => revealCell(r, c));
      cell.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        toggleFlag(r, c);
      });
      container.appendChild(cell);
    }
  }
  
}

function countAdjacentMines(r, c) {
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1], [1, 0], [1, 1],
  ];
  return directions.reduce((count, [dr, dc]) => {
    const nr = r + dr;
    const nc = c + dc;
    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc]?.mine) {
      count++;
    }
    return count;
  }, 0);
}

function revealCell(r, c) {
  if (grid[r][c].revealed || grid[r][c].flag) return;

  const cell = document.querySelector(`[data-row='${r}'][data-col='${c}']`);
  grid[r][c].revealed = true;

  if (grid[r][c].mine) {
    cell.classList.add('mine');
    cell.innerHTML = `<img src="img/mine.png" alt="Mine">`;
    alert('Game Over! You hit a mine. 💣');
    clearInterval(timerInterval);
    return initGame();
  }

  cell.classList.add('revealed');
  if (grid[r][c].adjacentMines > 0) {
    cell.textContent = grid[r][c].adjacentMines;
  } else {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1], [1, 0], [1, 1],
    ];
    directions.forEach(([dr, dc]) => {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        revealCell(nr, nc);
      }
    });
  }
}

function toggleFlag(r, c) {
  if (grid[r][c].revealed) return;

  const cell = document.querySelector(`[data-row='${r}'][data-col='${c}']`);
  grid[r][c].flag = !grid[r][c].flag;
  cell.classList.toggle('flag');
  cell.innerHTML = grid[r][c].flag
    ? `<img src="img/flag.png" alt="Flag">`
    : '';
}

function finishGame(win) {
    clearInterval(timerInterval);
    isGameOver = true;
    const message = win
      ? `Congratulations! You won the game in ${formatTime(timer)}! 🎉`
      : "Game Over! You hit a mine. 💣";
  
    showEndMessage(message);
  }
  
  function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  
  function showEndMessage(message) {
    const messageContainer = document.createElement("div");
    messageContainer.id = "end-message";
    messageContainer.textContent = message;
    document.body.appendChild(messageContainer);
  
    // Add styles for the message
    messageContainer.style.position = "fixed";
    messageContainer.style.top = "50%";
    messageContainer.style.left = "50%";
    messageContainer.style.transform = "translate(-50%, -50%)";
    messageContainer.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    messageContainer.style.color = "#fff";
    messageContainer.style.padding = "20px";
    messageContainer.style.borderRadius = "10px";
    messageContainer.style.textAlign = "center";
    messageContainer.style.fontSize = "18px";
    messageContainer.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    messageContainer.style.zIndex = "1000";
  }

// Start the game
initGame();
