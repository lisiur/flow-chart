System.register([], function (exports_1, context_1) {
    "use strict";
    var __spreadArrays = (this && this.__spreadArrays) || function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };
    var Vec2;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Vec2 = /** @class */ (function () {
                function Vec2(x, y) {
                    x = x !== null && x !== void 0 ? x : 0;
                    y = y !== null && y !== void 0 ? y : x;
                    this.arr = [x, y];
                }
                Object.defineProperty(Vec2.prototype, 0, {
                    get: function () {
                        return this.arr[0];
                    },
                    set: function (v) {
                        this.arr[0] = v;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(Vec2.prototype, 1, {
                    get: function () {
                        return this.arr[1];
                    },
                    set: function (v) {
                        this.arr[1] = v;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(Vec2.prototype, "x", {
                    get: function () {
                        return this.arr[0];
                    },
                    set: function (v) {
                        this.arr[0] = v;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(Vec2.prototype, "y", {
                    get: function () {
                        return this.arr[1];
                    },
                    set: function (v) {
                        this.arr[1] = v;
                    },
                    enumerable: false,
                    configurable: true
                });
                Vec2.prototype.eachSelf = function (p) {
                    this.x = p(this.x);
                    this.y = p(this.y);
                };
                Vec2.prototype.each = function (p) {
                    return new Vec2(p(this.x), p(this.y));
                };
                Vec2.prototype.add = function (arg) {
                    if (typeof arg === 'number') {
                        arg = new Vec2(arg, arg);
                        return arg.addSelf(this);
                    }
                    else {
                        var arr = this.arr.slice();
                        arr.forEach(function (v, i, s) {
                            s[i] = v + arg.arr[i];
                        });
                        return new Vec2(arr[0], arr[1]);
                    }
                };
                Vec2.prototype.addSelf = function (arg) {
                    if (typeof arg === 'number') {
                        arg = new Vec2(arg);
                    }
                    this.arr.forEach(function (v, i, s) {
                        s[i] = v + arg.arr[i];
                    });
                    return this;
                };
                Vec2.prototype.multiply = function (arg) {
                    if (typeof arg === 'number') {
                        arg = new Vec2(arg);
                    }
                    var arr = this.arr.slice();
                    arr[0] *= arg[0];
                    arr[1] *= arg[1];
                    return new (Vec2.bind.apply(Vec2, __spreadArrays([void 0], arr)))();
                };
                Vec2.prototype.multiplySelf = function (arg) {
                    if (typeof arg === 'number') {
                        arg = new Vec2(arg);
                    }
                    this.arr[0] *= arg[0];
                    this.arr[1] *= arg[1];
                    return this;
                };
                Vec2.prototype.clone = function () {
                    return new Vec2(this.x, this.y);
                };
                return Vec2;
            }());
            exports_1("default", Vec2);
        }
    };
});
//# sourceMappingURL=Vec2.js.map