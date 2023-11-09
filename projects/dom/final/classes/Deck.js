import Aux from "./Aux.js";
import Card from "./Card.js";
import Hand from "./Hand.js";

export class Deck extends Hand {

  constructor(cardStyle = {}, useJokers = false) {
    super();
    this.backColor = cardStyle.backgroundColor;
    delete cardStyle.backgroundColor;
    this.cardStyle = cardStyle;
    for (let suit of Deck.SUITS) {
      for (let char of Deck.CHARS) {
        this.newCard(char, suit);
      }
    }
    // initializes cards array with two joker cards
    if (useJokers) {
      this.newCard("Jk");
      this.newCard("Jk", true);
    }
  }

  newCard(char, suit) {
    let card = new Card({
      color: Deck.COLORS[suit],
      text: `${char}${!Deck.CHARS.includes(char) ? "" : suit}`,
    }, {
      backgroundColor: this.backColor,
      content: Deck.SUITS,
    });
    card.char = char;
    card.suit = suit;
    card.isPip = !isNaN(char);
    card.isCourt = isNaN(char) && Deck.CHARS.includes(char);
    card.isWild = !this.isPip && !this.isCourt;
    card.value = Deck.getCharValue(char);
    card.set(this.cardStyle, "style");
    card.onclick = () => card.flip();
    this.add(card);
    return card;
  }

  static CHARS = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

  static SUITS = ["♠", "♥", "♣", "♦"];

  static COLORS = {
    "♠": "#000",
    "♥": "#a00",
    "♣": "#000",
    "♦": "#a00",
    true: "#a00",
  };

  /*
  static CARD_CHARS = ['🂡', '🂮', '🂭', '🂫', '🂪', '🂩', '🂨', '🂧', '🂦', '🂥', '🂤', '🂣', '🂢', '🃑', '🃞', '🃝', '🃛', '🃚', '🃙', '🃘', '🃗', '🃖', '🃕', '🃔', '🃓', '🃒', '🃟', '🂱', '🂾', '🂽', '🂻', '🂺', '🂹', '🂸', '🂷', '🂶', '🂵', '🂴', '🂳', '🂲', '🃁', '🃎', '🃍', '🃋', '🃊', '🃉', '🃈', '🃇', '🃆', '🃅', '🃄', '🃃', '🃂', '🃟', '🂠'];
  */

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

}

customElements.define("card-deck", Deck);

export default Deck;