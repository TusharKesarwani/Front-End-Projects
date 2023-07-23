const speed = 0.02;
export default class Paddle {
  constructor(paddle_element) {
    this.paddle_element = paddle_element;
    this.reset();
  }
  //Get and setter function for position of paddle
  get position() {
    return parseFloat(
      getComputedStyle(this.paddle_element).getPropertyValue("--position")
    );
  }
  set position(value) {
    this.paddle_element.style.setProperty("--position", value);
  }
  //This function will tell the current position of paddle
  rect() {
    return this.paddle_element.getBoundingClientRect();
  }
  //Wll be responsible for movement of paddle
  update(diff, ballheight) {
    if (ballheight > 9 && ballheight < 93) {
      this.position += speed * diff * (ballheight - this.position);
    }
  }
  // to reset the state of paddle
  reset() {
    this.position = 50;
  }
}
