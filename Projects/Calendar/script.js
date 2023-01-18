let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const calendar = document.getElementById("calendar-body");
const monthAndYear = document.getElementById("monthAndYear");

showCalendar(month, year);

function next() {
    if (month === 11) {
        month = 0;
        year++;
    } else {
        month++;
    }
    showCalendar(month, year);
}

function previous() {
    if (month === 0) {
        month = 11;
        year--;
    } else {
        month--;
    }
    showCalendar(month, year);
}

function showCalendar(month, year) {
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    let today = new Date();

    calendar.innerHTML = "";
    monthAndYear.innerHTML = months[month] + " " + year;

    // Create all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // Create a table row
        let row = document.createElement("tr");

        // Creating individual cells, filling them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth) {
                break;
            } else {
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);

                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("today");
                }

                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }
        }
        calendar.appendChild(row);
    }
}
