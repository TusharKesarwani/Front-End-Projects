//  Declate variables
const title = document.querySelector(".title");
const form = document.querySelector(".formContainer");
const searchButton = document.querySelector("#search");
const searchInput = document.getElementById("input");
const hide = document.querySelector("#hide");
const cityName = document.querySelector("#cityName");
const temp = document.querySelector("#temp");
const low = document.querySelector(".low");
const high = document.querySelector(".high");
const currentWeatherIcon = document.querySelector(".icon");
const fiveDay = document.querySelector(".weeklyContainer");
const restart = document.querySelector(".restart");
const background = document.querySelector(".backgroundCity");

// Weather API key
const apiKey = "9c37f6b29f7611451a0abe8420b12a9b";

// Get weather data from API
const getWeather = (city) => {
  const Url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  if (city) {
    fetch(Url)
      .then((response) => response.json())
      .then((data) => {
        displayData(data);
        getBackground(city);
        getFiveDayForecast(data.coord.lat, data.coord.lon);
      });
  } else title.textContent = "Something went wrong, please try again later.";
};

//  Get five day forecast
const getFiveDayForecast = (lat, lon) => {
  const fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  fetch(fiveDayUrl)
    .then((response) => response.json())
    .then((data) => {
     

      if (data) {
        const timestamp = data.list[1].dt;
        const timestamp1 = data.list[10].dt;
        const timestamp2 = data.list[18].dt;
        const timestamp3 = data.list[24].dt;
        var temp1 =
          Math.floor((data.list[1].main.temp - 273.15) * 1.8) + 32 + "°F";
        var temp2 =
          Math.floor((data.list[10].main.temp - 273.15) * 1.8) + 32 + "°F";
        var temp3 =
          Math.floor((data.list[18].main.temp - 273.15) * 1.8) + 32 + "°F";
        var temp4 =
          Math.floor((data.list[24].main.temp - 273.15) * 1.8) + 32 + "°F";

        var icon1 =
          "http://openweathermap.org/img/wn/" +
          data.list[1].weather[0].icon +
          ".png";
        var icon2 =
          "http://openweathermap.org/img/wn/" +
          data.list[10].weather[0].icon +
          ".png";
        var icon3 =
          "http://openweathermap.org/img/wn/" +
          data.list[18].weather[0].icon +
          ".png";
        var icon4 =
          "http://openweathermap.org/img/wn/" +
          data.list[24].weather[0].icon +
          ".png";

        var myDate = new Date(timestamp * 1000);
        var myDate1 = new Date(timestamp1 * 1000);
        var myDate2 = new Date(timestamp2 * 1000);
        var myDate3 = new Date(timestamp3 * 1000);

        myDate = myDate.toGMTString().slice(0, 3);
        myDate1 = myDate1.toGMTString().slice(0, 3);
        myDate2 = myDate2.toGMTString().slice(0, 3);
        myDate3 = myDate3.toGMTString().slice(0, 3);
      }
      fiveDay.innerHTML += ` <div class="day">
            <div class="date">${myDate}</div>
            <div class="temp">${temp1}</div>
            <img class="icon1" src=${icon1}>
        </div>
         <div class="day">
            <div class="date">${myDate1}</div>
            <div class="temp">${temp2}</div>
            <img class="icon1" src=${icon2}>
        </div>
         <div class="day">
            <div class="date">${myDate2}</div>
            <div class="temp">${temp3}</div>
            <img class="icon1" src=${icon3}>
        </div>
        <div class="day">
            <div class="date">${myDate3}</div>
            <div class="temp">${temp4}</div>
            <img class="icon1" src=${icon4}>
        </div>`;
    });
};

// Display weather data
const displayData = (data) => {
  if (!data) {
    return;
  } else {
    form.setAttribute("style", "display: none;");
    title.setAttribute("style", "display: none;");
    restart.classList.remove("hidden");
    hide.classList.remove("hidden");
    hide.classList.add("show");
    cityName.textContent = data.name;
    temp.textContent = Math.floor((data.main.temp - 273.15) * 1.8) + 32 + "°F";
    low.textContent =
      Math.floor((data.main.temp_min - 273.15) * 1.8) + 32 + "°F";
    high.textContent =
      Math.floor((data.main.temp_max - 273.15) * 1.8) + 32 + "°F";
    var icon =
      "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
    var img = document.createElement("img");
    img.src = icon;
    currentWeatherIcon.appendChild(img);
  }
};

// get background image 
const getBackground = (city) => {
    // Unsplash API key
const unsplashKey = "M-iPfuxYSOOq-37o5ECD78Xx7qfNrKZeq-cGC7x8K2Q";
    const unsplash = `https://api.unsplash.com/search/photos?query=${city}&per_page=1&client_id=gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k`;
  fetch(unsplash)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results[0].urls.full);
      background.src = data.results[0].urls.full;
      if(background.src) {
        background.classList.remove("hidden");
      }
    });
};


//  Event Listeners
// handles Input valuu and click event
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  let city = searchInput.value;
  //  Capitalize the first letter of the city and if the city has a space between the words, capitalize the first letter of the second word
  city = city.trim();
  let searchTerm = city;
  let firstLetter = city.charAt(0).toUpperCase();
  let restOfTheWord = city.slice(1);
  if (city.includes(" ")) {
    let space = city.indexOf(" ");
    let firstWord = city.slice(0, space);
    let secondWord = city.slice(space + 1);
    let firstLetter = firstWord.charAt(0).toUpperCase();
    let restOfTheWord = firstWord.slice(1);
    let secondFirstLetter = secondWord.charAt(0).toUpperCase();
    let secondRestOfTheWord = secondWord.slice(1);
    city =
      firstLetter +
      restOfTheWord +
      "%20" +
      secondFirstLetter +
      secondRestOfTheWord;
    searchTerm = city;
  } else searchTerm = firstLetter + restOfTheWord;

  if (searchTerm === "" || searchTerm === null || searchTerm === undefined) {
    return (title.textContent = "Please enter a city");
  } else {
    getWeather(searchTerm);
  }
});

// Restart Search
restart.addEventListener("click", () => {
  window.location.reload();
});
