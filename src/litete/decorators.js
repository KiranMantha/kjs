import registry from './registerComponent';

export function Meta(options) {
    return function(target){
        registry.registerComponents(options.selector, target);
    }
}