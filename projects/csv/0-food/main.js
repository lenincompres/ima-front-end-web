import FoodItem from "./FoodItem.js";

async function loadData() {
  let response = await fetch('generic-food.csv').catch(err => console.error(err));
  console.log(response);

  let data = await response.text();
  data = data.split('\r\n');
  console.log(data);

  setUpData(data);
}

function setUpData(data) {
  let titles = data.shift();
  titles = titles.split(',');
  titles = titles.map(title => title.replaceAll(' ', '_').toLowerCase());
  console.log(titles);

  let foods = [];
  for (let line of data) {
    line = line.split(',');
    let food = {};
    titles.forEach((title, i) => {
      food[title] = line[i];
    });
    foods.push(food);
  }
  console.log(foods);
  displayData(foods);
}

function displayData(foods) {
  foods = foods.map(food => new FoodItem(food));

  DOM.set({
    h1: 'Generic Foods',
    ul: {
      display: 'flex',
      flexWrap: 'wrap',
      li: foods,
    }
  });

}


loadData();