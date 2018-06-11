import { findFirst } from 'obj-traverse/lib/obj-traverse';
import get from 'lodash/get';
import forEach from 'lodash/forEach';
import registry from './registerComponent';
import attachDomEvents from './domEvents';
import ComponentFactory from './componentFactory';

function traverse(json, keyName) {
    let value = '';
    if (Array.isArray(json)) {
        json.forEach(traverse);
    } else if (typeof json === 'object') {
        Object.keys(json).forEach(function(key) {
            if (key === keyName) {
                value = json[key];
                return;
            } else {
               traverse(json[key]);
            }
        });
    }
    return value;
};

const getHtmlFromVDom = (vdom, parentNode, context) => {
    let isEvent = /^on/;
    let isExpression = /{([^{}]+)}/g;
    let hasBind = /.bind(.*?)/g;
    let match;
    if(!context) context = {};
    
    let nodeCreated = ComponentFactory.createComponentNode(null, vdom, parentNode, context);

    if (!nodeCreated) {
        let node = document.createElement(vdom.type);
        node._vdom = vdom;
        //Add properties
        for (let prop in vdom.props) {
            if (prop !== 'children') {
                let listener;
                let propValue = vdom.props[prop];
                if (prop.match(isEvent)) {
                    if (match = hasBind.exec(propValue)) {
                        //listener = (new Function('context', 'prop', 'traverse', `return traverse(context, prop)`))(context, `${vdom.props[prop]}`, traverse);
                        listener = (new Function('context', `return context.${propValue}`))(context);
                    } else {
                        listener = context[propValue]
                    }
                    node.addEventListener(prop.substring(2), listener, false);
                } else if (match = isExpression.exec(propValue)) {
                    let _value = get(context, match[1].trim(), '');
                    //let _value = traverse(context, match[1].trim());
                    propValue = _value;
                    node.setAttribute(prop, propValue);
                } else {
                    node.setAttribute(prop, propValue);
                }
            }
        }

        //Append Children Nodes
        for (let child of vdom.children) {
            if (typeof child === 'string') {
                let found = [];
                while (match = isExpression.exec(child)) {
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
        if(parentNode.contains(node)) parentNode.removeChild(node);
        attachDomEvents(node);
        parentNode.appendChild(node);
    }    
}

export default getHtmlFromVDom;