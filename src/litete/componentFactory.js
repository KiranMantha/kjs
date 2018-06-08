import assign from 'lodash/assign';
import kebabCase from 'lodash/kebabCase';

export default class ComponentFactory {
    static createComponentNode = (component, props) => {
        let nodeConstructor = new component(props);
        let node = document.createElement(kebabCase(nodeConstructor.constructor.name));
        nodeConstructor.localName = node.localName;
        assign(node, nodeConstructor);
        nodeConstructor.setHTMLRef(node);
        return { node, nodeConstructor };
    }
}