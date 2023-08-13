export const getDataFromSearch = () => {
  const searchBar = document.getElementById("search__bar");
  const properText = toProperText(searchBar.value);
  return properText;
};
const toProperText = (text) => {
  const improperText = text;
  const properText = text[0].toUpperCase() + text.slice(1).toLowerCase();
  return properText;
};

// Dom Element

export const DisplayDataInApp = (weatherObj) => {
  const main = document.getElementById("main");
  const footer = document.getElementById("footer");
  // console.log(main);

  //temp data
  clearDisplay(main);
  const temp = createElem("div", "temp");
  const tempValue = createElem("h1");
  const unit = createElem("p");
  content(tempValue, `${Math.round(weatherObj.temp) || "0"}°`);
  content(unit, "C");
  const Location = createElem("div", "location");
  const LocationText = createElem("p");
  content(LocationText, weatherObj.location);

  const icon = createElem("div", "weather-icon");
  const i = createElem("i");
  const iClass = transformWeatherIcon(i, weatherObj.icon || "01d");

  addChild(temp, tempValue, unit);
  addChild(Location, LocationText);
  addChild(icon, i);
  addChild(main, temp, Location, icon);

  //footer data
  clearDisplay(footer);
  const humidity = createElem("div", "humdity");
  const humidityValue = createElem("h2");
  const humidityText = createElem("p");
  content(humidityValue, `${weatherObj.humidity || "0"} %`);
  content(humidityText, "Humidity");
  addChild(humidity, humidityValue, humidityText);

  const wind = createElem("div", "wind");
  const windValue = createElem("h2");
  const windText = createElem("p");
  content(windValue, `${weatherObj.wind || "0"} m/s`);
  content(windText, "wind-speed");
  addChild(wind, windValue, windText);

  addChild(footer, humidity, wind);
  fadeIn();
};
/* 
<footer id="footer">
        <div class="humidity" id="humidity">
          <h2>58%</h2>
          <p>humidity</p>
        </div>
        <div class="wind" id="wind">
          <h2>52mph</h2>
          <p>wind-speed</p>
        </div>
      </footer>
*/
const fadeIn = () => {
  const main = document.getElementById("main");
  main.classList.toggle("zero-vis");
  main.classList.toggle("fade-in");
  const footer = document.getElementById("footer");
  footer.classList.toggle("zero-vis");
  footer.classList.toggle("fade-in");
};

const createElem = (tag, className) => {
  const Elem = document.createElement(tag);
  if (className) {
    Elem.classList.add(className);
  }
  return Elem;
};

const content = (elem, text) => {
  elem.textContent = text;
};

function addChild(value, ...args) {
  return args.forEach((args) => {
    value.appendChild(args);
  });
}

const clearDisplay = (tag) => {
  let lastChild = tag.lastElementChild;
  while (lastChild) {
    tag.removeChild(lastChild);
    lastChild = tag.lastElementChild;
  }
};

const transformWeatherIcon = (i, icon) => {
  const firstTwoChars = icon.slice(0, 2);
  const lastChar = icon.slice(2);
  // console.log(firstTwoChars);
  switch (firstTwoChars) {
    case "01":
      if (lastChar === "d") {
        i.classList.add("fa", "fa-sun-o");
      } else {
        i.classList.add("fa", "fa-moon");
      }
      break;
    case "02":
      if (lastChar === "d") {
        i.classList.add("fa", "fa-cloud-sun");
      } else {
        i.classList.add("fa", "fa-cloud-moon");
      }
      break;
    case "03":
      i.classList.add("fa-solid", "fa-cloud");
      break;
    case "04":
      i.classList.add("fa-brands", "fa-soundcloud");
      break;
    case "09":
      i.classList.add("fa-solid", "fa-cloud-showers-water");
      break;
    case "10":
      if (lastChar === "d") {
        i.classList.add("fa-solid", "fa-cloud-sun-rain");
      } else {
        i.classList.add("fa-solid", "fa-cloud-moon-rain");
      }
      break;
    case "11":
      i.classList.add("fa-solid", "fa-cloud-bolt");
      break;
    case "13":
      i.classList.add("fa-solid", "fa-snowflake");
      break;
    case "50":
      i.classList.add("fa-solid", "fa-bars-staggered");
      break;
    default:
      i.classList.add("far", "fa-question");
  }
};

// const div = document.createElement("div");
// const h1 = document.createElement("h1");
// const p = document.createElement("p");
// h1.textContent = "hello";
// p.textContent = "no";
// div.appendChild(h1);
// div.appendChild(p);
// div.classList.add("temp");
// main.appendChild(div);
// main.appendChild(div);
