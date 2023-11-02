/*
  In this exercise covers:
  * iterating through arrays
    * for(... of ...)
  * accessing DOM element
    * defer, ids, appendChild
    * content: innerHTML, innerText
    * events: onclick
    * classes: classList
    * style: color
  * object methods
    * cardArray.sort()
    * cardArray.slice()
    * Math.random()
  * classes
    * constructor, methods: card.flip()
    * static properties
    * module, import
    * properties: isFace
  * waiting: setTimeOut
  * asynchronous functions: async, wait
*/

import { Card } from "./Card.js";

// set up 

let cardArray = [];

// populate all cards
for(let suit of Card.CARD_SUITS){
  for(let char  of Card.CARD_CHARS){
    let card = new Card(char, suit);
    cardArray.push(card);
    tableTopMain.appendChild(card.element);
  }
}

// methods

async function flipAllCards(face){
  let needsToFlip = cardArray;
  if(face === true || face === false){
    needsToFlip = needsToFlip.filter(card => card.isFace !== face);
  }
  let delay = 0;
  for(let card of needsToFlip){
    setTimeout(() => card.flip(face), delay);
    delay += 10;
  }
  return new Promise(resolve => setTimeout(resolve, delay));
}

async function shuffleCards(){
  await flipAllCards(false);
  cardArray.sort(() => Math.random() - 0.5);
  for(let card of cardArray){
    tableTopMain.appendChild(card.element);
  }
}

async function randomFlip3(){
  await flipAllCards(false);
  await shuffleCards();
  cardArray.slice(0,3).forEach(card => card.flip());
}

// controls

flipAllButton.onclick = () => flipAllCards();
showAllButton.onclick = () => flipAllCards(true);
hideAllButton.onclick = () => flipAllCards(false);
shuffleButton.onclick = () => shuffleCards();
flipRandom3Button.onclick = () => randomFlip3();