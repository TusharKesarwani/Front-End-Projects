const options = {
    method: 'GET',
    headers: {
        //use API-KEY in headers
        'X-RapidAPI-Key': '1f1d5d257dmshfd839b7caa51cc1p1deccfjsn2d1a99e51e3c',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        // KEY removed because of security --> see on local storage from github
        
    }
};

//functions defined 
const getWeather = (city)=>{ 
cityName.innerHTML = city 
//taking city value dynamically
fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city, options)
    .then(response => response.json())
    .then((response) => {
        console.log(response)

        //different property defined 
        cloud_pct.innerHTML = response.cloud_pct
        temp.innerHTML = response.temp
        temp2.innerHTML = response.temp
        feels_like.innerHTML = response.feels_like
        humidity.innerHTML = response.humidity
        humidity2.innerHTML = response.humidity
        min_temp.innerHTML = response.min_temp
        max_temp.innerHTML = response.max_temp
        wind_speed.innerHTML = response.wind_speed
        wind_speed2.innerHTML = response.wind_speed
      //  wind_degrees.innerHTML = response.wind_degrees
        sunrise.innerHTML = response.sunrise
        sunset.innerHTML = response.sunset
    })
    .catch(err => console.error(err));
}


//when clicking on submit button this event handling takes place
submit.addEventListener("click", (e)=>{
    //preventing reload when new city name is entered 
    e.preventDefault();
    getWeather(city.value)
})

//calling getWeather by default for Delhi 
getWeather("Delhi")