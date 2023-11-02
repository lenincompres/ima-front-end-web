const CARD_SUITS = ["♠", "♥", "♣", "♦"];

const CARD_CHARS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];


class Card {

  constructor(char, suit) {

    this.elt = document.createElement("div");
    this.elt.classList.add("card");
    if (suit === "♥" || suit === "♦") {
      this.elt.style.color = "maroon";
    }
    if(!CARD_CHARS.includes(char)) suit = "";
    this.elt.innerHTML = `<p>${char}${suit}</p>`;

    this.isBack = false;
    this.elt.onclick = () => this.flip();
  }

  flip(isFace) {
    if (isFace === true) {
      this.elt.classList.add("back");
    }
    if (isFace === false) {
      this.elt.classList.remove("back");
    }
    this.elt.classList.toggle("back");
  }

}


let cardsArr = [];

for (suit of CARD_SUITS) {
  for (char of CARD_CHARS) {
    let card = new Card(char, suit);
    cardsArr.push(card);
  }
}
cardsArr.push(new Card("Jk", CARD_SUITS[0]));
cardsArr.push(new Card("Jk", CARD_SUITS[1]));
cardsArr.forEach(card => tableSection.appendChild(card.elt));

/* controls */

flipAllButton.onclick = () => flipAll();
allBackButton.onclick = () => flipAll(false);
allFaceButton.onclick = () => flipAll(true);
random3Button.onclick = () => showRandom(numInput.value);

async function flipAll(isFace, ms = 10) {
  let delay = 0;
  cardsArr.forEach(card => {
    setTimeout(() => card.flip(isFace), delay);
    delay += ms;
  });
  return new Promise(resolve => setTimeout(resolve, delay + 100));
}

let numInput = document.createElement("input");
numInput.setAttribute("type", "number");
numInput.setAttribute("min", "1");
numInput.value = 1;
numInput.style.width = "3em";
controlsMenu.appendChild(numInput);
random3Button.innerText = "Random";

async function showRandom(n, ms = 10){
  await flipAll(false, 0.5 * ms);
  console.log("done flipping");
  let randomCards = cardsArr.map(card => card);
  randomCards.sort(() => Math.random() - 0.5);
  let delay = 0;
  randomCards.slice(0, n).forEach(card => {
    setTimeout(() => card.flip(true), delay);
    delay += ms;
  });
  return new Promise(resolve => setTimeout(resolve, delay + 100));
};