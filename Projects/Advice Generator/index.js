const API = "https://api.adviceslip.com/advice";
random = document.getElementById("random");

function getAdvice(API) {
  fetch(API)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let advice = data.slip["advice"];
      document.getElementById("advice").innerText = "“" + advice + "”";
    });
}

//To initialize the Advice
window.addEventListener("load", () => {
  getAdvice(API);
  getTime();
});

random.addEventListener("click", () => {
  getAdvice(API);
});
const getTime = () => {
  var today = new Date();
  var date =
    today.getFullYear() + "." + today.getMonth() + "." + today.getDate();

  var hr = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  var time = hr + ":" + m + ":" + s;

  if (hr >= 0 && hr < 12) {
    document.getElementById("heading").textContent = "Good Morning!";
  } else if (hr == 12) {
    document.getElementById("heading").textContent = "Good Noon!";
  } else if (hr >= 12 && hr <= 17) {
    document.getElementById("heading").textContent = "Good Afternoon!";
  } else {
    document.getElementById("heading").textContent = "Good Evening!";
  }
  document.getElementById("date").innerText = date;
  document.getElementById("time").innerText = time;
  setTimeout(getTime, 1000);
};
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  } // add zero in front of numbers < 10
  return i;
}
