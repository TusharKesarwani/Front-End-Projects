const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '271eed2f13mshc55b246a64b6df3p1a9387jsncaca365c12d7',
		'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
	}
};
const getWeather = (city) =>{
cityname.innerHTML = city


fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city, options)
	.then(response => response.json())
	.then((response) => {
         console.log(response)
         
        // cloud_pct.innerHTML = response.cloud_pct
        temp.innerHTML = response.temp
        temp2.innerHTML = response.temp
        // temp.innerHTML = response.temp
        // tempKO.innerHTML = response.temp
        feels_like.innerHTML = response.feels_like
        humidity.innerHTML = response.humidity
        humidity2.innerHTML = response.humidity
        min_temp.innerHTML = response.min_temp
        max_temp.innerHTML = response.max_temp
        wind_speed.innerHTML = response.wind_speed
        wind_speed2.innerHTML = response.wind_speed
        wind_degrees.innerHTML = response.wind_degrees
        sunrise.innerHTML = response.sunrise
        sunset.innerHTML = response.sunset

        tempKA.innerHTML = response.temp
        feels_likeK.innerHTML = response.feels_like
        humidityK.innerHTML = response.humidity
        min_tempK.innerHTML = response.min_temp
        max_tempK.innerHTML = response.max_temp
        wind_speedK.innerHTML = response.wind_speed
        wind_degreesK.innerHTML = response.wind_degrees
        sunriseK.innerHTML = response.sunrise
        sunsetK.innerHTML = response.sunset

        tempL.innerHTML = response.temp
        feels_likeL.innerHTML = response.feels_like
        humidityL.innerHTML = response.humidity
        min_tempL.innerHTML = response.min_temp
        max_tempL.innerHTML = response.max_temp
        wind_speedL.innerHTML = response.wind_speed
        wind_degreesL.innerHTML = response.wind_degrees
        sunriseL.innerHTML = response.sunrise
        sunsetL.innerHTML = response.sunset

        tempKO.innerHTML = response.temp
        feels_likeKO.innerHTML = response.feels_like
        humidityKO.innerHTML = response.humidity
        min_tempKO.innerHTML = response.min_temp
        max_tempKO.innerHTML = response.max_temp
        wind_speedKO.innerHTML = response.wind_speed
        wind_degreesKO.innerHTML = response.wind_degrees
        sunriseKO.innerHTML = response.sunrise
        sunsetKO.innerHTML = response.sunset

        tempE.innerHTML = response.temp
        tempF.innerHTML = response.temp
        tempS.innerHTML = response.temp
        feels_likeE.innerHTML = response.feels_like
        feels_likeF.innerHTML = response.feels_like
        feels_likeS.innerHTML = response.feels_like
        humidityE.innerHTML = response.humidity
        humidityF.innerHTML = response.humidity
        humidityS.innerHTML = response.humidity
        min_tempE.innerHTML = response.min_temp
        min_tempF.innerHTML = response.min_temp
        min_tempS.innerHTML = response.min_temp
        max_tempE.innerHTML = response.max_temp
        max_tempF.innerHTML = response.max_temp
        max_tempS.innerHTML = response.max_temp
        wind_speedE.innerHTML = response.wind_speed
        wind_speedF.innerHTML = response.wind_speed
        wind_speedS.innerHTML = response.wind_speed
        wind_degreesE.innerHTML = response.wind_degrees
        wind_degreesF.innerHTML = response.wind_degrees
        wind_degreesS.innerHTML = response.wind_degrees
        sunriseE.innerHTML = response.sunrise
        sunriseF.innerHTML = response.sunrise
        sunriseS.innerHTML = response.sunrise
        sunsetE.innerHTML = response.sunset
        sunsetF.innerHTML = response.sunset
        sunsetS.innerHTML = response.sunset
    })






	.catch(err => console.error(err));
}

submit.addEventListener("click",(e) =>{
    e.preventDefault()
    getWeather(city.value)
})


kanpur.addEventListener("click",(e) =>{
    e.preventDefault()
    getWeather("kanpur")
})
getWeather("Delhi")