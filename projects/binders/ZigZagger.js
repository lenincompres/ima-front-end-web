export class ZigZagger extends HTMLElement {

  constructor(name) {
    super();

    // Properties to hold the x and y velocity of the instance
    this.vx = 0;
    this.vy = 0;

    // Binder is a class that comes with DOM.js
    this._CAN_MOVE = new Binder(true);
    this._X = new Binder(Math.random() * window.innerWidth);
    this._Y = new Binder(Math.random() * window.innerHeight);
    // Conventionally properties that start with undescore(_) means then should be only changed using a set method (see below)
    // In the case of Binders, my preference is to name them in UPPERCASE also. Because the value of the binder is held in a .value property

    // Declaring the DOM structure of the element
    this.set({
      top: this._Y.as(val => `${val}px`),
      left: this._X.as(val => `${val}px`),
      class: { // class property recognizes boolean values
        active: this._CAN_MOVE,
          // "active" class will toggle with the value of _CAN_MOVE
      },
      h4: name,
      onclick: () => this.freeze(),
    });

    // this creates a loop, executing every 50 miliseconds
    setInterval(() => this.move(), 50);
  }

  set x(val) {
    this._X.value = val;
    this.checkBounds();
  }

  get x() {
    return this._X.value;
  }

  set y(val) {
    this._Y.value = val;
    this.checkBounds();
  }

  get y() {
    return this._Y.value;
  }

  move() {
    if (this.canMove) {
      this.x += this.vx;
      this.y += this.vy;

      //accelerates randomly
      this.vx += Math.random() - 0.5;
      this.vy += Math.random() - 0.5;
    }
  }

  checkBounds() {
    if (this.x < 0 || this.x > window.innerWidth) {
      this.vx *= -0.9;
      this.x = this.x < 0 ? 0 : window.innerWidth;
    }
    if (this.y < 0 || this.y > window.innerHeight) {
      this.vy *= -0.9;
      this.y = this.y < 0 ? 0 : window.innerHeight;
    }
  }

  set canMove(val) {
    // executes only if the value is to change
    if (val !== this._CAN_MOVE.value) {
      this._CAN_MOVE.value = val;
      // invokes a callBack function if it was created
      if (this.callBack) this.callBack();
    }
  }

  get canMove() {
    return this._CAN_MOVE.value;
  }

  freeze() {
    this.vx = 0;
    this.vy = 0;
    this.canMove = false;
    // will be able to move (unfreeze) in 5 seconds
    setTimeout(() => this.canMove = true, 5000);
  }

}

customElements.define('zig-zagger', ZigZagger);
export default ZigZagger;