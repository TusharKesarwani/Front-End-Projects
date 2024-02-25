let previous = document.querySelector('#pre');
let play= document.querySelector('#play');
let next=document.querySelector('#next');
let title=document.querySelector('#title');

let recent_volume=document.querySelector('#volume');
let volume_show=document.querySelector('#volume_show');
let slider=document.querySelector('#duration_slider');
let show_duration=document.querySelector('#show_duration');

let track_image=document.querySelector('#track_image');
let auto_play=document.querySelector('#auto');
let present=document.querySelector('#present');

let total=document.querySelector('#total');
let artist=document.querySelector('#artist');

let timer;
let autoplay=0;
let index=0;
let play_song=false;

let track = document.createElement('audio');

let all_song = [
    {
        name: "Perfect",
        path: "music/Perfect.mp3",
        img: "images/pic4.jpg",
        singer: "Ed Sheeran"
    },
    {
        name: "Stay",
        path: "music/Stay.mp3",
        img: "images/pic5.jpg",
        singer: "Justin Bieber"
    },
    {
        name: "Teri ada",
        path: "music/song.mp3",
        img: "images/pic3.jpg",
        singer: "Ed Sheeran"
    },
    {
        name: "Dreamers",
        path: "music/Dreamers.mp3",
        img: "images/pic1.jpg",
        singer: "Jung Kook"
    },
    {
        name: "You",
        path: "music/You.mp3",
        img: "images/pic2.jpg",
        singer: "Armaan Malik"
    },
];

function load_track(index){
    clearInterval(index);
    reset_slider();
    track.src = all_song[index].path;
    title.innerHTML = all_song[index].name;
    track_image.src = all_song[index].img;
    artist.innerHTML = all_song[index].singer;
    track.load();

    timer=setInterval(range_slider, 1000);
    total.innerHTML = all_song.length;
    present.innerHTML = index+1;
}

load_track(index);

function mute_sound(){
    track.volume = 0;
    volume.value = 0;
    volume_show.innerHTML=0;

}

function justplay(){
    if (play_song == false){
        playsong();
    }
    else{
        pausesong();
    }
}

function reset_slider(){
    slider.value = 0;
}

function playsong(){
    track.play();
    play_song=true;
    play.innerHTML='<i class="fa-solid fa-pause"></i>'
}

function pausesong(){
    track.pause();
    play_song=false;
    play.innerHTML='<i class="fa-solid fa-play"></i>'
}

function next_song(){
    if(index<all_song.length-1){
        index+=1;
        load_track(index);
        playsong();
    }
    else{
        index=0;
        load_track(index);
        playsong()
    }
}

function previous_song(){
    if(index>0){
        index-=1;
        load_track(index);
        playsong();
    }
    else{
        index=all_song.length;
        load_track(index);
        playsong()
    }
}

function vol_change(){
    vol_change.innerHTML=recent_volume.value;
    track.volume=recent_volume.value/100;
}

function change_duration(){
    slider_position=track.duration*(slider.value/100);
    track.currentTime=slider_position;
}

function autoplay_btn(){
    if(autoplay==1){
        autoplay=0;
        auto_play.style.background = "rgba(255,255,255,0.2)";
    }
    else{
        autoplay = 1;
        auto_play.style.background = "#FF8A65";
    }
}


function range_slider(){
    let p=0;
    if(!isNaN(track.duration)){
        p=track.currentTime*(100/track.duration);
        slider.value=p;
    }
    if(track.ended){
        play.innerHTML='<i class="fa-solid fa-play"></i>';
        if(autoplay==1){
            index+=1;
            load_track(index);
            playsong();
        }
    }
}
