import FoodItem from './FoodItem.js';
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
    p: 'Data from Data World.',
  },
  main: {
    id: 'mainContainer',
  },
  footer: {
    p: 'Front-End Web: CSV parsing, HTMLElement class, DOM.js',
  }
});

loadFoodItems();

async function loadFoodItems() {
  let data = await loadTextFile('generic-food.csv');
  let items = parseCSVData(data);
  items = items.map(item =>
    new FoodItem(
      item.FOOD_NAME,
      item.SCIENTIFIC_NAME,
      item.GROUP
    )
  );
  mainContainer.set(items);
}