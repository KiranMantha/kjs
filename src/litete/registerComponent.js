import get from "lodash/get";
import forEach from "lodash/forEach";
import kebabCase from "lodash/kebabCase";

const registry = (() => {
    let _registry = {};

    let _get = (componentName) => {
        return get(_registry, `lte.${componentName}`, null);
    }

    let _set = (...args) => {
        forEach(args, (component) => {
            let compName = kebabCase(component.name);
            let name = `lte.${compName}`;
            if (!_registry[name] && !customElements.get(compName)) {
                _registry[name] = component;
                customElements.define(compName, component);
            }
        });
    }

    return {
        registerComponents: _set,
        getComponent: _get
    }
})();

export default registry;