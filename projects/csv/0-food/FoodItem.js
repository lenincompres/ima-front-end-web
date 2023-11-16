export class FoodItem extends HTMLElement{

  constructor(food){
    super();
    this.set({
      margin: '0.5em',
      padding: '2em',
      borderRadius: '0.5em',
      backgroundColor: FoodItem.ColorTable[food.group],
      h2: food.food_name,
      i: food.scientific_name,
      p: food.group,
    });
  }

  static ColorTable = {
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

}

customElements.define("food-item", FoodItem);
export default FoodItem;