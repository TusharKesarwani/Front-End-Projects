var imgs = [{
    1: "img/moon.webp",
    2: "img/mars.webp",
    3: "img/europa.webp",
    4: "img/titan.webp",
}]

function openContent(evt, planet) {
    if (planet == "Moon") {
        document.getElementById("change").src = imgs[0][1];
    }
    if (planet == "Mars") {
        document.getElementById("change").src = imgs[0][2];
    }
    if (planet == "Europa") {

        document.getElementById("change").src = imgs[0][3];
    }

    if (planet == "Titan") {
        document.getElementById("change").src = imgs[0][4];
    }
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(planet).style.display = "flex";
    document.getElementById(planet).style.gap = "30px";

    evt.currentTarget.className += " active";
}