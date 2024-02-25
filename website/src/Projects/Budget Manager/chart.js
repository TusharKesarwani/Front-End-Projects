var chart = document.querySelector(".chart");
// Crating canvas element
const canvas = document.createElement("canvas");
// to draw our canvas ,we need to get context of canvas
const ctx = canvas.getContext("2d");

canvas.width = 150;
canvas.height = 150;

// Append canvas to chart element
chart.appendChild(canvas);

// change line width
ctx.lineWidth = 16;

// circle radius
const R = 60;

function drawCircle(color, ratio, anticlockwise) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.arc(
    canvas.width / 2,
    canvas.height / 2,
    R,
    0,
    ratio * 2 * Math.PI,
    anticlockwise
  );
  ctx.stroke();
}

function updateChart(income, expense) {
  let ratio = income / (income + expense);

  drawCircle("#28B9B5", -ratio, true);
  drawCircle("#e66767", 1 - ratio, false);
}

updateChart(0, 0);
