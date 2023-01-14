function clock(){
    let seconds = document.getElementById('seconds');
    let minutes = document.getElementById('minutes');
    let hours = document.getElementById('hours');

    let s = new Date().getSeconds();
    let m = new Date().getMinutes();
    let h = new Date().getHours();
    var am = 'AM';

    if(h>12)
    {
        h=h-12;
        var am='PM';
    }

    h = (h<10) ? '0'+h : h;
    m = (m<10) ? '0'+m : m;
    s = (s<10) ? '0'+s : s;

    seconds.innerHTML = s;
    minutes.innerHTML = m;
    hours.innerHTML = h;
    ampm.innerHTML = am;

    
};

let interval = setInterval(clock, 1000);

// This project is built by Harshit Raj.
// This projects belongs to MedusaVerse.
// ©Medusaverse