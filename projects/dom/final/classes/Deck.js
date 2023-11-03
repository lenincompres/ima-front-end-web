import Aux from "./Aux.js";
import Card from "./Card.js";
import Hand from "./Hand.js";

export class Deck extends Hand {

  constructor(cardStyle = {}, isJR) {
    super();

    this.backColor = cardStyle.backgroundColor;
    delete cardStyle.backgroundColor;
    this.isJK = isJR;
    this.cardStyle = cardStyle;

    // adds the rest of the cards
    for (let suit of Card.SUITS) {
      for (let char of Card.CHARS) {
        this.addCard(char, suit);
      }
    }

    // initializes cards array with two joker cards
    this.addCard("Jk", Card.SUITS[0]);
    this.addCard("Jk", Card.SUITS[1]);

  }


}

export default Deck;