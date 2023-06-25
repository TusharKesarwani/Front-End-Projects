var height = 10
var width = 11
var tabSnake = []
var apple = {
   posX: 0,
   posY: 0
}
let head = {
   posX: 5,
   posY: 3,
   dir: "down",
}
let body1 = {
   posX: 5,
   posY: 2,
   dir: "down"
}
let body2 = {
   posX: 5,
   posY: 1,
   dir: "down"
}
tabSnake.push(head)
tabSnake.push(body1)
tabSnake.push(body2)
console.log(tabSnake)


function nextStep() {
   console.table(tabSnake)
   for (let i = 0; i < tabSnake.length; i++) {
      let id = tabSnake[i].posX + "_" + tabSnake[i].posY
      document.getElementById(id).style.backgroundColor = ""
      document.getElementById(id).innerHTML = ""
   }
   // calculating snake position
   let direction = tabSnake[0].dir
   let obj = {
      posX: tabSnake[0].posX,
      posY: tabSnake[0].posY,
      dir: "",
      inflated: false
   }

   if (direction == "down") {
      obj.posY++
      obj.dir = "down"
      tabSnake.unshift(obj)
   }
   else if (direction == "up") {
      obj.posY--
      obj.dir = "up"
      tabSnake.unshift(obj)
   }
   else if (direction == "right") {
      obj.posX++
      obj.dir = "right"
      tabSnake.unshift(obj)
   }
   else if (direction == "left") {
      obj.posX--
      obj.dir = "left"
      tabSnake.unshift(obj)
   }

   // eating an apple
   if (!(tabSnake[0].posX == apple.posX && tabSnake[0].posY == apple.posY)) {
      tabSnake.pop()
   } else {
      createApple()
   }

   // when touched the wall
   if (tabSnake[0].posX < 0 || tabSnake[0].posX > width - 1 || tabSnake[0].posY < 0 || tabSnake[0].posY > height - 1) {
      alert("game over")
      location.reload();
   }

   // when touched the tail
   if (containsObject(tabSnake[0], tabSnake)) {
      alert("game over")
      location.reload();
   }

   drawSnake();
}

document.onkeydown = (e) => {
   if (e.key == "ArrowUp") {
      tabSnake[0].dir = "up"
   }
   else if (e.key == "ArrowDown") {
      tabSnake[0].dir = "down"
   }
   else if (e.key == "ArrowRight") {
      tabSnake[0].dir = "right"
   }
   else if (e.key == "ArrowLeft") {
      tabSnake[0].dir = "left"
   }
}

function createGrid(width, height) {
   const gridContainer = document.getElementById("grid-container");
   gridContainer.style.width = `${ width * 50 }px`;
   gridContainer.style.height = `${ height * 50 }px`;

   for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
         const div = document.createElement("div");
         div.classList.add("field");
         div.id = `${ j }_${ i }`;

         gridContainer.appendChild(div);
      }
   }
   createApple()
}

function drawSnake() {
   // drawing snake
   for (let i = 0; i < tabSnake.length; i++) {
      let id = tabSnake[i].posX + "_" + tabSnake[i].posY
      if (i == 0) {
         document.getElementById(id).style.backgroundColor = "#085705"
      }
      else if (i % 2 == 0) {
         document.getElementById(id).style.backgroundColor = "#17bd24"
      } else if (i % 2 == 1) {
         document.getElementById(id).style.backgroundColor = "#63eb42"
      }
   }
}

function createApple() {
   // clearing apple
   document.getElementById(apple.posX + "_" + apple.posY).style.backgroundColor = ""

   // drawing apple
   apple.posX = Math.floor(Math.random() * width)
   apple.posY = Math.floor(Math.random() * height)

   if (isInSnake(apple, tabSnake)) {
      createApple()
   } else {
      document.getElementById(apple.posX + "_" + apple.posY).style.backgroundColor = "red"
   }
}

function containsObject(obj, list) {
   for (let i = 1; i < list.length; i++) {
      if (list[i].posX == obj.posX && list[i].posY == obj.posY) {
         return true
      }
   }
   return false
}

function isInSnake(apple, tabSnake) {
   for (let i = 0; i < tabSnake.length; i++) {
      if (tabSnake[i].posX == apple.posX && tabSnake[i].posY == apple.posY) {
         return true
      }
   }
   return false
}

createGrid(width, height)
setInterval(nextStep, 400)