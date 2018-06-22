export default class lcContext {
    constructor(context) {
        this._setContext(context);
    }

    private _setContext() {
        return Object.assign({}, context.data, context.methods);
    }
}