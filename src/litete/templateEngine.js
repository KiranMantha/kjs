import VDOM from './vdom';
import createVDom from './toVdom';
import getHtmlFromVDom from './vdomToHtml';
import attachDomEvents from './domEvents';

export default class Component {
  _vdom = {};
  _config = {};
  props = {};
  parentElement = {};
  localName = '';

  constructor(props) {
    this._vdom = new VDOM();
    this.props = props;
    this.isLiteElement = false;
    this.onMount = this.onMount.bind(this);
    this.onUnMount = this.onUnMount.bind(this);
  }

  _getVDom = () => {
    let node = (new DOMParser()).parseFromString(this._config.template, 'application/xml').children[0];
    this._vdom = createVDom(node, this._vdom.children);
  }

  _compile = () => {
    this._getVDom();
    getHtmlFromVDom(this._vdom, this, this);
  }

  _callComponentOnMount = async () => {
    if(this.ComponentOnMount) {
      return this.ComponentOnMount();
    }
    return true;
  } 

  // Fires when custom element binds to DOM
  onMount() {
    if (this.render) {
      this._callComponentOnMount().then(() => { 
        this._config.template = this.render();
        this._compile();
      });
    } else {
      throw ('Render is not defined in the component ' + this.constructor.name);
    }
  }

  //Fires whenever an attribute is added, removed or updated
  attributeChangedCallback(attrName, oldVal, newVal) {

  }

  //Fires when custom element removes from DOM
  onUnMount() {
    if (this.ComponentOnUnMount) this.ComponentOnUnMount();
  }
}