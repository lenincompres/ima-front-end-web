/*
  This app showcases the use of Binders from the DOM.js library.
  It Also feature a class that extends HTMLElements and uses setters and getters
*/

import ZigZagger from "./ZigZagger.js";

const REPO_URL = 'https://github.com/lenincompres/ima-front-end-web/tree/main/projects/binders';

// Binders (from DOM.js library) hold a value and may be linked to an element's property, change them as their value changes. I conventionally declare them as constants named starting with underscore.
const _FROZEN_PCT = new Binder(0);
// This binder holds the numeric % of zig-zagger elements frozen at any given time

// This DOM structures includes a property bind
DOM.set({
  title: 'Zig Zaggers',
  textAlign: 'center',
  header: {
    padding: '1em',
    backgroundColor: 'white',
    h1: 'Zig Zaggers',
    p: `This <a href="${REPO_URL}">app's code</a> features JS classes that extend HTMLElements, and uses DOM.js binders to update element properties.`,
  },
  section: {
    id: 'progressBar',
    text: _FROZEN_PCT,
    // The section's text will change if the binder value changes
    width: _FROZEN_PCT.as(val => `${val}%`),
    // The width also, and formatted as() indicated by the method
  },
  main: {
    id: 'zaggersContainer',
  },
  footer: {
    position: 'fixed',
    bottom: '1em',
    width: '100%',
    p: 'Created by Lenin Compres (<a href="http://lenino.net">Lenino</a>) using <a href="https://github.com/lenincompres/DOM.js">DOM.js</a> for <a href = "https://tisch.nyu.edu/itp">ITP/IMA - NYU TISCH Interactive</a>',
  }
});

// You may also bind properties outside of the set() method
// Use the binder's bind() method and indicate what element holds the property.

_FROZEN_PCT.bind(document.body, 'backgroundColor', val => `rgba(86,86,104,${val/100})`);

// This bounds the backgroundColor of the document.body and formats the value it accordingly.


const ZAGGERS_NAMES = ['Zig', 'Zag', 'Zegg', 'Zoogy', 'Zeegle'];
let zigZaggers = [];
for (let name of ZAGGERS_NAMES) {
  let zagger = new ZigZagger(name);
  zigZaggers.push(zagger);
  // The ZigZagger class invokes a callBack function when the freezing property changes
  zagger.callBack = () => zigZaggerClicked(zagger);
  zaggersContainer.set(zagger);
}

function zigZaggerClicked(zagger) {
  const frozenZaggers = zigZaggers.filter(z => !z.canMove);
  _FROZEN_PCT.value = 100 * frozenZaggers.length / zigZaggers.length;
  if (_FROZEN_PCT.value == 100) {
    allZaggersFrozen();
  }
}

let winningsCount = 0;
function allZaggersFrozen() {
  const TIMESTAMP = (new Date()).toLocaleTimeString();
  DOM.set({
    section: {
      paddingTop: '1em',
      color: 'white',
      pointerEvents: 'none',
      h6: winningsCount,
      p: `(${TIMESTAMP}) Congratulations, you froze them all at once! Now check out the code's repository already.`,
    }
  });
  winningsCount += 1;
};