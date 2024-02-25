(function () {
    var rotator = document.getElementById("rotator");

    var delayInSeconds = 1;

    var images = [
        "https://64b448dcbebe496a150a8945--joyful-peony-566b51.netlify.app/1.png",
        "https://64b448dcbebe496a150a8945--joyful-peony-566b51.netlify.app/2.png",
        "https://64b448dcbebe496a150a8945--joyful-peony-566b51.netlify.app/3.png",
        "https://64b448dcbebe496a150a8945--joyful-peony-566b51.netlify.app/4.png",
    ];

    var num = 0;
    var changeImage = function () {
        var len = images.length;
        rotator.src = images[num++];
        if (num == len) {
            num = 0;
        }
    };
    setInterval(changeImage, delayInSeconds * 6000);
})();


// copyright year

let copyRightYear = document.getElementById("copyright-year");
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
copyRightYear.innerText = currentYear;
