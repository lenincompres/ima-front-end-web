import Aux from "./classes/Aux.js";
import Deck from "./classes/Deck.js";
import Hand from "./classes/Hand.js";

// DOM elements

const COLOR = {
  base: "lightGray",
  light: "white",
  dark: "#222",
  neutral: "#a97",
  accent: "#46a",
}

const CSS = {
  h: {
    fontFamily: "serif",
  },
  button: {
    backgroundColor: COLOR.accent,
    color: COLOR.light,
    margin: "0 0.25em",
    fontSize: "1.2em",
    borderColor: COLOR.accent,
    boxShadow: "none",
    hover: {
      borderColor: COLOR.light,
    },
    __disabled: {
      backgroundColor: "transparent",
      borderColor: COLOR.accent,
      color: COLOR.accent,
      opacity: 0.6,
    },
    active: {
      borderColor: COLOR.base,
    }
  },
}

const cardDeck = new Deck({
  margin: "0.2em",
  backgroundColor: COLOR.accent,
}, true);

const cardHand1 = new Hand();


// DOM setting

DOM.set({
  head: {
    title: "Deck of Cards",
  },
  css: CSS,
  color: COLOR.dark,
  display: "flex",
  flexDirection: "column",
  backgroundColor: COLOR.base,
  header: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: "1em",
    H1: "Deck of Cards",
    p: "Click the cards to flip them.",
  },
  main: {
    margin: "0 auto 1em",
    width: "fit-content",
    header: {
      padding: "0.5em",
      menu: {
        marginTop: "1em",
        display: "flex",
        justifyContent: "center",
        button: {
          class: {
            disabled: cardDeck._idle.as(true, false),
          },
          content: [{
            text: "Flip all",
            onclick: () => cardDeck.flipCards(),
          }, {
            text: "Show all",
            onclick: () => cardDeck.flipCards(true),
          }, {
            text: "Hide all",
            onclick: () => cardDeck.flipCards(false),
          }, {
            text: "Shuffle",
            onclick: () => cardDeck.shuffleCards(),
          }, {
            text: "Random",
            onclick: () => cardDeck.showRandom(randomInput.value),
          }]
        },
        input: {
          id: "randomInput",
          type: "number",
          margin: "0 -0.8em 0 .5em",
          width: "3em",
          min: 1,
          max: 10,
          value: 1,
        },
      }
    },
    main: cardDeck.elt.set({
      fontFamily: "fantasy",
      fontSize: "1.5em",
      backgroundColor: COLOR.neutral,
      padding: "0.5em",
      width: "28em",
    })
  },
  section: cardHand1.elt.set({
    fontFamily: "fantasy",
    fontSize: "1.5em",
    backgroundColor: COLOR.neutral,
    margin: "0 auto 1em",
    padding: "0.5em",
    width: "28em",
    minHeight: "5em",
  }),
  footer: {
    textAlign: "center",
    padding: "1em",
    p: "Created by Lenin Compres",
  },
});