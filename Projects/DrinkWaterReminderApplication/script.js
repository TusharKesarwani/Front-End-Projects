// const part1 = document.getElementById("bigGlassParts-1");
// const part2 = document.getElementById("bigGlassParts-2");
// const part3 = document.getElementById("bigGlassParts-3");
// const part4 = document.getElementById("bigGlassParts-4");
// const part5 = document.getElementById("bigGlassParts-5");
// const part6 = document.getElementById("bigGlassParts-6");
const partArray = document.querySelectorAll(".bigGlass div");

const smallGlasses = document.querySelectorAll(".smallGlass");
console.log(smallGlasses);
const glass1 = document.getElementById("glass1");
let counter = 0;
fillWaterInBigGlass();

for (let j = 0; j < 8; j++) {
  smallGlasses[j].addEventListener("click", function () {
    if ($(smallGlasses[j]).hasClass("smallGlassFlip")) {
      counter--;
      fillWaterInBigGlass();
      smallGlasses[j].classList.toggle("smallGlassFlip");
      console.log(counter);
    } else {
      counter++;
      fillWaterInBigGlass();
      smallGlasses[j].classList.toggle("smallGlassFlip");
      console.log(counter);
    }
  });
}

function fillWaterInBigGlass() {
  switch (counter) {
    case 0: {
      for (let i = 0; i < 8; i++) {
        partArray[i].style.backgroundColor = "white";
      }
      document.getElementById("bigGlassValue").innerHTML = `2 Ltr <br> Remains`;
      document.getElementById("bigGlassValue").style.fontSize = "15px";
      document.getElementById("bigGlassValue").style.fontWeight = "400";
      break;
    }
    case 1:
      {
        for (let i = 0; i < 8; i++) {
          if (i == 7) {
            partArray[i].style.backgroundColor = "#2e86de";
          }
        }
        for (let i = 0; i < 8; i++) {
          if (i == 7) {
            continue;
          } else {
            partArray[i].style.backgroundColor = "white";
          }
        }
      }
      document.getElementById("bigGlassValue").innerHTML = `250ml`;
      document.getElementById("bigGlassValue").style.fontSize = "30px";
      document.getElementById("bigGlassValue").style.fontWeight = "800";
      break;
    case 2:
      {
        for (let i = 0; i < 8; i++) {
          if (i >= 6) {
            partArray[i].style.backgroundColor = "#2e86de";
          }
        }
        for (let i = 0; i < 8; i++) {
          if (i >= 6) {
            continue;
          } else {
            partArray[i].style.backgroundColor = "white";
          }
        }
      }
      document.getElementById("bigGlassValue").innerHTML = `500ml`;
      document.getElementById("bigGlassValue").style.fontSize = "30px";
      document.getElementById("bigGlassValue").style.fontWeight = "800";
      break;
    case 3:
      {
        for (let i = 0; i < 8; i++) {
          if (i >= 5) {
            partArray[i].style.backgroundColor = "#2e86de";
          }
        }
        for (let i = 0; i < 8; i++) {
          if (i >= 5) {
            continue;
          } else {
            partArray[i].style.backgroundColor = "white";
          }
        }
      }
      document.getElementById("bigGlassValue").innerHTML = `750ml`;
      document.getElementById("bigGlassValue").style.fontSize = "30px";
      document.getElementById("bigGlassValue").style.fontWeight = "800";
      break;
    case 4:
      {
        for (let i = 0; i < 8; i++) {
          if (i >= 4) {
            partArray[i].style.backgroundColor = "#2e86de";
          }
        }
        for (let i = 0; i < 8; i++) {
          if (i >= 4) {
            continue;
          } else {
            partArray[i].style.backgroundColor = "white";
          }
        }
      }
      document.getElementById("bigGlassValue").innerHTML = `1.0 L`;
      document.getElementById("bigGlassValue").style.fontSize = "30px";
      document.getElementById("bigGlassValue").style.fontWeight = "800";
      break;
    case 5:
      {
        for (let i = 0; i < 8; i++) {
          if (i >= 3) {
            partArray[i].style.backgroundColor = "#2e86de";
          }
        }
        for (let i = 0; i < 8; i++) {
          if (i >= 3) {
            continue;
          } else {
            partArray[i].style.backgroundColor = "white";
          }
        }
      }
      document.getElementById("bigGlassValue").innerHTML = `1.25 L`;
      document.getElementById("bigGlassValue").style.fontSize = "30px";
      document.getElementById("bigGlassValue").style.fontWeight = "800";
      break;
    case 6:
      {
        for (let i = 0; i < 8; i++) {
          if (i >= 2) {
            partArray[i].style.backgroundColor = "#2e86de";
          }
        }
        for (let i = 0; i < 8; i++) {
          if (i >= 2) {
            continue;
          } else {
            partArray[i].style.backgroundColor = "white";
          }
        }
      }
      document.getElementById("bigGlassValue").innerHTML = `1.5 L`;
      document.getElementById("bigGlassValue").style.fontSize = "30px";
      document.getElementById("bigGlassValue").style.fontWeight = "800";
      break;
    case 7:
      {
        for (let i = 0; i < 8; i++) {
          if (i >= 1) {
            partArray[i].style.backgroundColor = "#2e86de";
          }
        }
        for (let i = 0; i < 8; i++) {
          if (i >= 1) {
            continue;
          } else {
            partArray[i].style.backgroundColor = "white";
          }
        }
      }
      document.getElementById("bigGlassValue").innerHTML = `1.75 L`;
      document.getElementById("bigGlassValue").style.fontSize = "30px";
      document.getElementById("bigGlassValue").style.fontWeight = "800";
      break;
    case 8:
      {
        for (let i = 0; i < 8; i++) {
          if (i >= 0) {
            partArray[i].style.backgroundColor = "#2e86de";
          }
        }
        for (let i = 0; i < 8; i++) {
          if (i >= 0) {
            continue;
          } else {
            partArray[i].style.backgroundColor = "white";
          }
        }
      }
      document.getElementById("bigGlassValue").innerHTML = `2 Ltr`;
      document.getElementById("bigGlassValue").style.fontSize = "30px";
      document.getElementById("bigGlassValue").style.fontWeight = "800";
      break;
  }
}
