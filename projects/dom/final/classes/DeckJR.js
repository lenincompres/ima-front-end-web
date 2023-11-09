import Aux from "./Aux.js";
import Card from "./Card.js";
import Deck from "./Deck.js";

export class DeckJR extends Deck {

  constructor(cardStyle) {
    super(cardStyle);
  }

  newCard(char, suit) {
    let card = new Card({
      fontFamily: DeckJR.JR_FONT.fontFamily,
      color: DeckJR.SUIT_COLOR[suit],
      text: char,
      img: {
        src: DeckJR.JR_SUIT[suit],
        height: ".86em",
        verticalAlign: "center",
      }
    }, {
      tag: "img",
      width: "50%",
      transform: "rotateY(180deg)",
      margin: "0 -24%",
      src: "http://lenino.net/assets/leninoLogo.png",
      backgroundColor: "#dca",
    });
    card.char = char;
    card.suit = suit;
    card.isPip = !isNaN(char);
    card.isCourt = isNaN(char) && Deck.CHARS.includes(char);
    card.isWild = !this.isPip && !this.isCourt;
    card.value = DeckJR.getCharValue(char);
    card.set(this.cardStyle, "style");
    card.onclick = () => card.flip();
    this.add(card);
    return card;
  }

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
    true: "#b10",
    undefined: "#000",
  };

  static JR_SUIT = {
    "♠": "https://jackrabbits.lenino.net/suityourself/assets/suit-spades.png",
    "♥": "https://jackrabbits.lenino.net/suityourself/assets/suit-hearts.png",
    "♣": "https://jackrabbits.lenino.net/suityourself/assets/suit-clovers.png",
    "♦": "https://jackrabbits.lenino.net/suityourself/assets/suit-diamonds.png",
  }

  static JR_FONT = {
    fontFamily: "Irish Grover",
    url: "https://jackrabbits.lenino.net/assets/IrishGrover-Regular.ttf",
  }

}

DOM.set({
  font: DeckJR.JR_FONT,
});

customElements.define("jr-deck", DeckJR);

export default DeckJR;