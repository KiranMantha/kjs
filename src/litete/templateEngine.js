import VDOM from './vdom';
import createVDom from './toVdom';
import getHtmlFromVDom from './vdomToHtml';
import attachDomEvents from './domEvents';

function getVDom() {
  let node = (new DOMParser()).parseFromString(this._config.template, 'application/xml').children[0];
  this._vdom = createVDom(node, this._vdom.children);
}

async function callComponentOnMount() {
  if (this.ComponentOnMount) {
    return this.ComponentOnMount();
  }
  return true;
}

function compile() {
  let template = this._config.template;
  if (typeof template === 'string') {
    getVDom.call(this);
    getHtmlFromVDom(this._vdom, this.domRef, this);
  } else if (template.splice) {
    for (let vdom of template) {
      getHtmlFromVDom(vdom, this.domRef, this);
    }
  } else if (typeof template === 'object') {
    this._vdom = createVDom(template, this._vdom.children);
    getHtmlFromVDom(this._vdom, this.domRef, this);
  }

  if (this.ComponentDidMount) {
    return this.ComponentDidMount();
  }
}

export default class Component {
  _vdom = {};
  _config = {};
  props = {};
  context = {};
  localName = '';
  domRef;
  state;

  constructor(props) {
    this._vdom = new VDOM();
    this.props = props;
    this.isLiteElement = true;
    this.domRef = {};
    this.context = {};
    this.state = {};
    this.onMount = this.onMount.bind(this);
    this.onUnMount = this.onUnMount.bind(this);
  }

  setState = (arg, callback) => {
    console.log('setState called');
    if (typeof arg === 'object') {
      this.state = Object.assign({}, this.state, arg);
    } else if (typeof arg === 'function') {

    }
    if (callback) callback();
    this.onMount();
  }

  //Force Update
  forceUpdate = () => {
    this.onMount();
  }

  // Fires when custom element binds to DOM
  onMount() {
    if (this.render) {
      callComponentOnMount.call(this).then(() => {
        this._config.template = this.render();
        if(this._config.template) compile.call(this);
      });
    } else {
      throw Error('Render is not defined in the component ' + this.constructor.name);
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