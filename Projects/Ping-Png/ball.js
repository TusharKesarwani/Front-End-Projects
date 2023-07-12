const ivelocity = 0.025; //defining initaila velocity
const velocity_increase = 0.000001; //defining rate at which velocity will increase
export default class Ball {
  constructor(ball_element) {
    this.ball_element = ball_element;
    this.reset();
  }
  // getter and setter function for x and y where x and y is coordinate of ball
  get x() {
    return parseFloat(
      getComputedStyle(this.ball_element).getPropertyValue("--x")
    );
  }

  set x(value) {
    this.ball_element.style.setProperty("--x", value);
  }

  get y() {
    return parseFloat(
      getComputedStyle(this.ball_element).getPropertyValue("--y")
    );
  }

  set y(value) {
    this.ball_element.style.setProperty("--y", value);
  }
  //This will tell the current postion of ball
  rect() {
    return this.ball_element.getBoundingClientRect();
  }

  //Reset the state of ball
  reset() {
    this.x = 50;
    this.y = 50;
    this.direction = { x: 0 };
    while (
      Math.abs(this.direction.x) <= 0.2 ||
      Math.abs(this.direction.x) >= 0.9
    ) {
      const heading = Math.random() * (2 * Math.PI) + 0;
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
    }
    this.velocity = ivelocity;
  }

  //Function to show the changes or show the movement of ball
  update(diff, paddle_rects) {
    this.x += this.direction.x * this.velocity * diff;
    this.y += this.direction.y * this.velocity * diff;
    this.velocity += velocity_increase * diff;
    const rect = this.rect();

    //to get header rect
    const header_rect = document
      .getElementById("header")
      .getBoundingClientRect();

    if (rect.bottom >= window.innerHeight || rect.top <= header_rect.height) {
      playSound("sounds/ballHitBat.wav");
      this.direction.y *= -1;
    }

    if (paddle_rects.some((r) => isCollision(r, rect))) {
      playSound("sounds/ballHitBat.wav");
      this.direction.x *= -1;
    }
  }
}

//Function to detect Collision of ball with paddle
function isCollision(rect1, rect2) {
  return (
    rect1.left <= rect2.right &&
    rect1.right >= rect2.left &&
    rect1.top <= rect2.bottom &&
    rect1.bottom >= rect2.top
  );
}

//function to play sound

export function playSound(path) {
  const sound = new Audio(path);
  sound.play();
}
