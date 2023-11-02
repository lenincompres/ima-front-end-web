// create a class for the cards

export class Card {

  constructor(char, suit){
    this.element = document.createElement("div");
    this.element.classList.add("card");
    this.element.style.color = Card.COLOR[suit];
    this.element.innerHTML = `<b>${char}${suit}</b>`;
    this.element.onclick = () => this.flip();

    this.isFace = true;
  }

  flip(face){
    if(face === true){
      this.element.classList.remove("card-back");
      this.isFace = true;
    } else if(face === false){
      this.element.classList.add("card-back");
      this.isFace = false;
    } else {
      this.element.classList.toggle("card-back");
      this.isFace = !this.isFace;
    }
  }

  static CARD_CHARS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

  static CARD_SUITS = ["♠","♥","♣","♦"];

  static COLOR = {
    "♠": "darkslateblue",
    "♥": "brown",
    "♣": "teal",
    "♦": "darkgoldenrod",
  }

}