
const CARD_SUITS = ["♠", "♥", "♣", "♦"];

const CARD_CHARS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];


class Card {

  constructor(char, suit) {

    this.elt = document.createElement("div");
    this.elt.classList.add("card");
    this.elt.innerHTML = `<p>${char}${suit}</p>`;
    if (suit === "♥" || suit === "♦") {
      this.elt.style.color = "maroon";
    }

    this.isBack = false;
    this.elt.onclick = () => this.flip();
  }

  flip(isFace) {
    if(isFace === true){
      this.elt.classList.add("back");
    }
    if(isFace === false){
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
    tableSection.appendChild(card.elt);
  }
}

/* controls */

function flipAll(isFace) {
  for(card of cardsArr){
    card.flip(isFace);
  }
}

flipAllButton.onclick = () => flipAll();

allBackButton.onclick = () => flipAll(false);

allFaceButton.onclick = () => flipAll(true);

random3Button.onclick = () => {
  flipAll(false);
  cardsArr.sort(() => Math.random() - 0.5);
  for(i = 0; i < 3; i++){
    cardsArr[i].flip(true);
  }
};