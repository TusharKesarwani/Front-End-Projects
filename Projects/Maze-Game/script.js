function generateMazeGrid(width, height) {
  // Maze generator class inside function
  class MazeGrid {
    constructor(w, h) {
      this.width = w;
      this.height = h;
      this.grid = [];
      for (let y = 0; y < h; y++) {
        this.grid[y] = [];
        for (let x = 0; x < w; x++) {
          this.grid[y][x] = { visited: false, walls: [true, true, true, true] };
        }
      }
    }

    getUnvisitedNeighbors(x, y) {
      const neighbors = [];
      if (y > 0 && !this.grid[y - 1][x].visited) neighbors.push({ x, y: y - 1, dir: 0 });
      if (x < this.width - 1 && !this.grid[y][x + 1].visited) neighbors.push({ x: x + 1, y, dir: 1 });
      if (y < this.height - 1 && !this.grid[y + 1][x].visited) neighbors.push({ x, y: y + 1, dir: 2 });
      if (x > 0 && !this.grid[y][x - 1].visited) neighbors.push({ x: x - 1, y, dir: 3 });
      return neighbors;
    }

    removeWalls(x, y, nx, ny, dir) {
      this.grid[y][x].walls[dir] = false;
      this.grid[ny][nx].walls[(dir + 2) % 4] = false;
    }

    generateMaze(x = 0, y = 0) {
      this.grid[y][x].visited = true;
      let neighbors = this.getUnvisitedNeighbors(x, y);
      while (neighbors.length > 0) {
        const rand = Math.floor(Math.random() * neighbors.length);
        const { x: nx, y: ny, dir } = neighbors[rand];
        if (!this.grid[ny][nx].visited) {
          this.removeWalls(x, y, nx, ny, dir);
          this.generateMaze(nx, ny);
        }
        neighbors.splice(rand, 1);
      }
    }

    toOutputGrid() {
      const outWidth = this.width * 2 + 1;
      const outHeight = this.height * 2 + 1;
      const output = Array.from({ length: outHeight }, () => Array(outWidth).fill(1));

      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          const outY = y * 2 + 1;
          const outX = x * 2 + 1;
          output[outY][outX] = 0;

          const cell = this.grid[y][x];
          if (!cell.walls[0]) output[outY - 1][outX] = 0;
          if (!cell.walls[1]) output[outY][outX + 1] = 0;
          if (!cell.walls[2]) output[outY + 1][outX] = 0;
          if (!cell.walls[3]) output[outY][outX - 1] = 0;
        }
      }

      // Mark goal at bottom-right open cell
      output[outHeight - 2][outWidth - 2] = 'G';

      return output;
    }
  }

  const maze = new MazeGrid(width, height);
  maze.generateMaze();
  return maze.toOutputGrid();
}

// Example:
const mazeArray = generateMazeGrid(7, 10); // This is your 2D array
console.log(mazeArray);    



const mazeData = mazeArray;

const grid = document.getElementById('grid');
const popup = document.getElementById('popup');
const popupClose = document.getElementById('popup-close');
const resetBtn = document.getElementById('resetBtn');
const timerDisplay = document.getElementById('timer');

const ROWS = mazeData.length;
const COLS = mazeData[0].length;

let dragonPos = { row: 1, col: 1 };
let timer = 60;
let timerInterval;

function drawMaze() {
  grid.innerHTML = '';
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const tile = document.createElement('div');
      tile.classList.add('tile');

      if (mazeData[r][c] === 1) tile.classList.add('wall');
      if (mazeData[r][c] === 'G') tile.classList.add('goal');
      if (r === dragonPos.row && c === dragonPos.col) {
        tile.classList.add('dragon');
        tile.innerHTML = '🐉';
      }

      grid.appendChild(tile);
    }
  }
}

function canMove(row, col) {
  return (
    row >= 0 &&
    col >= 0 &&
    row < ROWS &&
    col < COLS &&
    mazeData[row][col] !== 1
  );
}

function moveDragon(dr, dc) {
  const newRow = dragonPos.row + dr;
  const newCol = dragonPos.col + dc;

  if (!canMove(newRow, newCol)) return;

  dragonPos = { row: newRow, col: newCol };
  drawMaze();

  if (mazeData[newRow][newCol] === 'G') {
    clearInterval(timerInterval);
    let score=timer*10;
    showPopup(`🎉 You reached the mountaintop!<br>Score: ${score}`);
    window.removeEventListener('keydown', handleKey);
  }
}

function handleKey(e) {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
    e.preventDefault();
    switch (e.key) {
      case 'ArrowUp': moveDragon(-1, 0); break;
      case 'ArrowDown': moveDragon(1, 0); break;
      case 'ArrowLeft': moveDragon(0, -1); break;
      case 'ArrowRight': moveDragon(0, 1); break;
    }
  }
}

function showPopup(message) {
  console.log("Popup triggered with message:", message);
  document.getElementById('popup-message').innerHTML = message;
  popup.classList.remove('hidden');
}


function updateTimerDisplay() {
  timerDisplay.textContent = `⏱ Time Left: ${timer}s`;
}

function startTimer() {
  clearInterval(timerInterval);
  timer = 30;
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    timer--;
    updateTimerDisplay();
    if (timer <= 0) {
      clearInterval(timerInterval);
      showPopup("⏰ Time's up! The dragon got lost in the clouds!");
      window.removeEventListener('keydown', handleKey);
    }
  }, 1000);
}

resetBtn.addEventListener('click', () => {
  dragonPos = { row: 1, col: 1 };
  drawMaze();
  popup.classList.add('hidden');
  window.addEventListener('keydown', handleKey);
  startTimer();
});

popupClose.addEventListener('click', () => {
  popup.classList.add('hidden');
});

window.addEventListener('keydown', handleKey);

// Start game
drawMaze();
startTimer();
