

export class MovingElement extends HTMLElement {

  constructor(){
    super();

    this._x = new Binder(200);
    this._y = new Binder(200);
    this.vx = 0;
    this.vy = 0;

    // binder is a class that comes with DOM.js
    this._isAlive = new Binder(true);
    console.log(this._isAlive);

    this.set({
      position: 'fixed',
      top: this._y.as(val => `${val}px`),
      left: this._x.as(val => `${val}px`),
      padding: '0.5em',
      backgroundColor: this._isAlive.as(val => val ? 'lime' : 'red'),
      p: {
        text: this._isAlive,
      },
      onclick: () => this.isAlive = !this.isAlive,
    });

    this._isAlive.bind(document.body, 'backgroundColor', val => val ? 'white' : 'gray');

    setInterval(() => this.move(), 10);
  }

  move(){
    if(!this._isAlive.value) return;
    this.x += this.vx;
    this.y += this.vy;
    this.random();
  }

  random(){
    this.vx += MovingElement.randomV();
    if(this.vx > MovingElement.MAX_V) this.vx = MovingElement.MAX_V;
    this.vy += MovingElement.randomV();
    if(this.vy > MovingElement.MAX_V) this.vx = MovingElement.MAX_V;
  }

  set x(val){
    if(val > window.innerWidth){
      val -= window.innerWidth;
    }
    if(val < 0){
      val += window.innerWidth;
    }
    this._x.value = val;
  }

  get x(){
    return this._x.value;
  }

  set y(val){
    if(val > window.innerHeight){
      val -= window.innerHeight;
    }
    if(val < 0){
      val += window.innerHeight;
    }
    this._y.value = val;
  }

  get y(){
    return this._y.value;
  }

  set isAlive(val){
    this._isAlive.value = val;
  }
  get isAlive(){
    return this._isAlive.value;
  }

  static MAX_V = 5;

  static randomV(){
    return (Math.random() - 0.5) / 10;
  }

} 

customElements.define('mover-element', MovingElement);
export default MovingElement;