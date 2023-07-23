import Countries from "./countries.js";

const appId = "28a7d78ab2cf856b7f1c4c8a1968a5a7";
const base = "https://api.openweathermap.org"
const link = `${base}/data/2.5/air_pollution`;
// Get coordinates by location name
const geolink = `${base}/geo/1.0/direct`;

(function () {
	const searchButton = document.querySelector(".search-btn");
	const modal = document.getElementById("myModal");
	const closeModalButton = document.querySelector(".close");
	const errorLabel = document.querySelector("label[for='error-msg']");
	const airQuality = document.querySelector(".air-quality");
	const airQualityStat = document.querySelector(".air-quality-status");
	const componentsEle = document.querySelectorAll(".component-val");
	const latInp = document.querySelector("#latitude");
	const lonInp = document.querySelector("#longitude");
	const placeNameInp = document.getElementById("place-name");
	const placeStateInp = document.getElementById("place-state");
	const hint = document.getElementById("hint");

	searchButton.addEventListener("click", function () {
		let latitude;
		let longitude;

		latitude = parseFloat(latInp.value);
		longitude = parseFloat(lonInp.value);

		if (isNaN(latitude) || isNaN(longitude)) {
			// Display error message in the location input card
			errorLabel.innerText = "Please enter valid coordinates.";
			return;
		}

		// Reset error message
		errorLabel.innerText = "";

		getAirQuality(latitude.toFixed(4), longitude.toFixed(4));
	});

	closeModalButton.addEventListener("click", function () {
		modal.style.display = "none";
	});

	placeNameInp.oninput = function (e) {
		findBySelectedPlace(e);
	};

	const findBySelectedPlace = async e => {
		// Execute requests when the user is typing
		let term = e.target.value;
		try {
			const rawData = await fetch(
				`${geolink}?q=${term}` + (placeStateInp.value ? `,${placeStateInp.value}` : "") + `&appid=${appId}`
			);
			const dataByLocationName = await rawData.json();
			console.log(dataByLocationName);
			hint.innerHTML = "";
			dataByLocationName.forEach(item => {
				let div = document.createElement("div");
				div.className = "hint-item";
				div.innerText = item.name + " " + (item.state ? item.state : "") + " " + Countries.getEntry(item.country).name;
				// Click on a hint item to search
				div.onclick = () => {
					if (item.lat && item.lon) {
						let lat = item.lat.toFixed(4),
							lon = item.lon.toFixed(4);					
						latInp.value = lat;
						lonInp.value = lon;
						placeNameInp.value = item.name
						item.state ? placeStateInp.value = item.state : placeStateInp.value = ''
						getAirQuality(lat, lon);
						hint.innerHTML = "";			
					}
				};
				hint.append(div);
			});
		} catch (error) {
			console.log(error);
		}
	};

	const getUserLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(onPositionGathered, onPositionGatherError);
		} else {
			onPositionGatherError({ message: "Can't access your location. Please enter your coordinates." });
		}
	};

	const onPositionGathered = pos => {
		let lat = pos.coords.latitude.toFixed(4),
			lon = pos.coords.longitude.toFixed(4);

		latInp.value = lat;
		lonInp.value = lon;

		getAirQuality(lat, lon);
	};

	const getAirQuality = async (lat, lon) => {
		try {
			const rawData = await fetch(`${link}?lat=${lat}&lon=${lon}&appid=${appId}`);
			const airData = await rawData.json();
			console.log(airData);
			setValuesOfAir(airData);
			setComponentsOfAir(airData);
			modal.style.display = "block"; // Open the modal after setting the data
		} catch (error) {
			onPositionGatherError({ message: "Something went wrong. Check your internet connection." });
		}
	};

	const setValuesOfAir = airData => {
		const aqi = airData.list[0].main.aqi;
		let airStat = "";
		let color = "";

		// Set Air Quality Index
		airQuality.innerText = aqi;

		// Set status of air quality
		switch (aqi) {
			case 1:
				airStat = "(Good)";
				color = "green";
				break;
			case 2:
				airStat = "(Fair)";
				color = "#ff6f00"; // Orange
				break;
			case 3:
				airStat = "(Moderate)";
				color = "#ffc400"; // Yellow
				break;
			case 4:
				airStat = "(Poor)";
				color = "#ff3d00"; // Red
				break;
			case 5:
				airStat = "(Very Poor)";
				color = "#b71c1c"; // Dark Red
				break;
			default:
				airStat = "(Unknown)";
				color = "#757575"; // Gray
				break;
		}

		airQualityStat.innerText = airStat;
		airQualityStat.style.color = color;
	};

	const setComponentsOfAir = airData => {
		let components = { ...airData.list[0].components };
		componentsEle.forEach(ele => {
			const attr = ele.getAttribute("data-comp");
			ele.innerText = components[attr] + " μg/m³";
		});
	};

	const onPositionGatherError = e => {
		errorLabel.innerText = e.message;
	};

	getUserLocation();
})();
