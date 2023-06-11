const endDate = "31 march 2024 00:00:00 PM"

document.getElementById("end-date").innerText=endDate;
const inputs = document.querySelectorAll("input")

function clock (){
    const end = new Date(endDate);
    const currentTime = new Date();
    const difference = (end - currentTime);
    // new date milisecond me time deta hai 
    const diff = difference/1000;   // ye second me ho gya
    // 1 day = 24 hours 
    // 1 hour = 60 min == 3600 seccond 
    if(diff<0)
    {
        
    }


    // for days count down 
    inputs[0].value = Math.floor(diff/3600/24);
    // for hour count down 
    inputs[1].value = Math.floor((diff/3600)%24);
    // for minute count down 
    inputs[2].value = Math.floor(diff/60)%60;
    // for second count down  
    inputs[3].value = Math.floor(diff)%60;

}
clock();

setInterval(() => {
    clock();
}, 1000);







// const endDate = "27 July 2023 08:20:00 PM"

// document.getElementById("end-date").innerText = endDate;
// const inputs = document.querySelectorAll("input")
//     // const clock = () => {

// // }

// function clock() {
//     const end = new Date(endDate)
//     const now = new Date()
//     const diff = (end - now) / 1000;

//     if (diff < 0) return;

//     // convert into days;
//     inputs[0].value = Math.floor(diff / 3600 / 24);
//     inputs[1].value = Math.floor(diff / 3600) % 24;
//     inputs[2].value = Math.floor(diff / 60) % 60;
//     inputs[3].value = Math.floor(diff) % 60;
// }

// // initial call
// clock()

// /**
//  *  1 day = 24 hrs
//  *  1 hr = 60 mins
//  *  60 min = 3600 sec
//  */

// setInterval(
//     () => {
//         clock()
//     },
//     1000
// )