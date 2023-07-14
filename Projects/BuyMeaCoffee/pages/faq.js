const arrow = document.getElementsByClassName("downarrow");
for (let i = 0; i < arrow.length; i++) {
  // arrow[i];

  arrow[i].addEventListener("click", function () {
    console.log("clicked");
    arrow[i].classList.toggle("activeanimation");
    const ruler = document.getElementsByClassName("ruler");
    ruler[i].classList.toggle("activeColor");

    const infoBox = document.getElementsByClassName("infobox__content");

    infoBox[i].classList.toggle("activedisplay");
  });
}
