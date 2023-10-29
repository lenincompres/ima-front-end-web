export class Card {

  constructor(char, suit, onclick = () => null) {
    this.char = char;
    this.suit = char === "jk" ? "" : suit;
    this.value = Card.getCharValue(char);
    this.isRed = suit === "♥" || suit === "♦";
    this.color = this.isRed ? "red" : "black";
    this.onclick = onclick;
    this.isHidden = false;

    // JackRabbits coloring
    this.color = Card.SUIT_COLOR[suit];

    this.element = document.createElement("div");

    this.faceElement = document.createElement("div");

    // use DOM.js to set the element
    this.element.set({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      cursor: "pointer",
      fontFamily: "fantasy",
      fontSize: "1.5em",
      width: "3em",
      height: "4em",
      borderRadius: "0.25em",
      boxShadow: "1px 1px 3px black",
      overflow: "hidden",
      transition: ".1s",
      draggable: true,
      div: this.faceElement,
      onclick: e => this.onclick(),
    });

    this.faceElement.set({
      color: this.color,
      p: this.char + this.suit,
    });
  }

  show() {
    if (this.isHidden === false) return;
    this.faceElement.style.display = "block";
    this.element.style.backgroundColor = "white";
    this.isHidden = false;
  }

  hide() {
    if (this.isHidden === true) return;
    this.faceElement.style.display = "none";
    this.element.style.backgroundColor = "steelblue";
    this.isHidden = true;
  }

  async flip() {
    this.element.style.transform = "rotateY(90deg)";
    let wasHidden = this.isHidden;
    this.isHidden = undefined;
    return new Promise(resolve => setTimeout(() => {
      wasHidden ? this.show() : this.hide();
      this.element.style.transform = "rotateY(0)";
      resolve();
    }, 100));
  }

  static CHARS = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

  static SUITS = ["♠", "♥", "♣", "♦"];

  static getCharValue(char) {
    if (isNaN(char)) {
      const CHAR_VALUE = {
        A: 1,
        J: 11,
        Q: 12,
        K: 13,
      };
      return CHAR_VALUE[char];
    }
    return parseInt(char);
  }

  static SUIT_COLOR = {
    [Card.SUITS[0]]: "darkslateblue",
    "♥": "brown",
    "♣": "teal",
    "♦": "darkgoldenrod",
  };

}

export default Card;