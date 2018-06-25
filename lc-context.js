function lcContext(context) {
    function _setContext() {
        context.changeSet = {};
        context.update = function(key, prevValue, newValue) {
            this.changeSet[key].prevValue = prevValue;
            this.changeSet[key].newValue = newValue;
        }

        let newObj = Object.assign({}, context);
        let watchObj = new Proxy(newObj, {
            get(target, key) {
                console.log(`get ${target} ${key}`);
                return target[key];
            },
            set(target, key, value) {
                console.log(`set ${target} ${key}`);
                
                target[key] = value;
            },
            deleteProperty(target, key) {
                delete target[key];
            }
        });
        return watchObj;
    }

    return _setContext(context);
}