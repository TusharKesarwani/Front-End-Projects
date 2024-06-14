// const _APIKEY = "6655adb1a1b57dff323167a36e2dc475";
// const _APIURL = "https://api.openweathermap.org/data/2.5/weather?q=";
// async function main(){
//     let icon = document.querySelector(".search");
//     icon.addEventListener('keydown',(e)=>{
//         if(e.key == "Enter"){
//             alert("Enter pressed");
//             let weather = await GetData(document.querySelector(".search").value).then( document.querySelector("CityName").innerHTML = weather.Name).catch((err)=>{
//                 alert(`Error: ${err}`);
//             });
           
//         }
//     })
// }
//  async function GetData(cityName){
//     return new Promise((resolve,reject)=>{
       
//         let data = fetch(_APIURL+cityName+`&appid=${_APIKEY}`)
//         let data2 = data.json;
//         if(data.json != null)
//             {
//                 resolve(data2);
//             }
//         else{
//             reject("Data not found");
//         }
        
//     })
// }
const _APIKEY = "6655adb1a1b57dff323167a36e2dc475";
const _APIURL = "https://api.openweathermap.org/data/2.5/weather?q=";

async function main() {
    let icon = document.querySelector(".search");
    icon.addEventListener('keydown', async (e) => {
        if (e.key === "Enter") {
            try {
                let cityName = document.getElementById("search").value;
             
                let weather = await GetData(cityName);
                document.querySelector(".temp").innerHTML = weather.main.temp;
                document.getElementById("CityName").innerHTML = cityName;
                document.getElementById("Rain").innerHTML = `Chance of rain: ${weather.clouds.all}%`;
                if(weather.clouds.all >=50)
                    {
                        document.querySelector(".img").src = 'https://img.icons8.com/3d-fluency/94/storm.png' ;
                    }
                    else
                    {
                        document.querySelector(".img").src = 'https://img.icons8.com/emoji/48/sun-emoji.png'
                    }

            } catch (err) {
                alert(`Error: ${err}`);
            }
            document.getElementById("CityName").innerHTML = cityName;
        }
    });
}

async function GetData(cityName) {
    const response = await fetch(_APIURL + cityName + `&appid=${_APIKEY}`);
    if (!response.ok) {
        throw new Error('Data not found');
    }
    return response.json();
}

main();
// let scrollEvent;
// let scrolled = document.getElementsByTagName("body")
// scrolled.addEventListener("mouseover",()=>{
//     scrollEvent = setInterval(()=>{
//         scrolled.scrollLeft +=1
//         document.querySelector("forecast").scrollTo(1000,0);
//         scrolled.style.BackgroundColor = "red";
        
//     },2000)  
// })