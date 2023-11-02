import Aux from "./classes/Aux.js";
import Card from "./classes/Card.js";

// DOM elements

let isShowingAll = true;

let flipAllBtn = DOM.set({
  text: "Flip all",
  onclick: () => flipCards(!isShowingAll),
}, "button");

let shuffleBtn = DOM.set({
  text: "Shuffle",
  onclick: () => shuffleCards(),
}, "button");

let randomInput = DOM.set({
  type: "number",
  margin: "0 -0.8em 0 .5em",
  width: "3em",
  min: 1,
  max: 10,
  value: 1,
  onclick: e => e.stopPropagation(),
}, "input");

let randomFlipBtn = DOM.set({
  text: "Random",
  input: randomInput,
  onclick: () => showRandom(randomInput.value),
}, "button");


// DOM setting

DOM.set({
  head: {
    title: "Deck of Cards",
  },
  css: Aux.css,
  color: Aux.color.dark,
  display: "flex",
  flexDirection: "column",
  backgroundColor: Aux.color.base,
  header: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: "1em",
    H1: "Deck of Cards",
    p: "Click the cards to flip them.",
    menu: {
      marginTop: "1em",
      display: "flex",
      button: [flipAllBtn, shuffleBtn, randomFlipBtn],
    }
  },
  main: {
    id: "tableElt",
    backgroundColor: Aux.color.neutral,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    margin: "0 auto",
    padding: "1em",
    width: "46em",
    minHeight: "40em",
  },
  footer: {
    textAlign: "center",
    padding: "1em",
    p: "Created by Lenin Compres",
  },
});

// SETUP CARDS

// initializes cards array with two joker cards
let cardDeck = [
  new Card("jk", Card.SUITS[0]),
  new Card("jk", Card.SUITS[1]),
];

// adds the rest of the cards
for (let suit of Card.SUITS) {
  for (let char of Card.CHARS) {
    let card = new Card(char, suit);
    cardDeck.push(card);
  }
}

// adds cards to the table
cardDeck.forEach((card, i) => {
  card.onclick = () => card.flip();
  card.index = i;
  tableElt.appendChild(card.element);
});

// ACTIONS

function enableBtns(enable = true) {
  let menuBtns = [shuffleBtn, flipAllBtn, randomFlipBtn];
  for(let button of menuBtns){
    if (enable) button.removeAttribute("disabled");
    else button.setAttribute("disabled", true);
  };
}

async function flipCards(toShow = true, delay = 15, cardsToFlip) {
  enableBtns(false);
  if (!cardsToFlip) {
    cardsToFlip = cardDeck;
    isShowingAll = toShow;
  }
  cardsToFlip = cardsToFlip.filter(card => card.isHidden === toShow);
  if (!cardsToFlip.length) {
    return enableBtns();
  }
  Aux.randomizeArray(cardsToFlip);
  let lastCard = cardsToFlip.pop();
  let waitTime = 0;
  cardsToFlip.forEach(card => {
    setTimeout(() => card.flip(), waitTime);
    waitTime += delay;
  });
  waitTime += delay;
  let promise = await Aux.timeoutPromise(waitTime, () => lastCard.flip());
  enableBtns();
  return promise;
};

async function shuffleCards() {
  await flipCards(true, 5);
  Aux.randomizeArray(cardDeck);
  cardDeck.forEach(card => tableElt.appendChild(card.element));
  return flipCards(false, 5);
};

async function showRandom(ammount) {
  let hiddenCards = cardDeck.filter(card => card.isHidden);
  if (!hiddenCards.length) return;
  Aux.randomizeArray(hiddenCards);
  let cardsToFlip = hiddenCards.slice(0, ammount);
  return flipCards(true, 15, cardsToFlip);
}