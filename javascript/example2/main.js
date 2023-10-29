import Card from "./classes/Card.js";
import footerElement from "./components/footer.js";
import getHeaderElement from "./components/header.js";

// DOM

let headerElement = getHeaderElement({
  text: "Shuffle",
  onclick: () => shuffleCards(),
}, {
  text: "Hide all",
  onclick: () => flipAllCards(false),
}, {
  text: "Show all",
  onclick: () => flipAllCards(),
}, {
  text: "Show random",
  onclick: () => showRandomCard(),
}, {
  id: "randomNumInput",
  tag: "input",
  type: "number",
  width: "3em",
  min: 1,
  max: 5,
  value: 1,
});

DOM.set({
  head: {
    title: "Deck of Cards",
  },
  css: {
    button: {
      margin: "0 0.25em",
    }
  },
  style: {
    display: "flex",
    alignItems: "stretch",
    flexDirection: "column",
    backgroundColor: "lightgray",
  },
  header: headerElement,
  main: {
    backgroundColor: "#111",
    padding: "2em",
    section: {
      id: "tableTop",
      backgroundColor: "tan",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      margin: "0 auto",
      padding: "1em",
      width: "46em",
      minHeight: "40em",
    }
  },
  footer: footerElement,
});

// SETUP

let cardDeck = [];

Card.SUITS.forEach(suit => {
  Card.CHARS.forEach(num => {
    cardDeck.push(new Card(num, suit));
  })
});
cardDeck.push(new Card("jk", Card.SUITS[0]), new Card("jk", Card.SUITS[1]))

cardDeck.forEach((card, i) => {
  card.onclick = () => card.flip();
  tableTop.appendChild(card.element);
  card.index = i;
});

// ACTIONS

function randomizeArray(arr) {
  if (!arr) arr = cardDeck;
  arr.sort(() => Math.random() - 0.5);
  return arr;
}

async function shuffleCards() {
  console.log("Shuffling");
  await flipAllCards(true, 2);
  console.log("All shown");
  randomizeArray();
  cardDeck.forEach(card => tableTop.appendChild(card.element));
  await flipAllCards(false, 2);
  console.log("All hidden");
};


async function flipAllCards(toShow = true, delay = 10, promise) {
  let cardsToFlip = cardDeck.filter(card => card.isHidden === toShow);
  if(!cardsToFlip.length) return;
  randomizeArray(cardsToFlip);
  cardsToFlip.forEach(card => setTimeout(() => card.flip(), delay));
  return cardsToFlip.pop().flip();
};

function showRandomCard() {
  let hiddenCards = cardDeck.filter(card => card.isHidden);
  if (hiddenCards.length > 0) {
    randomizeArray(hiddenCards);
    for (let i = 0; i < randomNumInput.value; i += 1) {
      if (hiddenCards.length) hiddenCards.pop().flip();
      else console.error("Not enough cards to flip.");
    }
  }
}