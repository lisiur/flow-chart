System.register([], function (exports_1, context_1) {
    "use strict";
    var Axis;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Axis = /** @class */ (function () {
                function Axis(rect) {
                    this.origin = rect.clone();
                    this.bounds = rect.clone();
                }
                Axis.prototype.move = function (vec) {
                };
                Axis.prototype.scale = function (vec, dRatio) {
                };
                Axis.prototype.translate = function (vec) {
                };
                return Axis;
            }());
            exports_1("default", Axis);
        }
    };
});
//# sourceMappingURL=Axis.js.map