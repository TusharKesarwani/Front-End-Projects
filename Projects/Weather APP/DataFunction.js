const WEATHER_API = "be43bb35b1dde85b62d0f3f123cb751f";

const getData = async (url) => {
  const dataJson = await fetch(url);
  const data = await dataJson.json();
  return data;
};

export const getDataFromApi = async (WeatherObj) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${
    WeatherObj.location || "Mumbai"
  }&units=metric&appid=${WEATHER_API}`;
  const locationObj = await getData(url);
  WeatherObj.temp = locationObj.main.temp;
  WeatherObj.humidity = locationObj.main.humidity;
  WeatherObj.wind = locationObj.wind.speed;
  WeatherObj.icon = locationObj.weather[0].icon;
  // console.log(WeatherObj.temp);
  // console.log(WeatherObj.humidity);
  // console.log(WeatherObj.wind);
  // console.log(WeatherObj.icon);
  // console.log(locationObj);
};

// await (await fetch("https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=be43bb35b1dde85b62d0f3f123cb751f")).json();
