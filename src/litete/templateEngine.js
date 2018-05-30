import VDOM from './vdom';
import createVDom from './toVdom';
import getHtmlFromVDom from './vdomToHtml';

export default class Component extends HTMLElement {
  _vdom = {};
  _config = {};
  props = {};

  constructor(props) {
    super();
    this._vdom = new VDOM();
    this.props = props;
  }

  _getVDom = () => {
    let node = (new DOMParser()).parseFromString(this._config.template, 'application/xml').children[0];
    this._vdom = createVDom(node);
  }

  _compile = () => {
    this._getVDom();
    getHtmlFromVDom(this._vdom, this, this);
  }

  // Fires when custom element binds to DOM
  connectedCallback() {
    if (this.onMount) this.onMount();
    if (this.render) {
      this._config.template = this.render();
      this._compile();      
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