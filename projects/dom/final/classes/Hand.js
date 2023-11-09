import Aux from "./Aux.js";
import Card from "./Card.js";

export class Hand extends HTMLElement {

  constructor(...cards) {
    super();
    this.cards = cards;
    this._idle = new Binder(true);
    this.set({
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      dragover: e => e.preventDefault(),
      drop: e => {
        e.preventDefault();
        window.draggedCard.move(this);
      },
    });
    this.cards.forEach(card => this.add(card));
  }

  add(card, prev) {
    if (prev) {
      this.cards.splice(this.cards.indexOf(prev), 0, card);
      this.insertBefore(card, prev);
    } else {
      this.cards.push(card);
      this.appendChild(card);
    }
    card.hand = this;
    return this;
  }

  remove(card) {
    this.cards = this.cards.filter(c => c !== card);
    this.removeChild(card);
    return card;
  }

  set idle(val) {
    this._idle.value = val;
  }

  get idle() {
    return this._idle.value;
  }

  async flipCards(toShow, cardsToFlip, delay) {
    this.idle = false;
    if (!cardsToFlip) cardsToFlip = this.cards.map(card => card);
    if(delay === undefined) delay = 300 / cardsToFlip.length;
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

  async shuffleCards(delay = 100) {
    this.cards.forEach(card => card.blink(delay));
    setTimeout(() => {
      Aux.randomizeArray(this.cards);
      this.cards.forEach(card => this.appendChild(card));
    }, 0.5 * delay);
    return await Aux.timeoutPromise(delay);
  };

  async showRandom(ammount) {
    await this.flipCards(false);
    Aux.randomizeArray(this.cards);
    let cardsToFlip = this.cards.slice(0, ammount);
    await this.shuffleCards();
    return this.flipCards(true, cardsToFlip);
  }

}

customElements.define("card-hand", Hand);

export default Hand;