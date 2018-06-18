/**
  var match = expression
  .match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);

if (!match) {
throw Error('iexp', 'Expected expression in form of \'_item_ in _collection_[ track by _id_]\' but got \'{0}\'.',
	expression);
}

var lhs = match[1];
var rhs = match[2];
var aliasAs = match[3];
var trackByExp = match[4];
 */

var forRegex = /^let\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/,
    isExpression = /{{(.+?)}}/g,
    isEvent = /&\w/g;

class LiteComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this._context = null;
        this._template = null;
        this.data = this._data.bind(this);
    }

    _data(key) {
        return this.getAttribute('data-' + key);
    }

    _getContext() {
        return (new Function(`return ${ this.data('context') }`))();
    }

    _getTemplate() {
        let template = (new Function(`return ${ this.data('templateref') }`))();
        return (new DOMParser()).parseFromString(template, 'application/xml').children[0];
    }

    _init() {
        this._context = this._getContext();
        this._template = this._getTemplate();
        this._render(this._template, null);
        this.shadowRoot.appendChild(this._template);
    }

    _render(rootNode, parentNode) {
        let match;
        for(let node of rootNode.childNodes) {
            if(node.nodeType === 3) {
                let cursor = 0;
                let text = '';
                while(match = isExpression.exec(node.nodeValue)) {
                    text += node.nodeValue.slice(cursor, match.index) + this._context.data[match[1].trim()];
                    cursor = match.index + match[0].length;	
                }
                text += node.nodeValue.substr(cursor, node.nodeValue.length - cursor);
                node.nodeValue = text;
            } else if(node.nodeType === 1) {
                let forCond = node.attributes['for'];
                if(!forCond) {
                    this._render(node, rootNode);
                } else {
                    let html = '';
                    match = forRegex.exec(forCond.value);//.match(forRegex);
                    console.log(match);
                    let arr = this._context.data[match[2]];       
                }
                
            }
        }
    }

    connectedCallback() {
        this._init();
    }
}

window.customElements.define('l-c', LiteComponent);