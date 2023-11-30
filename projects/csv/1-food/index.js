import FilterButton from './FilterButton.js';
import FoodItem from './FoodItem.js';
import {
  loadTextFile,
  parseCSVData
} from './myLib.js';

/*
  This app will help you learn about:
  parsing CSVs, extending HTMLElements, and using DOM.js
*/

/* 
  Use DOM.set to structure the DOM (DOM.js library)
  This method insterpretes a JS objects to create 
  HTML elements and to modified their properties
*/
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
      id: 'filterMenu',
      h3: 'Filter',
    },
    section: {
      id: 'mainContainer',
    }
  },
  footer: {
    p: 'Front-End Web: parsing CSVs, extending HTMLElements, and using DOM.js',
  }
});

// Load items from the CSV and add them to the mainContainer

let foodItems = [];

async function loadFoodItems() {
  let data = await loadTextFile('generic-food.csv');
  foodItems = parseCSVData(data).map(item =>
    new FoodItem(
      item.FOOD_NAME,
      item.SCIENTIFIC_NAME,
      item.GROUP,
    )
  );
  foodItems.sort(() => Math.random() - 0.5);
  mainContainer.set(foodItems);
  /*
    This .set() method is the same as DOM.set() of DOM.js library,
    but applied to (or invoked from) an element instead of the whole DOM,
    so the elements will pe appended there.
  */
}

loadFoodItems();



// Creates and sets up the filter buttons
let filterValues = Object.entries(FoodItem.COLOR_MAP); 
// Object.entries() turns an object into and array of pairs of keys and values
for (let [key, value] of filterValues) {
  let filterButton = new FilterButton(key, value);
  filterButton.onclick = () => setFilter(filterButton);
  filterMenu.set(filterButton);
}
// method that handles the filtering of items
let previousFilter;
function setFilter(button) {
  if (previousFilter) {
    previousFilter.selected = false;
  }
  if (previousFilter === button) { // deselect
    foodItems.forEach(item => item.hidden = false);
    previousFilter = undefined;
    return;
  }
  for (let item of foodItems) {
    let hasFilter = item.group.startsWith(button.value);
    item.hidden = !hasFilter;
  }
  button.selected = true;
  previousFilter = button;
}