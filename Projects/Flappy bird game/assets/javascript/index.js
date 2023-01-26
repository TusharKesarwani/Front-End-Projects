// ────────────────────────────────────────────────────────────────────  ──────────
//   :::::: M A I N   V A R I A B L E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────
const RAD = Math.PI / 180;
const canvas = document.getElementById("canvas");
const canvasTx = canvas.getContext("2d");
canvasTx.tabIndex = 1;
var screenFrame = 0;
const player = {
  gameActive: true,
  gamePlaying: false,
};

// ────────────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: M A I N   F U C N T I O N S   S E E   D O W N   B E L O W : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────────────────
["keydown", "click"].forEach((event) => {
  window.addEventListener(
    event,
    () => {
      if (player.gameActive) {
        player.gameActive = false;
        player.gamePlaying = true;
        pipe.pipe = [];
      }
      if (player.gamePlaying) {
        playingObject.flying();
        SFX.bg.play();
        SFX.start.play();
      } else {
        pipe.pipe = [];
        SFX.bg.currentTime = 0;
        playingObject.rotatation = 0;
        playingObject.position.y = 50;
        UI.score[0].current = 0;
        player.gameActive = true;
      }
      return true;
    },
    true
  );
});

// ─── DRAW AND ANIMETED THE BRID ──────────────────────────────────────────────────────────
const playingObject = {
  frames: 0,
  position: { x: 60, y: 50 },
  speed: 0,
  gravity: 0.125,
  thrust: 2.6,
  rotatation: 0,
  imgAnimation: [
    { playObjectImg: new Image() },
    { playObjectImg: new Image() },
    { playObjectImg: new Image() },
  ],
  drewPlayObject() {
    canvasTx.save();
    canvasTx.translate(this.position.x, this.position.y);
    canvasTx.rotate(this.rotatation * RAD);
    canvasTx.drawImage(
      this.imgAnimation[this.frames].playObjectImg,
      -this.imgAnimation[this.frames].playObjectImg.width / 2,
      -this.imgAnimation[this.frames].playObjectImg.height / 2
    );
    canvasTx.restore();
  },
  updateFrames() {
    if (player.gameActive) {
      this.frames += screenFrame % 10 == 0 ? 1 : 0; // * CONTROL FPS
      this.position.y += screenFrame % 8 == 0 ? Math.sin(screenFrame * RAD) : 0; // * TRANSLATE THE BRID
    } else if (player.gamePlaying) {
      this.frames += screenFrame % 10 == 0 ? 1 : 0; // * CONTROL FPS
      this.position.y += this.speed;
      this.speed += this.gravity;
      this.objectRotation();
      // pipe.pipe = [];
      this.collisioned();
    } else if (!player.gameActive && !player.gamePlaying) {
      this.frames = 1;
      if (
        this.position.y +
          parseFloat(this.imgAnimation[0].playObjectImg.width / 2) <
        ground.position.y
      ) {
        this.position.y += this.speed;
        this.objectRotation();
        this.speed += this.gravity * 2;
      }
    }
    this.frames = this.frames % this.imgAnimation.length; // ? CONTROL BRID ANIMETION
  },
  flying() {
    // ? WHEN KEY PRESS THEN RUN
    if (this.position.y > 0) {
      SFX.flap.play();
      this.speed = -this.thrust;
    }
  },
  objectRotation() {
    if (this.speed <= 0) {
      this.rotatation = Math.max(-25, (-25 * this.speed) / (-1 * this.thrust));
    } else if (this.speed > 0) {
      this.rotatation = Math.min(90, (90 * this.speed) / (this.thrust * 2));
    }
  },
  collisioned() {
    if (!pipe.pipe.length) return;
    let x = pipe.pipe[0].x;
    let y = pipe.pipe[0].y;
    let bridPro =
      parseFloat(this.imgAnimation[0].playObjectImg.width) / 4 +
      parseFloat(this.imgAnimation[0].playObjectImg.width) / 4;
    let groudPro = parseFloat(canvas.height - ground.groundImg.height);
    let pipeH = y + parseFloat(pipe.topPipe.pipeImg.height);
    let pipeW = parseFloat(pipe.topPipe.pipeImg.width);
    if (groudPro - bridPro <= this.position.y) {
      player.gamePlaying = false;
    }
    if (this.position.x + bridPro / 2 >= x) {
      if (this.position.x + bridPro < x + pipeW) {
        if (
          this.position.y - bridPro <= pipeH ||
          this.position.y + bridPro >= pipeH + pipe.pipeGap
        ) {
          SFX.hit.play();
          SFX.bg.pause();
          player.gamePlaying = false;
        }
      }
    }
  },
};
// ─── DRAW THE BACKGROUND ────────────────────────────────────────────────────────
const background = {
  backgroundImg: new Image(),
  position: { x: 0, y: 0 },
  drewBackground() {
    canvasTx.drawImage(
      this.backgroundImg,
      this.position.x,
      parseFloat(canvas.height - this.backgroundImg.height)
    );
    // console.log(parseFloat(canvas.height - this.backgroundImg.height))
  },
};

// ─── DRAW THE GROUND ────────────────────────────────────────────────────────────
const ground = {
  groundImg: new Image(),
  dx: 2,
  position: { x: 0, y: 0 },
  drewGround() {
    canvasTx.drawImage(
      this.groundImg,
      this.position.x,
      parseFloat(canvas.height - this.groundImg.height)
    );
  },
  updateGround() {
    if (player.gamePlaying) {
      this.position.x -= this.dx;
      this.position.x = this.position.x % (this.groundImg.width / 14);
    }
  },
};

// ─── DRAW THE PIPES ,TOP AND BOTTOM ──────────────────────────────────────────────
const pipe = {
  topPipe: { pipeImg: new Image() },
  bottomPipe: { pipeImg: new Image() },
  pipe: [],
  pipeGap: 85,
  move: true,
  drewPipe() {
    for (let i = 0; i < this.pipe.length; i++) {
      let p = this.pipe[i];
      canvasTx.drawImage(this.topPipe.pipeImg, p.x, p.y);
      canvasTx.drawImage(
        this.bottomPipe.pipeImg,
        p.x,
        p.y + this.topPipe.pipeImg.height + this.pipeGap
      );
    }
  },
  pipeUpdate() {
    if (player.gameActive) {
      if (screenFrame % 135 == 0) {
        // ? AUTOPLAYING
        let ren = -210 * Math.min(Math.random() + 0.9, 1.7);
        this.pipe.push({
          x: parseFloat(canvas.width),
          y: ren,
        });
        playingObject.position.y =
          ren + this.topPipe.pipeImg.height + this.pipeGap - 60;
      }
      this.pipe.forEach((pipe) => {
        pipe.x -= ground.dx;
      });
    } else if (player.gamePlaying) {
      if (screenFrame % 100 == 0) {
        let ren = -210 * Math.min(Math.random() + 0.9, 1.7);
        this.pipe.push({
          x: parseFloat(canvas.width),
          y: ren,
        });
      }
      if (this.move) {
        UI.score[0].current++;
        SFX.score.play();
        this.move = false;
      }
      this.pipe.forEach((pipe) => {
        pipe.x -= ground.dx;
      });
    }
    if (this.pipe.length && this.pipe[0].x < -this.topPipe.pipeImg.width) {
      this.pipe.shift();
      this.move = true;
    }
  },
};

// ─── START AND END UI DEGIN ─────────────────────────────────────────────────────
const UI = {
  frames: 0,
  game: [{ start: new Image() }, { over: new Image() }],
  tap: [{ tapImg: new Image() }, { tapImg: new Image() }],
  score: [{ current: 0, best: 0 }],
  drewUI() {
    if (player.gameActive) {
      canvasTx.fillStyle = "rgb(126 255 90 / 30%)";
      canvasTx.fillRect(0, 0, canvas.width, canvas.height);
      canvasTx.drawImage(
        this.game[0].start,
        (canvas.width - this.game[0].start.width) / 2,
        (canvas.height - this.game[0].start.height) / 3
      );
      canvasTx.drawImage(
        this.tap[this.frames].tapImg,
        (canvas.width - this.tap[this.frames].tapImg.width) / 2,
        (canvas.height - this.tap[this.frames].tapImg.height) / 1.7
      );
    }
    if (!player.gamePlaying && !player.gameActive) {
      canvasTx.fillStyle = "rgb(60 100 20 / 20%)";
      canvasTx.fillRect(0, 0, canvas.width, canvas.height);
      canvasTx.drawImage(
        this.game[1].over,
        (canvas.width - this.game[1].over.width) / 2,
        (canvas.height - this.game[1].over.height) / 2
      );
      canvasTx.drawImage(
        this.tap[this.frames].tapImg,
        (canvas.width - this.tap[this.frames].tapImg.width) / 2,
        (canvas.height - this.tap[this.frames].tapImg.height) / 1.7
      );
      SFX.bg.pause();
    }
    this.drewScore();
  },
  drewScore() {
    canvasTx.fillStyle = "#2d8b26";
    canvasTx.font = "20px monospace";
    if (player.gamePlaying) {
      canvasTx.fillText(
        `Score:${this.score[0].current}`,
        canvas.width / 20,
        canvas.height - 60
      );
      canvasTx.strokeText(
        `Score:${this.score[0].current}`,
        canvas.width / 20,
        canvas.height - 60
      );
    } else if (player.gameActive) {
      canvasTx.fillText(
        `Best:${localStorage.getItem("best")}`,
        canvas.height / 20,
        canvas.height - 60
      );
      canvasTx.strokeText(
        `Best:${localStorage.getItem("best")}`,
        canvas.height / 20,
        canvas.height - 60
      );
    } else {
      canvasTx.fillText(
        `Your Score:${this.score[0].current}`,
        canvas.height / 20,
        canvas.height - 60
      );
      canvasTx.strokeText(
        `Your Score:${this.score[0].current}`,
        canvas.height / 20,
        canvas.height - 60
      );
    }
  },
  updateUI() {
    if (player.gamePlaying) {
      // ? SETING SCORE
      this.score[0].best = Math.max(
        this.score[0].current,
        localStorage.getItem("best")
      );

      localStorage.setItem("best", this.score[0].best);
    }
    this.frames += screenFrame % 20 == 0 ? 1 : 0;
    this.frames = this.frames % this.tap.length;
  },
};

// ─── AUDIOS SET ─────────────────────────────────────────────────────────────────
const SFX = {
  start: new Audio(),
  flap: new Audio(),
  score: new Audio(),
  hit: new Audio(),
  bg: new Audio(),
  played: false,
};
// ────────────────────────────────────────────────────────────────────────────────
const updateElements = () => {
  playingObject.updateFrames();
  ground.updateGround();
  pipe.pipeUpdate();
  UI.updateUI();
};
const drewElements = () => {
  canvas.height = 450;
  canvas.width = 250;
  canvasTx.fillStyle = "#47f0a9";
  canvasTx.fillRect(0, 0, canvas.width, canvas.height);
  background.drewBackground();
  pipe.drewPipe();
  ground.drewGround();
  playingObject.drewPlayObject();
  UI.drewScore();
  UI.drewUI();
};

function gameLoop() {
  // ? INCRESING FRAMES (fps)
  screenFrame++;
  updateElements();
  drewElements();
  requestAnimationFrame(gameLoop);
}

gameLoop();

// ─── ALL SOURCE SEE DOWN BELOW ──────────────────────────────────────────────────
// TODO BRID IMGS
playingObject.imgAnimation[0].playObjectImg.src =
  "assets/images/brid_img/1_brid.png";
playingObject.imgAnimation[1].playObjectImg.src =
  "assets/images/brid_img/2_brid.png";
playingObject.imgAnimation[2].playObjectImg.src =
  "assets/images/brid_img/3_brid.png";
// TODO BACKGROUND IMGS
background.backgroundImg.src = "assets/images/ground/background.png";
// TODO GROUND IMGS
ground.groundImg.src = "assets/images/ground/1_ground.png";
// TODO PIPE IMGS
pipe.topPipe.pipeImg.src = "assets/images/pipe_img/toppipe.png";
pipe.bottomPipe.pipeImg.src = "assets/images/pipe_img/botpipe.png";
// TODO UI IMGS
UI.game[0].start.src = "assets/images/start&over_game_img/getready.png";
UI.game[1].over.src = "assets/images/start&over_game_img/gameOver.png";
UI.tap[0].tapImg.src = "assets/images/start&over_game_img/1_tap.png";
UI.tap[1].tapImg.src = "assets/images/start&over_game_img/2_tap.png";
// TODO AUDIO SRC
SFX.start.src = "assets/audio/Main_sounds/start.wav";
SFX.flap.src = "assets/audio/Main_sounds/flap.wav";
SFX.score.src = "assets/audio/Main_sounds/score.wav";
SFX.hit.src = "assets/audio/Main_sounds/hit.wav";
SFX.bg.src = "assets/audio/bg_songs/bg.mp3";

// ? AUDIO PROPATIES
SFX.start.volume = 0.2;
SFX.flap.volume = 0.2;
SFX.score.volume = 0.2;
SFX.hit.volume = 0.2;
// ────────────────────────────────────────────────────────────────────────────────
