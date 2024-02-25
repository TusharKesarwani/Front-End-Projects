//variables
let SongIndex = 0;
let audioElement = new Audio(`songs/${SongIndex}.mp3`);
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let masterSongName = document.getElementById("masterSongName");
let gif = document.getElementById("gif");
let songItem = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  {
    songName: "Chahun Main Ya Na",
    filepath: "songs/0.mp3",
    coverpath: "covers/A2.png",
    len: "05:05",
  },
  {
    songName: "Hosanna",
    filepath: "songs/1.mp3",
    coverpath: "covers/H.jpg",
    len: "05:31",
  },
  {
    songName: "Man mast Magan",
    filepath: "songs/2.mp3",
    coverpath: "covers/2S.jpg",
    len: "04:40",
  },
  {
    songName: "Pehla Pyaar",
    filepath: "songs/3.mp3",
    coverpath: "covers/KS.png",
    len: "04:32",
  },
  {
    songName: "Raanjhanaa",
    filepath: "songs/4.mp3",
    coverpath: "covers/R.jpg",
    len: "04:16",
  },
  {
    songName: "Tose Naina",
    filepath: "songs/5.mp3",
    coverpath: "covers/TS.jpg",
    len: "04:23",
  },
  {
    songName: "Tujhe Kitna Chahein Aur",
    filepath: "songs/6.mp3",
    coverpath: "covers/KS.png",
    len: "04:36",
  },
  {
    songName: "Tum Hi Ho",
    filepath: "songs/7.mp3",
    coverpath: "covers/A2.png",
    len: "04:22",
  },
  {
    songName: "Tum Tak",
    filepath: "songs/8.mp3",
    coverpath: "covers/R.jpg",
    len: "05:05",
  },
  {
    songName: "Zindagi Kuch Toh Bata",
    filepath: "songs/9.mp3",
    coverpath: "covers/BB.jpg",
    len: "04:23",
  },
];
songItem.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverpath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
  element.getElementsByClassName("time")[0].innerText = songs[i].len;
});

//master play-pause
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
    Array.from(document.getElementsByClassName("songItem"))[
      `${SongIndex}`
    ].style.background = "rgba(115, 225, 247, 1)";
    audioElement.addEventListener("ended", () => {
      masterPlay.classList.remove("fa-circle-pause");
      masterPlay.classList.add("fa-circle-play");
      gif.style.opacity = 0;
      if (SongIndex >= 9) {
        SongIndex = 0;
      } else {
        SongIndex += 1;
      }
      audioElement.src = `songs/${SongIndex}.mp3`;
      masterSongName.innerText = songs[SongIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove("fa-circle-play");
      masterPlay.classList.add("fa-circle-pause");
      makeAllbgs();
      Array.from(document.getElementsByClassName("songItem"))[
        `${SongIndex}`
      ].style.background = "rgba(115, 225, 247, 1)";
    });
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
  }
});

//listen to events
audioElement.addEventListener("timeupdate", () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

//slider update
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
  if (audioElement.currentTime == audioElement.duration) {
    myProgressBar.value = 0;
  }
});

//for box backgrounds
const makeAllbgs = () => {
  Array.from(document.getElementsByClassName("songItem")).forEach((element) => {
    element.style.background = "rgba(115, 225, 247, 0.6)";
  });
};

//play from box
Array.from(document.getElementsByClassName("songItem")).forEach((element) => {
  element.addEventListener("click", () => {
    SongIndex = parseInt(element.id);
    audioElement.src = `songs/${SongIndex}.mp3`;
    masterSongName.innerText = songs[SongIndex].songName;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
    audioElement.addEventListener("ended", () => {
      if (SongIndex >= 9) {
        SongIndex = 0;
      } else {
        SongIndex += 1;
      }
      audioElement.src = `songs/${SongIndex}.mp3`;
      masterSongName.innerText = songs[SongIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove("fa-circle-play");
      masterPlay.classList.add("fa-circle-pause");
      makeAllbgs();
      Array.from(document.getElementsByClassName("songItem"))[
        `${SongIndex}`
      ].style.background = "rgba(115, 225, 247, 1)";
    });
    makeAllbgs();
    Array.from(document.getElementsByClassName("songItem"))[
      `${SongIndex}`
    ].style.background = "rgba(115, 225, 247, 1)";
  });
});

//next
document.getElementById("next").addEventListener("click", () => {
  if (SongIndex >= 9) {
    SongIndex = 0;
  } else {
    SongIndex += 1;
  }
  audioElement.src = `songs/${SongIndex}.mp3`;
  masterSongName.innerText = songs[SongIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  makeAllbgs();
  Array.from(document.getElementsByClassName("songItem"))[
    `${SongIndex}`
  ].style.background = "rgba(115, 225, 247, 1)";
});

//previous
document.getElementById("previous").addEventListener("click", () => {
  if (SongIndex <= 0) {
    SongIndex = 0;
  } else {
    SongIndex -= 1;
  }
  audioElement.src = `songs/${SongIndex}.mp3`;
  masterSongName.innerText = songs[SongIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  makeAllbgs();
  Array.from(document.getElementsByClassName("songItem"))[
    `${SongIndex}`
  ].style.background = "rgba(115, 225, 247, 1)";
});
