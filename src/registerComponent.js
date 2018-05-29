import _ from "lodash";

const registry = (() => {
    let _registry = {};

    let _get = (componentName) => {
        return _.get(_registry, `lte.${componentName}`, null);
    }

    let _set = (...args) => {
        _.forEach(args, (component) => {
            let compName = _.kebabCase(component.name);
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