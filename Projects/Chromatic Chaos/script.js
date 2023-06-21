tool.fixedDistance = 30
var layer = project.activeLayer

function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function onMouseMove(event) {
  var path = new Path.Circle({
		center: event.middlePoint,
		radius: Math.floor(Math.random() * 30) + 5
	})
  path.fillColor = {
    hue: event.count * 3,
    saturation: 1,
    brightness: 1
  }
}