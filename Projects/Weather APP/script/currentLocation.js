export default class CurrentLocation {
  #location;
  #temp;
  #humidity;
  #wind;
  #icon;
  constructor() {
    this.#location = null;
    this.#temp = null;
    this.#humidity = null;
    this.#wind = null;
    this.#icon = null;
  }
  get location() {
    return this.#location;
  }
  set location(location) {
    this.#location = location;
  }
  get temp() {
    return this.#temp;
  }
  set temp(temp) {
    this.#temp = temp;
  }
  get humidity() {
    return this.#humidity;
  }
  set humidity(humidity) {
    this.#humidity = humidity;
  }
  get wind() {
    return this.#wind;
  }
  set wind(wind) {
    this.#wind = wind;
  }
  get icon() {
    return this.#icon;
  }
  set icon(icon) {
    this.#icon = icon;
  }
}
