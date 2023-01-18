const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');

navigator.geolocation.watchPosition((data) => {     //watch position regularly updates location
  console.log(data);
  speed.textContent = data.coords.speed;    //gives us value in speedometer in km/h
  arrow.style.transform = `rotate(${data.coords.heading}deg)`;  //for rotating the compass head
}, (err) => {   //in case the user did not allow access to location show error
  console.error(err);
  console.log("The user is requested to allowing their location to be accessed frot he application to work.");
});

// This project is built by Harshit Raj.
// This projects belongs to MedusaVerse.
// © Medusaverse