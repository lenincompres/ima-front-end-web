import Aux from "./Aux.js";

export class Card {

  constructor(char, suit, backColor, isJR) {
    if (!backColor) backColor = isJR ? "#cb9" : "#038";
    const lightColor = "rgba(255,255,255,0.25)";
    this.char = char;
    this.isPip = !isNaN(char);
    this.isCourt = isNaN(char) && Card.CHARS.includes(char);
    this.isWild = !this.isPip && !this.isCourt;
    this.suit = !Card.CHARS.includes(char) ? "" : suit;
    this.value = Card.getCharValue(char);
    this.onclick = onclick;

    this._isBack = new Binder(false);
    this._isVisible = new Binder(true);
    this._delay = new Binder(150);

    // JackRabbits coloring
    this.color = Card.SUITS.filter((c, i) => i % 2).includes(suit) ? "#a00" : "black";
    if (!this.isWild && isJR) this.color = Card.SUIT_COLOR[suit];

    this.elt = DOM.set({
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: this.color,
        width: "2.5em",
        height: "3.4em",
        border: "0.1em solid",
        borderColor: this._isVisible.as(backColor, lightColor),
        borderRadius: "0.25em",
        boxShadow: this._isBack.as("1px 1px 3px black", "-1px 1px 3px black"),
        overflow: "hidden",
        transition: this._delay.as(val => `${val/1000}s`),
        backgroundColor: this._isBack.as("white", backColor),
        transform: this._isBack.as("rotateY(0)", "rotateY(180deg)"),
        cursor: "pointer",
      },
      draggable: true,
      p_face: {
        position: "absolute",
        opacity: this._isBack.as(1, 0),
        color: this._isVisible.as("white", "inherit"),
        text: this.char + this.suit,
        pointerEvents: "none",
      },
      p_back: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center",
        fontSize: "0.8em",
        width: "90%",
        height: "95%",
        position: "absolute",
        opacity: this._isBack.as(0, 1),
        color: this._isVisible.as(backColor, lightColor),
        pointerEvents: "none",
        background: `radial-gradient(${lightColor}, rgba(255,255,255,0.1), rgba(255,255,255,0))`,
        b: !isJR ? Card.SUITS : {
          tag: "img",
          width: "50%",
          transform: "rotateY(180deg)",
          margin: "0 -24%",
          opacity: this._isVisible.as(0, 1),
          src: "http://lenino.net/assets/leninoLogo.png",
        },
      },
      onclick: e => this.onclick(),
      dragstart: event => window.draggedCard = this,
    }, "div");

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

  static CHARS = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

  static SUITS = ["♠", "♥", "♣", "♦"];

  static getCharValue(char) {
    if (isNaN(char)) {
      const VALUES = {
        A: 1,
        J: 11,
        Q: 12,
        K: 13,
      };
      return VALUES[char];
    }
    return parseInt(char);
  }

  static SUIT_COLOR = {
    "♠": "darkslateblue",
    "♥": "brown",
    "♣": "teal",
    "♦": "darkgoldenrod",
  };

}

export default Card;