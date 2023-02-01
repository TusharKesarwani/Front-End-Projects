Menu = document.getElementById("Menu")
startmenu = document.getElementsByClassName("startmenu")[0]

Menu.addEventListener("click", () => {
    if (startmenu.style.bottom == "50px") {
        startmenu.style.bottom = "-655px"
    }
    else {
        startmenu.style.bottom = "50px"
        startmenu.style.transform = "translateX(0)"
        searchmenu.style.bottom = "-655px"
        widgetMenu.style.left = "-50%"
        DateTimeMenu.style.right = "-500px"
    }
})

SearchIcon = document.getElementById("SearchIcon")
searchmenu = document.getElementsByClassName("searchmenu")[0]

SearchIcon.addEventListener("click", () => {
    if (searchmenu.style.bottom == "50px") {
        searchmenu.style.bottom = "-655px"

    }
    else {
        searchmenu.style.bottom = "50px"
        searchmenu.style.transform = "translateX(0)"
        startmenu.style.bottom = "-655px"
        widgetMenu.style.left = "-50%"
        DateTimeMenu.style.right = "-500px"
    }

})

Widgets = document.getElementById("Widgets")
widgetMenu = document.getElementsByClassName("widgetMenu")[0]

Widgets.addEventListener("click", () => {
    if (widgetMenu.style.left == "0px") {
        widgetMenu.style.left = "-50%"
        
    }
    else {
        widgetMenu.style.left = "0px"
        startmenu.style.bottom = "-655px"
        searchmenu.style.bottom = "-655px"
        DateTimeMenu.style.right = "-500px"
    }

})




// Setting Timings
// START CLOCK SCRIPT

Number.prototype.pad = function (n) {
    for (var r = this.toString(); r.length < n; r = 0 + r);
    return r;
};

function updateClock() {
    var now = new Date();
    var sec = now.getSeconds(),
        min = now.getMinutes(),
        hou = now.getHours(),
        mo = now.getMonth(),
        dy = now.getDate(),
        yr = now.getFullYear(),
        ampm = "AM";
    var months = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12"
    ];

    if (hou >= 12) {
        ampm = "PM";
        if (hou > 12)
            hou = hou - 12;
    }
    else if (hou == 0) {
        hou = 12;
        ampm = "AM";
    }
    var tags = ["mon", "d", "y", "h", "m", "mi"],
        corr = [months[mo], dy, yr, hou.pad(2), min.pad(2), ampm];
    for (var i = 0; i < tags.length; i++)
        document.getElementById(tags[i]).firstChild.nodeValue = corr[i];
}

updateClock();
window.setInterval("updateClock()", 100);

// END CLOCK SCRIPT
// End

DateTime = document.getElementById("DateTime")
DateTimeMenu = document.getElementById("DateTimeMenu")

DateTime.addEventListener("click", () => {
    if (DateTimeMenu.style.right == "0px") {
        DateTimeMenu.style.right = "-500px"
        console.log("close")
    }
    else {
        DateTimeMenu.style.right = "0px"
        startmenu.style.bottom = "-655px"
        searchmenu.style.bottom = "-655px"
        widgetMenu.style.left = "-50%"
        console.log("open")
    }
})


clickanywhere = document.getElementById("myVideo")
clickanywhere.addEventListener("click", () => {
    if (startmenu.style.bottom == "50px") {
        startmenu.style.bottom = "-655px"
    }
    else if (searchmenu.style.bottom == "50px") {
        searchmenu.style.bottom = "-655px"
    }
    else if(widgetMenu.style.left == "0px"){
        widgetMenu.style.left = "-50%"
    }
    else if(DateTimeMenu.style.right == "0px"){
        DateTimeMenu.style.right = "-500px"
    }

})


/* Get the element you want displayed in fullscreen mode (a video in this example): */
var elem = document.documentElement;

/* When the openFullscreen() function is executed, open the video in fullscreen.
Note that we must include prefixes for different browsers, as they don't support the requestFullscreen property yet */


function Fullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }

    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}


function myFunction() {
    var input, filter, icons, figure, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    icons = document.getElementById("myICONS");
    figure = icons.getElementsByTagName("figure");
    for (i = 0; i < figure.length; i++) {
        a = figure[i].getElementsByTagName("figcaption")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            figure[i].style.display = "";
        } else {
            figure[i].style.display = "none";
        }
    }
}

function myFunction1() {
    var input, filter, icons, figure, a, i, txtValue;
    input = document.getElementById("myInput1");
    filter = input.value.toUpperCase();
    icons = document.getElementById("myICONS1");
    figure = icons.getElementsByTagName("figure");

    for (i = 0; i < figure.length; i++) {
        a = figure[i].getElementsByTagName("figcaption")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1 && filter != "" && filter != " ") {
            // figure[i].style.display = "block";
            figure[i].setAttribute('id', 'SearchedTemp')
            figure[i].style.display = "";
        }
        else if ((i < 5) && (filter == "" || filter == " ")) {
            figure[i].setAttribute('id', 'DefaultDisplaySearch');
            figure[i].style.display = "block";
        }
        else {
            figure[i].removeAttribute('id', 'SearchedTemp')
            figure[i].style.display = "none";

        }
    }
}

function GetTime() {
    let h = document.getElementById('h').innerText;
    let m = document.getElementById('m').innerText;
    let mi = document.getElementById('mi').innerText;

    document.getElementsByClassName('hours')[0].innerText = h;
    document.getElementsByClassName('minutes')[0].innerText = m;
    document.getElementsByClassName('am_pm')[0].innerText = mi;
}

window.setInterval("GetTime()", 100);

//DateTimeMenu Container Box
function DateTimeMenuFunction() {
    const date = new Date();

    const renderCalendar = () => {
      date.setDate(1);
    
      const monthDays = document.querySelector(".days");
    
      const lastDay = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      ).getDate();
    
      const prevLastDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        0
      ).getDate();
    
      const firstDayIndex = date.getDay();
    
      const lastDayIndex = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      ).getDay();
    
      const nextDays = 7 - lastDayIndex - 1;
    
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      
      const Weeks = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      
      document.querySelector(".date h1").innerHTML = months[date.getMonth()]+" "+date.getFullYear();
      
      document.querySelector(".week-month-date").innerHTML = Weeks[new Date().getDay()]+", "+months[new Date().getMonth()]+" "+new Date().getDate();
    
      let days = "";
    
      for (let x = firstDayIndex; x > 0; x--) {
        days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
      }
    
      for (let i = 1; i <= lastDay; i++) {
        if (
          i === new Date().getDate() &&
          date.getMonth() === new Date().getMonth()
        ) {
          days += `<div class="today">${i}</div>`;
        } else {
          days += `<div>${i}</div>`;
        }
      }
    
      for (let j = 1; j <= nextDays; j++) {
        days += `<div class="next-date">${j}</div>`;
        monthDays.innerHTML = days;
      }
    };
    
    document.querySelector(".prev").addEventListener("click", () => {
      date.setMonth(date.getMonth() - 1);
      renderCalendar();
    });
    
    document.querySelector(".next").addEventListener("click", () => {
      date.setMonth(date.getMonth() + 1);
      renderCalendar();
    });
    
    renderCalendar();    
}

DateTimeMenuFunction();
