
export class FilterButton extends HTMLElement {

  constructor(groupName, color) {
    super();

    this.set({
      backgroundColor: color,
      text: groupName,
    });

    this.value = groupName;
    this._selected = false;
    /* 
      Conventionally, properties that start with underscore (_) means 
      that should not be changed or accessed directly from outside this class.
    */
  }

  /*
    Settters and getters (set/get) create properties for the class
    that execute commands when their valued is changed or requested.
  */
  set selected(val){
    if(val) this.classList.add("selected");
    else this.classList.remove("selected");
    this._selected = val;
  }

  get selected(){
    return this._selected;
  }

}

/* 
  Classes that extend HTMLElement must be define
  with the tag they'll use in the DOM
*/
window.customElements.define('filter-button', FilterButton);
export default FilterButton;