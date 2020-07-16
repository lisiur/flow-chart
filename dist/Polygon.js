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
    var Canvas2D_1, utils_1, Polygon;
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
            Polygon = /** @class */ (function (_super) {
                __extends(Polygon, _super);
                function Polygon() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Polygon.prototype.draw = function (config) {
                    if (config.points.length < 3)
                        return;
                    var points = config.points.map(function (point) { return utils_1.fixVec2(point); });
                    this.context.beginPath();
                    this.context.moveTo(points[0].x, points[0].y);
                    for (var i = 1; i < points.length; ++i) {
                        this.context.lineTo(points[i].x, points[i].y);
                    }
                    this.context.closePath();
                    this.context.fill();
                };
                Polygon.prototype.render = function (config, style) {
                    _super.prototype.render.call(this, config, style);
                };
                return Polygon;
            }(Canvas2D_1.default));
            exports_1("default", Polygon);
        }
    };
});
//# sourceMappingURL=Polygon.js.map