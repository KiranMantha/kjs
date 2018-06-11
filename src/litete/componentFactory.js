import assign from 'lodash/assign';
import kebabCase from 'lodash/kebabCase';
import get from 'lodash/get';
import registry from './registerComponent';
import attachDomEvents from './domEvents';

function createNode(component, vdom, parentNode, context) {
    let match;
    let isExpression = /{([^{}]+)}/g;
    for (let prop in vdom.props) {
        if (prop !== 'children') {
            let value = vdom.props[prop];
            if (match = isExpression.exec(value)) {
                let _value = get(context, match[1].trim(), '');
                vdom.props[prop] = _value;
            }
        }
    }
    let nodeConstructor = new component(vdom.props);
    let node = document.createElement(kebabCase(vdom.type));
    nodeConstructor.localName = node.localName;
    assign(node, nodeConstructor);
    nodeConstructor.domRef = node;
    nodeConstructor.context = context || {};
    if(parentNode.contains(node)) parentNode.removeChild(node);
    attachDomEvents(node);
    parentNode.appendChild(node);
}

export default class ComponentFactory {
    static createComponentNode = (component, vdom, parentNode, context) => {        
        if (component && typeof component === 'function') {
            createNode(component, vdom, parentNode, context);
            return true;
        } else {
            let _component = registry.getComponent(vdom.type.toLowerCase());
            if(_component && typeof _component === 'function') {
                createNode(_component, vdom, parentNode, context);
                return true;
            }
        }
        return false;
    }

    static createElement = (nodeName, props) => {
        let node = document.createElement(kebabCase(nodeName));
        node.props = props;
        return node;
    }
}