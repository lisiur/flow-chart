System.register([], function (exports_1, context_1) {
    "use strict";
    var EventBus;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            EventBus = /** @class */ (function () {
                function EventBus() {
                    this.store = new Map();
                }
                EventBus.prototype.on = function (event, callback) {
                    var _a;
                    var callbacks = (_a = this.store.get(event)) !== null && _a !== void 0 ? _a : [];
                    callbacks.push(callback);
                    this.store.set(event, callbacks);
                };
                EventBus.prototype.emit = function (event, arg) {
                    var _a;
                    var callbacks = (_a = this.store.get(event)) !== null && _a !== void 0 ? _a : [];
                    callbacks.forEach(function (callback) {
                        callback(arg);
                    });
                };
                return EventBus;
            }());
            exports_1("default", EventBus);
        }
    };
});
//# sourceMappingURL=EventBus.js.map