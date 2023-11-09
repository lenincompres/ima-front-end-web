import Aux from "./Aux.js";

DOM.set({
  font: {
    src: "https://jackrabbits.lenino.net/assets/IrishGrover-Regular.ttf",
    fontFamily: "jr",
  },
});

export class Card extends HTMLElement {

  constructor(face, back, faceColor = "#fff", backColor = "#038") {
    if (face && face.backgroundColor) {
      faceColor = face.backgroundColor;
      delete face.backgroundColor;
    }
    if (back && back.backgroundColor) {
      backColor = back.backgroundColor;
      delete back.backgroundColor;
    }
    const lightColor = "rgba(255,255,255,0.25)";
    super();

    this._isBack = new Binder(false);
    this._isVisible = new Binder(true);
    this._delay = new Binder(150);

    this.set({
      color: this.color,
      width: "2.5em",
      height: "3.4em",
      boxShadow: this._isBack.as("1px 1px 3px black", "-1px 1px 3px black"),
      overflow: "hidden",
      transition: this._delay.as(val => `${val/1000}s`),
      transform: this._isBack.as("rotateY(0)", "rotateY(180deg)"),
      cursor: "pointer",
      backgroundColor: this._isBack.as(faceColor, backColor),
      borderRadius: "0.25em",
      draggable: true,
      position: "relative",
      div_face: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        opacity: DOM.bind([this._isBack, this._isVisible], (isB, isV) => isB || !isV ? 0 : 1),
        pointerEvents: "none",
        backgroundColor: faceColor,
        width: "100%",
        height: "100%",
        div: face,
      },
      div_back: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center",
        fontSize: "0.8em",
        width: "100%",
        height: "100%",
        padding: "0.25em",
        position: "absolute",
        top: 0,
        left: 0,
        opacity: DOM.bind([this._isBack, this._isVisible], (isB, isV) => !isB || !isV ? 0 : 1),
        color: this._isVisible.as(backColor, lightColor),
        pointerEvents: "none",
        background: `radial-gradient(${lightColor}, rgba(255,255,255,0.1), rgba(255,255,255,0))`,
        border: "0.1em solid",
        borderColor: this._isVisible.as(backColor, lightColor),
        borderRadius: "0.25em",
        div: back,
      },
      onclick: e => this.onclick(),
      dragstart: event => window.draggedCard = this,
      dragover: e => e.preventDefault(),
      drop: e => {
        e.preventDefault();
        window.draggedCard.move(this.hand, this);
        e.stopPropagation();
      },
    });

  }

  set isBack(val) {
    this._isBack.value = val;
  }

  get isBack() {
    return this._isBack.value;
  }

  set isVisible(val) {
    this._isVisible.value = val;
  }

  get isVisible() {
    return this._isVisible.value;
  }

  set delay(val) {
    this._delay.value = val;
  }

  get delay() {
    return this._delay.value;
  }

  show() {
    this.isBack = false;
  }

  hide() {
    this.isBack = true;
  }

  async flip(delay) {
    if (isNaN(delay)) delay = this.delay;
    this.delay = delay;
    let promise = await Aux.timeoutPromise(delay);
    this.isBack ? this.show() : this.hide();
    return promise;
  }

  async blink(delay) {
    if (isNaN(delay)) delay = this.delay;
    this._isVisible.flash([false, true], delay);
    return await Aux.timeoutPromise(delay);
  }

  move(hand, prev) {
    if (this.hand !== hand) {
      this.hand.remove(this);
      this.hand = hand;
    }
    hand.add(this, prev);
    return this;
  }

}

customElements.define("div-card", Card);

export default Card;