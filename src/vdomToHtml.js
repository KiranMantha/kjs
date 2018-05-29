import _ from 'lodash';
import * as escape from 'escape-html';
import registry from './registerComponent';

export const getHtmlFromVDom = (vdom, parentNode, context) => {
    let isEvent = /^on/;
    let isExpression = /{([^{}]+)}/g;
    let match;
    let node;
    let _component = registry.getComponent(vdom.type);

    if (_component && typeof _component === 'function') {
        for (let prop in vdom.props) {
            let value = vdom.props[prop];
            if (match = isExpression.exec(value)) {
                let _value = _.get(context, match[1].trim(), '');
                vdom.props[prop] = _value;
            }
        }
        node = new _component(vdom.props);
    } else if (!node) {
        node = document.createElement(vdom.type);

        //Add properties
        for (let prop in vdom.props) {
            if (prop.match(isEvent)) {
                node.addEventListener(
                    prop.substring(2),
                    context[vdom.props[prop]],
                    false
                );
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
                    _.forEach(found, (val) => {
                        let value = _.get(context, val.trim(), '');
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