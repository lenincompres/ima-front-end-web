
const CARD_SUITS = ["♠", "♥", "♣", "♦"];

const CARD_CHARS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

for (suit of CARD_SUITS) {
  for (char of CARD_CHARS) {

    let cardDiv = document.createElement("div");

    cardDiv.classList.add("card");

    cardDiv.innerHTML = `<p>${char}${suit}</p>`;

    if (suit === "♥" || suit === "♦") {
      cardDiv.style.color = "maroon";
    }
    
    cardDiv.onclick = () => {
      cardDiv.classList.toggle("back");
    }

    tableSection.appendChild(cardDiv);

  }
}