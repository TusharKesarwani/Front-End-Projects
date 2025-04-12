document.addEventListener("DOMContentLoaded", function () { 
    function updateClock() {
        const now = new Date(); 
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        let ampm = document.getElementById("AMPM");

        if (hours >= 12) {
            ampm.textContent = "PM";
        } else {
            ampm.textContent = "AM";
        }

        if (hours > 12) {
            hours -= 12;
        }
        
        if (hours === 0) {
            hours = 12; 
        }

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        let blinkingColon = `<span class='colon'>:</span>`;

        document.getElementById("clock").querySelector("p").innerHTML = 
            hours + blinkingColon + minutes + blinkingColon + seconds + " <span id='AMPM'>" + ampm.textContent + "</span>";
    }

    function updateDate() {
        const now = new Date(); 
        let day = now.getDate();
        let month = now.getMonth() + 1;
        let year = now.getFullYear();
        
        document.getElementById("Date").innerText = `${month}/${day}/${year}`;
    }

    function highlightCurrentDay() {
        let days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        let now = new Date();
        let currentDayId = days[now.getDay()];

        for (let i = 0; i < days.length; i++) {
            let dayElement = document.getElementById(days[i]);
            if (dayElement) {
                dayElement.style.opacity = "0.2";
                dayElement.style.textShadow = "none";
            }
        }

        let currentDayElement = document.getElementById(currentDayId);
        if (currentDayElement) {
            currentDayElement.style.opacity = "1";
            currentDayElement.style.textShadow = "0px 0px 20px rgba(255, 165, 0, 1)";
        }
    }

    setInterval(updateClock, 1000);
    setInterval(highlightCurrentDay, 1000);
    updateClock();
    updateDate();
    highlightCurrentDay();
});
