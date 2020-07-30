System.register(["./Vec2"], function (exports_1, context_1) {
    "use strict";
    var Vec2_1, Rect;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Vec2_1_1) {
                Vec2_1 = Vec2_1_1;
            }
        ],
        execute: function () {
            Rect = /** @class */ (function () {
                function Rect(x, y, w, h) {
                    this.x = x;
                    this.y = y;
                    this.w = w;
                    this.h = h;
                }
                Object.defineProperty(Rect.prototype, "startX", {
                    get: function () {
                        return this.x;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(Rect.prototype, "startY", {
                    get: function () {
                        return this.y;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(Rect.prototype, "endX", {
                    get: function () {
                        return this.x + this.w;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(Rect.prototype, "endY", {
                    get: function () {
                        return this.y + this.h;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(Rect.prototype, "width", {
                    get: function () {
                        return this.w;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(Rect.prototype, "height", {
                    get: function () {
                        return this.h;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(Rect.prototype, "start", {
                    get: function () {
                        return new Vec2_1.default(this.x, this.y);
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(Rect.prototype, "end", {
                    get: function () {
                        return new Vec2_1.default(this.endX, this.endY);
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(Rect.prototype, "startMirror", {
                    get: function () {
                        return new Vec2_1.default(this.x, this.endY);
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(Rect.prototype, "endMirror", {
                    get: function () {
                        return new Vec2_1.default(this.endX, this.y);
                    },
                    enumerable: false,
                    configurable: true
                });
                Rect.prototype.combine = function (rect) {
                    var _a = this, startX = _a.startX, startY = _a.startY, endX = _a.endX, endY = _a.endY;
                    var newStartX = rect.startX, newStartY = rect.startY, newEndX = rect.endX, newEndY = rect.endY;
                    startX = Math.min(startX, newStartX);
                    startY = Math.min(startY, newStartY);
                    endX = Math.max(endX, newEndX);
                    endY = Math.max(endY, newEndY);
                    return new Rect(startX, startY, endX - startX, endY - startY);
                };
                Rect.prototype.offset = function (vec) {
                    return new Rect(this.x + vec.x, this.y + vec.y, this.w, this.h);
                };
                Rect.prototype.within = function (rect) {
                    return this.x >= rect.x && this.endX <= rect.endX && this.y >= rect.y && this.y <= rect.endY;
                };
                Rect.prototype.cover = function (rect) {
                    return rect.within(this);
                };
                Rect.prototype.intersect = function (rect) {
                    return !(this.endX < rect.x || this.x > rect.endX || this.y > rect.endY || this.endY < rect.y);
                };
                Rect.prototype.contains = function (vec) {
                    return vec.x >= this.x && vec.x <= this.endX && vec.y >= this.y && vec.y <= this.endY;
                };
                Rect.prototype.clone = function () {
                    return new Rect(this.x, this.y, this.w, this.h);
                };
                return Rect;
            }());
            exports_1("default", Rect);
        }
    };
});
//# sourceMappingURL=Rect.js.map