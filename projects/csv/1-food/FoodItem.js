// A class that extends and defines a new type of HTML Element
export class FoodItem extends HTMLElement {

  constructor(name, scienceName, group) {
    super();
    this.group = group.split(' ')[0];
    this.selected = false;
    if(scienceName == 'NULL') scienceName = '';

    this.set({
      backgroundColor: ColorMap[this.group],
      h3: name.replaceAll('(', '<small>(').replaceAll(')', ')</small>'),
      i: scienceName,
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

}

// Classes that extend HTMLElement must be define with the tag they'll use in the DOM
customElements.define('food-item', FoodItem);
export default FoodItem;


/* 
  ColorTable is an example of a variable that is used in this code file, 
  but is not default export to be used elsewhere.
*/
export const ColorMap = {
  Dishes: 'rosybrown',
  Coffee: 'sienna',
  Cocoa: 'chocolate',
  Nuts: 'tan',
  Cereals: 'palegoldenrod',
  Soy: 'khaki',
  Pulses: 'darkkhaki',
  Teas: 'yellowgreen',
  Vegetables: 'limegreen',
  Gourds: 'gold',
  Herbs: 'orange',
  Fruits: 'tomato',
  Aquatic: 'salmon',
  Animal: 'indianred',
  Baking: 'palevioletred',
  Confectioneries: 'violet',
  Snack: 'mediumpurple',
  Beverages: 'lightsteelblue',
  Milk: 'powderblue',
};