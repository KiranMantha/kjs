import VDOM from './vdom';
import { createVDom } from './toVdom';
import { getHtmlFromVDom } from './vdomToHtml';

export default class LiteTE extends HTMLElement {
  _vdom = {};
  _config = {};

  constructor() {
    super();
    console.log(this);
    this._vdom = new VDOM();
  }

  _getVDom = () => {
    let node = (new DOMParser()).parseFromString(this._config.template, 'application/xml').children[0];
    this._vdom = createVDom(node);
    console.log(this._vdom);
  }

  _compile = () => {
    this._getVDom();
    getHtmlFromVDom(this._vdom, document.querySelector('body'), this);
  }

  // Fires when custom element binds to DOM
  connectedCallback() {
    if (this.render) {
      this._config.template = this.render();
      this._compile();
      if (this.onMount) this.onMount();
    } else {
      throw ('Render is not defined in the component ' + this.constructor.name);
    }
  }

  //Fires whenever an attribute is added, removed or updated
  attributeChangedCallback(attrName, oldVal, newVal) {

  }

  //Fires when custom element removes from DOM
  disconnectedCallback() {
    if (this.onUnMount) this.onUnMount();
  }
}