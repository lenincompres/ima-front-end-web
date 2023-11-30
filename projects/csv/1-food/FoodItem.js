// A class that extends and defines a new type of HTML Element
export class FoodItem extends HTMLElement {

  constructor(name, scienceName, group) {
    super();
    this.group = group.split(' ').shift(); // this gets the first word
    this.selected = false;
    if(scienceName == 'NULL') scienceName = '';

    let formattedName = name.replaceAll('(', '<small>(').replaceAll(')', ')</small>');
    // this makes text in parenthesis smaller

    this.set({
      backgroundColor: FoodItem.COLOR_MAP[this.group],
      h3: formattedName,
      p: scienceName,
    });

    this.onclick = () => this.toggle();
  }

  toggle(){
    this.selected = !this.selected;
    if(this.selected) this.classList.add('selected');
    else this.classList.remove('selected');
  }

  set hidden(value){
    this.style.display = value ? "none" : "block";
  }

  static COLOR_MAP = {
    Coffee: 'sienna',
    Cocoa: 'chocolate',
    Nuts: 'tan',
    Cereals: 'wheat',
    Soy: 'khaki',
    Pulses: 'darkkhaki',
    Teas: 'yellowgreen',
    Vegetables: 'limegreen',
    Gourds: 'gold',
    Herbs: 'orange',
    Fruits: 'tomato',
    Aquatic: 'salmon',
    Animal: 'indianred',
    Dishes: 'rosybrown',
    Baking: 'palevioletred',
    Confectioneries: 'violet',
    Snack: 'mediumpurple',
    Beverages: 'lightsteelblue',
    Milk: 'powderblue',
  };

}

/* 
  Classes that extend HTMLElement must be defined
  with the tag they'll use in the DOM
*/
customElements.define('food-item', FoodItem);
export default FoodItem;


/* 
  ColorTable is an example of a variable that is used in this code file, 
  but is not default export to be used elsewhere.
*/