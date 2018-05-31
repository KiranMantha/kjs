import get from 'lodash/get';
import forEach from 'lodash/forEach';
import registry from './registerComponent';

const getHtmlFromVDom = (vdom, parentNode, context) => {
    let isEvent = /^on/;
    let isExpression = /{([^{}]+)}/g;
    let hasBind = /.bind(.*?)/g;
    let match;
    let node;
    let _component = registry.getComponent(vdom.type);

    if (_component && typeof _component === 'function') {
        for (let prop in vdom.props) {
            let value = vdom.props[prop];
            if (match = isExpression.exec(value)) {
                let _value = get(context, match[1].trim(), '');
                vdom.props[prop] = _value;
            }
        }
        node = new _component(vdom.props);
    } else if (!node) {
        node = document.createElement(vdom.type);

        //Add properties
        for (let prop in vdom.props) {
            let listener;
            if (prop.match(isEvent)) {                
                if(match = hasBind.exec(vdom.props[prop])) {
                    listener = (new Function('context', `return context.${vdom.props[prop]}`))(context);
                } else {
                    listener = context[vdom.props[prop]]
                }
                node.addEventListener(prop.substring(2), listener, false);
            } else {
                node.setAttribute(prop, vdom.props[prop]);
            }
        }

        //Append Children Nodes
        for (let child of vdom.children) {
            if (typeof child === 'string') {
                let found = [];
                while( match = isExpression.exec(child) ) {
                    found.push(match[1]);
                }
                if (found.length > 0) {
                    forEach(found, (val) => {
                        let value = get(context, val.trim(), '');
                        let textnode = document.createTextNode(value);
                        node.appendChild(textnode);
                    });                    
                } else {
                    let textnode = document.createTextNode(child);
                    node.appendChild(textnode);
                }
            } else {
                getHtmlFromVDom(child, node, context);
            }
        }
    }
    parentNode.appendChild(node);
}

export default getHtmlFromVDom;