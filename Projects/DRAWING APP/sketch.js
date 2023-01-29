const canvas = document.querySelector("canvas");
context = canvas.getContext("2d");
const draw = (event) => {
  if (!isMove) return;
  context.putImageData(stable, 0, 0);
  if (selected === "brush" || selected === "eraser") {
    context.strokeStyle = selected === "eraser" ? "#fff" : colorSelect;
    context.lineTo(event.offsetX, event.offsetY);
    context.stroke();
  } else if (selected === "rectangle") {
    Rect(event);
  } else if (selected === "circle") {
    Circ(event);
  } else if (selected === "triangle") {
    Tri(event);
  }
};
const Tri = (e) => {
  context.beginPath();
  context.moveTo(prevX, prevY);
  context.lineTo(e.offsetX, e.offsetY);
  context.lineTo(prevX * 2 - e.offsetX, e.offsetY);
  context.closePath();
  if (!fill.checked) {
    context.stroke();
  } else {
    context.fill();
  }
};
const Circ = (e) => {
  context.beginPath();
  let radius = Math.sqrt(
    Math.pow(prevX - e.offsetX, 2) + Math.pow(prevY - e.offsetY, 2)
  );
  context.arc(prevX, prevY, radius, 0, 2 * Math.PI);
  if (!fill.checked) {
    context.stroke();
  } else {
    context.fill();
  }
};
const Rect = (e) => {
  if (!fill.checked) {
    context.strokeRect(
      e.offsetX,
      e.offsetY,
      prevX - e.offsetX,
      prevY - e.offsetY
    );
  } else {
    context.fillRect(
      e.offsetX,
      e.offsetY,
      prevX - e.offsetX,
      prevY - e.offsetY
    );
  }
};
let prevX, prevY;
const wid_height = () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  setBackground();
};
let stable;
canvas.addEventListener("mousemove", draw);
window.addEventListener("load", wid_height);

let isMove = false;

const draww = (e) => {
  isMove = true;
  context.strokeStyle = choseColor;
  context.fillStyle = choseColor;
  prevX = e.offsetX;
  prevY = e.offsetY;
  stable = context.getImageData(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.lineWidth = drawingWidth;
};

canvas.addEventListener("mousedown", draww);
canvas.addEventListener("mouseup", () => (isMove = false));

let drawingWidth = 5;

const tools = document.querySelectorAll(".option");
tools.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".allops .active").classList.remove("active");
    btn.classList.add("active");
    selected = btn.id;
    console.log(selected);
  });
});
let selected = "brush";

const fill = document.querySelector("#fill-color");
const slider = document.querySelector("#size-slider");
slider.addEventListener("change", () => (drawingWidth = slider.value));

colorSelect = document.querySelectorAll(".color-box .opt");
colorSelect.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".color-box .selected").classList.remove("selected");
    btn.classList.add("selected");

    choseColor = window
      .getComputedStyle(btn)
      .getPropertyValue("background-color");
  });
});

choseColor = "#000";

pickColor = document.querySelector("#color-picker");

pickColor.addEventListener("change", () => {
  pickColor.parentElement.style.background = pickColor.value;
  pickColor.parentElement.click();
});
const clearAll = document.querySelector("#clear");
clearAll.addEventListener("click", () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  setBackground();
});

const saveImg = document.querySelector("#save");
saveImg.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = `${Date.now()}/SketchIt.jpg`;
  link.href = canvas.toDataURL();
  link.click();
});

const setBackground = () => {
  context.fillStyle = "#fff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = colorSelect;
};
