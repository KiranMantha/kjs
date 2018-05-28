import _ from 'lodash';
export const getHtmlFromVDom = (vdom, parentNode, context) => {
    let isEvent = /^on/,
        isExpression = /{([^{}].*?)}/g,
        match;
    let node = document.createElement(vdom.type);

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
            if (match = isExpression.exec(child)) {
                let value = _.get(context, match[1].trim(), '');
                let textnode = document.createTextNode(value);
                node.appendChild(textnode);
            } else {
                let textnode = document.createTextNode(child);
                node.appendChild(textnode);
            }
        } else {
            getHtmlFromVDom(child, node, context);
        }
    }
    parentNode.appendChild(node);
}