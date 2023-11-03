import Aux from "./Aux.js";
import Card from "./Card.js";

export class Hand {
  
  constructor(){
    this.cards = [];
    this._idle = new Binder(true);
    this.elt = DOM.set({
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      dragover: e => e.preventDefault(),
      drop: e => {
        e.preventDefault();
        this.move(window.draggedCard, this);
      },
    }, "section");
  }

  move(card, hand) {
    if(card.hand === hand) return;
    if (!hand) hand = this;
    card.hand.remove(card);
    card.hand = hand;
    this.add(card);
    return card;
  }

  remove(card) {
    this.cards = this.cards.filter(c => c !== card);
    console.log(this.cards, card);
    return card;
  }

  set idle(val) {
    this._idle.value = val;
  }

  get idle() {
    return this._idle.value;
  }

  async flipCards(toShow, delay = 15, cardsToFlip) {
    this.idle = false;
    if (!cardsToFlip) cardsToFlip = this.cards.map(card => card);
    if (toShow !== undefined) cardsToFlip = cardsToFlip.filter(card => card.isBack === toShow);
    if (!cardsToFlip.length) {
      return this.idle = true;
    }
    Aux.randomizeArray(cardsToFlip);
    let waitTime = 0;
    let lastCard = cardsToFlip.pop();
    cardsToFlip.forEach(card => {
      setTimeout(() => card.flip(), waitTime);
      waitTime += delay;
    });
    await Aux.timeoutPromise(waitTime);
    let promise = await lastCard.flip();
    this.idle = true;
    return promise;
  };

  add(card) {
    this.cards.push(card);
    this.elt.appendChild(card.elt);
    return this.cards;
  }

  addCard(char, suit) {
    let card = new Card(char, suit, this.backColor, this.isJK);
    this.cards.push(card);
    this.elt.appendChild(card.elt);
    card.hand = this;
    card.onclick = () => card.flip();
    card.elt.set(this.cardStyle, "style");
    return card;
  }

  async shuffleCards(delay = 100) {
    this.cards.forEach(card => card.blink(delay));
    setTimeout(() => {
      Aux.randomizeArray(this.cards);
      this.cards.forEach(card => this.elt.appendChild(card.elt));
    }, 0.5 * delay);
    return await Aux.timeoutPromise(delay);
  };

  async showRandom(ammount) {
    await this.flipCards(false, 5);
    Aux.randomizeArray(this.cards);
    let cardsToFlip = this.cards.slice(0, ammount);
    await this.shuffleCards();
    return this.flipCards(true, 15, cardsToFlip);
  }

}

export default Hand;