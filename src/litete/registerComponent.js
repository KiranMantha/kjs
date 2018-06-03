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
        
        // forEach(args, (component) => {
        //     let compName = kebabCase(component.name);
        //     let name = `lte.${compName}`;
        //     if (!_registry[name]) {
        //         _registry[name] = component;
        //     }
        // });

        // if(window.customElements) {
        //     for(let regComp in _registry) {
        //         customElements.define(regComp.substring(4), _registry[regComp]);
        //     }
        // } else {
            // _loadScript('./polyfill.js').then(e => {
            //     // Polyfill loaded.
            //     for(let regComp in _registry) {
            //         customElements.define(regComp.substring(4), _registry[regComp]);
            //     }
            // });
        //}
    }

    let _loadScript = (src) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    return {
        registerComponents: _set,
        getComponent: _get
    }
})();

export default registry;