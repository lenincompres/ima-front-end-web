
export class FilterButton extends HTMLButtonElement {

  constructor(value, color, listerner = () => null) {
    super();

    this.set({
      is: 'filter-button',
      class: ['filter-button'],
      backgroundColor: color,
      text: value,
      value: value,
      onclick: () => listerner(this),
    });

    this._selected = false;
  }

  set selected(val){
    if(val) this.classList.add("chosen");
    else this.classList.remove("chosen");
    this._selected = val;
  }

  get selected(){
    return this._selected;
  }

}

// Classes that extend HTMLElement must be define with the tag they'll use in the DOM
window.customElements.define('filter-button', FilterButton, {extends: 'button'});
export default FilterButton;