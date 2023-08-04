
//selecting all the elements to manipulate
const dayElement = document.querySelector('.day');
const monthElement = document.querySelector('.month');
const dateElement = document.querySelector('.date');
const yearElement = document.querySelector('.year');
const hoursElement = document.querySelector('.hours');
const minutesElement = document.querySelector('.minutes');
const secondsElement = document.querySelector('.seconds');
const periodElement = document.querySelector('.period');
const timezoneSelectElement = document.querySelector('#timezone-select');

// List of timezones
const timezones = [
    { name: 'India', offset: '+0530' },
    { name: 'New York', offset: '-0400' },
    { name: 'London', offset: '+0100' },
    { name: 'Tokyo', offset: '+0900' },
    { name: 'Sydney', offset: '+1000' },
    { name: 'Paris', offset: '+0200' },
    { name: 'Berlin', offset: '+0200' },
    { name: 'Moscow', offset: '+0300' },
    { name: 'Los Angeles', offset: '-0700' },
    { name: 'Chicago', offset: '-0500' },
    { name: 'Denver', offset: '-0600' },
    { name: 'Phoenix', offset: '-0700' },
    { name: 'Toronto', offset: '-0400' },
    { name: 'Vancouver', offset: '-0700' },
    { name: 'Mexico City', offset: '-0500' },
    { name: 'Sao Paulo', offset: '-0300' },
    { name: 'Buenos Aires', offset: '-0300' },
    { name: 'Dubai', offset: '+0400' },
    { name: 'Beijing', offset: '+0800' },
    { name: 'Jakarta', offset: '+0700' }
    // Add more timezones here
];

// Function to update the world clock with current date and time
function updateClock() {
    const now = new Date();

    // Get current date
    const day = now.toLocaleString('en-US', { weekday: 'long' });
    const month = now.toLocaleString('en-US', { month: 'long' });
    const date = now.getDate();
    const year = now.getFullYear();

    // Get current time
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const period = hours >= 12 ? 'PM' : 'AM';

    // Adjust hours to 12-hour format
    hours = hours % 12 || 12;

    // Update DOM elements with current values
    dayElement.textContent = day;
    monthElement.textContent = month;
    dateElement.textContent = date;
    yearElement.textContent = year;
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
    periodElement.textContent = period;

    // Schedule the next update
    setTimeout(updateClock, 1000);
}

// Populate timezone select options
for (const timezone of timezones) {
    const option = document.createElement('option');
    option.value = timezone.offset;
    option.textContent = timezone.name;
    timezoneSelectElement.appendChild(option);
}

// Add event listener to handle timezone change
timezoneSelectElement.addEventListener('change', (event) => {
    const offset = event.target.value;
    const currentTime = new Date().getTime();
    const targetTime = currentTime + (parseInt(offset) * 3600000); // Offset in milliseconds
    const targetDate = new Date(targetTime);
    const timezone = timezones.find(tz => tz.offset === offset);

    // Update DOM elements with target values
    dayElement.textContent = targetDate.toLocaleString('en-US', { weekday: 'long' });
    monthElement.textContent = targetDate.toLocaleString('en-US', { month: 'long' });
    dateElement.textContent = targetDate.getDate();
    yearElement.textContent = targetDate.getFullYear();
    hoursElement.textContent = targetDate.getHours().toString().padStart(2, '0');
    minutesElement.textContent = targetDate.getMinutes().toString().padStart(2, '0');
    secondsElement.textContent = targetDate.getSeconds().toString().padStart(2, '0');
    periodElement.textContent = targetDate.getHours() >= 12 ? 'PM' : 'AM';

    // Display selected timezone
    if (timezone) {
        console.log(`Selected timezone: ${timezone.name}`);
    }
});

// Start the clock
updateClock();