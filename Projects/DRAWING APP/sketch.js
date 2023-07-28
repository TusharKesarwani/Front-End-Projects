import { fromEvent } from "rxjs";
import { map, switchMap, takeUntil, tap } from "rxjs/operators";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

// Triangle Tool
const Tri = (context) => (e) => {
  // Your Tri function code
};

// Circle Tool
const Circ = (context) => (e) => {
  // Your Circ function code
};

// Rectangle Tool
const Rect = (context) => (e) => {
  // Your Rect function code
};

let prevX, prevY;
let isMove = false;

// Brush tool
const draww = (context) => (e) => {
  isMove = true;
  context.strokeStyle = choseColor;
  context.fillStyle = choseColor;
  prevX = e.offsetX;
  prevY = e.offsetY;

  stable = context.getImageData(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.lineWidth = drawingWidth;
};

const mouseMove$ = fromEvent(canvas, "mousemove");
const mouseDown$ = fromEvent(canvas, "mousedown");
const mouseUp$ = fromEvent(canvas, "mouseup");
const slider$ = fromEvent(document.querySelector("#size-slider"), "change");
const fillCheckbox$ = fromEvent(document.querySelector("#fill-color"), "change");
const colorSelect$ = fromEvent(document.querySelectorAll(".color-box .opt"), "click");
const tools$ = fromEvent(document.querySelectorAll(".option"), "click");
const saveImg$ = fromEvent(document.querySelector("#save"), "click");
const clearAll$ = fromEvent(document.querySelector("#clear"), "click");

const widthHeight = () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  setBackground();
};

let stable;
const draw$ = mouseDown$.pipe(
  switchMap((event) => {
    if (selected === "brush" || selected === "eraser") {
      return mouseMove$.pipe(
        map((event) => event),
        takeUntil(mouseUp$)
      );
    } else if (selected === "rectangle") {
      return mouseMove$.pipe(
        map(Rect(context)),
        takeUntil(mouseUp$)
      );
    } else if (selected === "circle") {
      return mouseMove$.pipe(
        map(Circ(context)),
        takeUntil(mouseUp$)
      );
    } else if (selected === "triangle") {
      return mouseMove$.pipe(
        map(Tri(context)),
        takeUntil(mouseUp$)
      );
    }
  })
);

draw$.subscribe(draww(context));

const fill$ = fillCheckbox$.pipe(map((e) => e.target.checked));
fill$.subscribe((isChecked) => {
  if (isChecked) {
    context.fillStyle = choseColor;
  } else {
    context.fillStyle = "#fff";
  }
});

const drawingWidth$ = slider$.pipe(map((e) => e.target.value));
drawingWidth$.subscribe((value) => (drawingWidth = value));

const selectedTool$ = tools$.pipe(map((e) => e.target.id));
selectedTool$.subscribe((toolId) => {
  document.querySelector(".allops .active").classList.remove("active");
  document.getElementById(toolId).classList.add("active");
  selected = toolId;
});

const colorSelect$ = colorSelect$.pipe(
  map((e) => window.getComputedStyle(e.target).getPropertyValue("background-color"))
);
colorSelect$.subscribe((color) => (choseColor = color));

let choseColor = "#000";
const pickColor = document.querySelector("#color-picker");

pickColor.addEventListener("change", () => {
  pickColor.parentElement.style.background = pickColor.value;
  pickColor.parentElement.click();
});

const setBackground = () => {
  context.fillStyle = "#fff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = colorSelect;
};

window.addEventListener("load", widthHeight);

clearAll$.subscribe(() => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  setBackground();
});

saveImg$.subscribe(() => {
  const link = document.createElement("a");
  link.download = `${Date.now()}/SketchIt.jpg`;
  link.href = canvas.toDataURL();
  link.click();
});
