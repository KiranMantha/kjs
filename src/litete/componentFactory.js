import assign from 'lodash/assign';
import kebabCase from 'lodash/kebabCase';
import getHtmlFromVDom from './vdomToHtml';
import createVDom from './toVdom';

export default class ComponentFactory {
    static createComponentNode = (component, props, context) => {
        let nodeConstructor = new component(props, context);
        let node = document.createElement(kebabCase(nodeConstructor.constructor.name));
        nodeConstructor.localName = node.localName;
        assign(node, nodeConstructor);
        nodeConstructor.domRef = node;
        nodeConstructor.context = context || {};
        return { node, nodeConstructor };
    }

    static createNode = (componentName, props, parentNode, context) => {
        let node = document.createElement(kebabCase(componentName));
        let vdom = createVDom(node);
        vdom.props = props;
        getHtmlFromVDom(vdom, parentNode, context);
    }
}