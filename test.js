/*
    https://gist.github.com/superMDguy/9d69b36fef029539683b3fee16171992
    https://gist.github.com/superMDguy/08c5ab5bac949e4e39776b98f43a5534
    https://gist.github.com/superMDguy/5ddbeb3cb516a22d8452be6603c07923
    https://gist.github.com/superMDguy/5d79cf4cc234eb4e78df76ea4af7fc64
    https://vuejs.org/v2/guide/reactivity.html
*/
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.liteTE = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    /**
        var match = expression
         .match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
        var lhs = match[1];
        var rhs = match[2];
        var aliasAs = match[3];
        var trackByExp = match[4];
    */

    let forRegex = /^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/,
        isExpression = /{{(.+?)}}/g,
        isEvent = /^lc-(click|submit)/,
        isFuncWithArgs = /\(\s*([^)]+?)\s*\)/,
        getFuncName = /^\s*[A-Za-z][A-Za-z0-9_]*([^\(]*)/i;

    let events = {
        'lc-click': 'click',
        'lc-submit': 'submit'
    }

    function get(obj, path, defaultValue) {
        let patharr = path.trim().split('.');
        let value;
        let k;
        for (let i of patharr) {
            k = k ? k[i] : obj[i];
            if (k && typeof k !== 'object') {
                value = k;
                return value;
            }
        }
        if (typeof value === 'undefined') {
            if (typeof defaultValue !== 'undefined')
                value = defaultValue
            else
                value = '';
        }
        return value;
    }

    function _data(key) {
        return this.getAttribute('data-' + key);
    }

    function _getContext() {
        return (new Function(`return ${this.data('context')}`))();
    }

    function _getTemplate() {
        let template = (new Function(`return ${this.data('templateref')}`))();
        return (new DOMParser()).parseFromString(template, 'application/xml').children[0];
    }

    function addListeners(node, context) {
        if (!node.eventsBinded) {
            let match;
            let match1;
            for (let prop of node.attributes) {
                if (match = isEvent.exec(prop.name)) {
                    if (match1 = isFuncWithArgs.exec(prop.value)) {
                        let args = match1[1].split(',');
                        let values = [];
                        for (let item of args) {
                            values.push(get(context, item));
                        }
                        let funcName = getFuncName.exec(prop.value)[0];
                        node.addEventListener(events[match[0]], get(context, funcName).bind(context, ...values), false);
                    } else {
                        node.addEventListener(events[match[0]], get(context, prop.value).bind(context), false);
                    }
                    node.eventsBinded = true;
                }
            }
        }
    }

    function _interpolate(node) {
        let cursor = 0;
        let text = '';
        while (match = isExpression.exec(node.nodeValue)) {
            text += node.nodeValue.slice(cursor, match.index) + get(this, match[1].trim());// this[match[1].trim()];
            cursor = match.index + match[0].length;
        }
        text += node.nodeValue.substr(cursor, node.nodeValue.length - cursor);
        node.nodeValue = text;
        return node;
    }

    function render(context, rootNode, parentNode) {
        let match;
        for (let node of rootNode.childNodes) {
            if (node.nodeType === 3) {
                if(node.nodeValue.trim() !== '') _interpolate.call(context, node);
            } else if (node.nodeType === 1) {
                if (node.nodeName.toUpperCase() !== 'INPUT') {
                    let forCond = node.attributes['data-for'];
                    addListeners(node, context);
                    if (!forCond) {
                        render(context, node, rootNode);
                    } else {
                        match = forRegex.exec(forCond.value);
                        if (match) {
                            let clone = node.cloneNode(true);
                            clone.removeAttribute('data-for');
                            let lhs = match[1];
                            let rhs = context[match[2]];
                            if (rhs.splice) {
                                rhs.forEach((item, index) => {
                                    let reclone = clone.cloneNode(true);
                                    let iobj = {
                                        [lhs]: item,
                                        index: index
                                    };
                                    let _node = render(Object.assign({}, context, iobj), reclone, rootNode);
                                    rootNode.appendChild(_node);
                                });
                                rootNode.removeChild(node);
                            }
                        } else {
                            throw Error('Expected expression in form of \'_item_ in _collection_[ track by _id_]\' but got \'{0}\'.',
                                forCond.value);
                        }
                    }
                } else {

                }
            }
        }
        return rootNode;
    }

    function observe(obj) {
        function walk() {
            const keys = Object.keys(obj)
            for (let i = 0; i < keys.length; i++) {
                defineSetGet(keys[i], obj[keys[i]])
            }
        }

        function defineSetGet(key, val) {
            if (val !== null && typeof val === 'object') {
                walk(val) // Add reactivity to all children of val
            }

            Object.defineProperty(obj, key, {
                enumerable: true,
                configurable: true,
                get: function reactiveGetter() {
                    console.log(key, val);
                    return val;
                },
                set: function reactiveSetter(newVal) {
                    console.log('new value', newVal);
                    val = newVal;
                }
            });
        }

        walk(obj);
    }

    let _context = Symbol('_context');
    let _template = Symbol('_template');
    let _init = Symbol('_init');

    class LiteComponent extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({
                mode: 'open'
            });
            this.data = _data.bind(this);
        }

        [_init]() {
            let ctx = _getContext.call(this);
            setTimeout(()=>{
               // observe(ctx.data);
            });            
            this[_context] = ctx;
            this[_template] = _getTemplate.call(this);
            //console.log(this[_template].querySelectorAll('[lc-click]'));
            let node = render(this[_context], this[_template], null);
            //this.appendChild(node);
            this._shadowRoot.appendChild(node);//.outerHTML;
        }

        //Fires when custom component loaded in DOM
        connectedCallback() {
            this[_init]();
            if (this[_context].lcOnInit) {
                this[_context].lcOnInit();
            }
        }

        //Fires whenever an attribute is added, removed or updated
        attributeChangedCallback(attrName, oldVal, newVal) {

        }

        //Fires when custom component is unloaded from DOM
        disconnectedCallback() {
            if (this[_context].lcOnDestroy) {
                this[_context].lcOnDestroy();
            }
        }
    }

    window.customElements.define('l-c', LiteComponent);
}));

