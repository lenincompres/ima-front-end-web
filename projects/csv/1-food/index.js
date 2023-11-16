import FoodItem, {
  ColorMap
} from './FoodItem.js';
import {
  loadTextFile,
  parseCSVData
} from './myLib.js';

// sets up the DOM structure using DOM.js library
// the set function insterpretes JS objects to create elements and modified their properties
DOM.set({
  title: "Generic Food",
  header: {
    h1: 'Generic Food',
    p: 'Data source: <a href="https://data.world/alexandra/generic-food-database/workspace/file?filename=generic-food.csv">Data World</a>',
  },
  main: {
    display: 'flex',
    backgroundColor: 'white',
    menu: {
      margin: '1em',
      width: '5em',
      id: 'filterMenu',
    },
    section: {
      id: 'mainContainer',
    }
  },
  footer: {
    p: 'Front-End Web: CSV parsing, HTMLElement class, DOM.js',
  }
});



let items = [];
loadFoodItems();
async function loadFoodItems() {
  let data = await loadTextFile('generic-food.csv');
  items = parseCSVData(data).map(item =>
    new FoodItem(
      item.FOOD_NAME,
      item.SCIENTIFIC_NAME,
      item.GROUP,
    )
  );
  items.sort(() => Math.random() - 0.5);
  mainContainer.set(items);
}




// set up the filter buttons
for (let [key, value] of Object.entries(ColorMap)) {
  let button = filterMenu.set({
    backgroundColor: value,
    text: key,
    value: key,
  }, 'button');
  button.onclick = () => setFilter(button);
}

let selectedButton;
function setFilter(button) {
  if (selectedButton) {
    selectedButton.classList.remove("chosen");
  }
  if (selectedButton === button) {
    items.forEach(item => item.style.display = "block");
    selectedButton = undefined;
    return;
  }
  for (let item of items) {
    let hasFilter = item.group.startsWith(button.value);
    item.style.display = hasFilter ? "block" : "none";
  }
  button.classList.add("chosen");
  selectedButton = button;
}