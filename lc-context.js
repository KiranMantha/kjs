function lcContext(context) {
    function _setContext() {
        return Object.assign({}, context.data, context.methods);
    }

    return _setContext(context);
}