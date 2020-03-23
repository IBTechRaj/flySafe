/* eslint class-methods-use-this: ["error", { "exceptMethods": ["addChangeCallback",
  "getTextValue","getTextAreaValue","addClickCallback","toNum"] }] */
/* eslint radix: ["error", "as-needed"] */

import AlignGrid from './AlignGrid';

export default class FormUtil {
  constructor(config) {
    //  super();
    this.scene = config.scene;
    //  get the game height and width
    this.gameWidth = this.scene.game.config.width;
    this.gameHeight = this.scene.game.config.height;
    this.alignGrid = new AlignGrid({
      scene: this.scene,
      rows: config.rows,
      cols: config.cols,
    });
  }

  showNumbers() {
    this.alignGrid.showNumbers();
  }

  scaleToGameW(elName, per) {
    const el = document.getElementById(elName);
    const w = this.gameWidth * per;
    el.style.width = `${w}px`;
    el.style.display = 'block';
  }

  scaleToGameH(elName, per) {
    const el = document.getElementById(elName);
    const h = this.gameHeight * per;
    el.style.height = `${h}px`;
  }

  placeElementAt(index, elName, centerX = true, centerY = false) {
    //  get the position from the grid
    const pos = this.alignGrid.getPosByIndex(index);
    //  extract to local vars
    let { x } = pos;
    let { y } = pos;
    //  get the element
    const el = document.getElementById(elName);
    //  set the position to absolute
    el.style.position = 'absolute';
    //  get the width of the element
    let w = el.style.width;
    //  convert to a number
    w = this.toNum(w);
    //
    //
    //  center horizontal in square if needed
    if (centerX === true) {
      x -= w / 2;
    }
    //
    //  get the height
    //
    let h = el.style.height;
    //  convert to a number
    h = this.toNum(h);
    //
    //  center verticaly in square if needed
    //
    if (centerY === true) {
      y -= h / 2;
    }
    //  set the positions
    el.style.top = `${y}px`;
    el.style.left = `${x}px`;
  }

  //  changes 100px to 100
  toNum(s) {
    s = s.replace('px', '');
    s = parseInt(s);
    return s;
  }

  //  add a change callback
  addChangeCallback(elName, fun, scope = null) {
    const el = document.getElementById(elName);
    if (scope === null) {
      el.onchange = fun;
    } else {
      el.onchange = fun.bind(scope);
    }
  }

  getTextAreaValue(elName) {
    const el = document.getElementById(elName);
    return el.value;
  }

  getTextValue(elName) {
    const el = document.getElementById(elName);
    return el.innerText;
  }

  addClickCallback(elName, fun, scope = null) {
    const el = document.getElementById(elName);
    if (scope === null) {
      el.onclick = fun;
    } else {
      el.onclick = fun.bind(scope);
    }
  }
}