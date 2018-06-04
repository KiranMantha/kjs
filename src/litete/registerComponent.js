import get from "lodash/get";
import forEach from "lodash/forEach";
import kebabCase from "lodash/kebabCase";

const registry = (() => {
    let _registry = {};

    let _get = (componentName) => {
        return get(_registry, `lte.${componentName}`, null);
    }

    let _set = (tag, component) => {
        let name = `lte.${tag}`;
        if (!_registry[name]) {
            _registry[name] = component;
        }
    }

    return {
        registerComponents: _set,
        getComponent: _get
    }
})();

export default registry;