// A class that extends and defines a nw type of HTML Element

/* 
  This is an example of a variable that is used in this code file, 
  but is not exported to be used elsewhere.
*/
const ColorTable = {
  Fruits: 'orange',
  Nuts: 'tan',
  Nuts: 'tan',
  Vegetables: 'limegreen',
  Teas: 'olive',
  Gourds: 'yellowgreen',
  Pulses: 'darkkhaki',
  Soy: 'beige',
  Confectioneries: 'orchid',
  'Baking goods': 'pink',
  'Herbs and Spices': 'goldenrod',
  'Cereals and cereal products': 'wheat',
  'Coffee and coffee products': 'indianred',
  'Cocoa and cocoa products': 'indianred',
  'Aquatic foods': 'aqua',
  'Animal foods': 'crimson',
  'Milk and milk products': 'lightsteelblue',
  Beverages: 'rosybrown',
};

export class FoodItem extends HTMLElement {

  constructor(name, sName, group) {
    super();

    // The Binder class is also part od the DOM.js library
    this.isSelectedBinder = new Binder(false);

    this.set({
      backgroundColor: ColorTable[group],
      border: 'solid 0.25em',
      borderColor: this.isSelectedBinder.as('transparent', 'black'),
      h1: name,
      i: sName,
      p: group,
      onclick: () => this.toggle(),
    });

  }

  toggle(){
    this.isSelectedBinder.value = !this.isSelectedBinder.value;
  }

}

// Classes that extend HTMLElement must also be define with the tag they will use in the DOM
customElements.define("food-item", FoodItem);

export default FoodItem;