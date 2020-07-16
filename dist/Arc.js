System.register(["./Canvas2D", "./utils"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var Canvas2D_1, utils_1, Arc;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Canvas2D_1_1) {
                Canvas2D_1 = Canvas2D_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
            Arc = /** @class */ (function (_super) {
                __extends(Arc, _super);
                function Arc() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Arc.prototype.draw = function (config) {
                    var center = config.center, radius = config.radius, _a = config.angle, angleStart = _a.x, angleEnd = _a.y;
                    var _b = utils_1.fixVec2(center), x = _b.x, y = _b.y;
                    this.context.beginPath();
                    this.context.arc(x, y, radius, angleStart, angleEnd);
                    this.context.fill();
                };
                Arc.prototype.render = function (config, style) {
                    _super.prototype.render.call(this, config, style);
                };
                return Arc;
            }(Canvas2D_1.default));
            exports_1("default", Arc);
        }
    };
});
//# sourceMappingURL=Arc.js.map