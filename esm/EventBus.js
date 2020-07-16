export default class EventBus {
    constructor() {
        this.store = new Map();
    }
    on(event, callback) {
        var _a;
        const callbacks = (_a = this.store.get(event)) !== null && _a !== void 0 ? _a : [];
        callbacks.push(callback);
        this.store.set(event, callbacks);
    }
    emit(event, arg) {
        var _a;
        const callbacks = (_a = this.store.get(event)) !== null && _a !== void 0 ? _a : [];
        callbacks.forEach(callback => {
            callback(arg);
        });
    }
}
