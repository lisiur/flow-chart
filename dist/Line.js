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
    var Canvas2D_1, utils_1, Line;
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
            Line = /** @class */ (function (_super) {
                __extends(Line, _super);
                function Line() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Line.prototype.draw = function (config) {
                    var start = utils_1.fixVec2(config.start);
                    var end = utils_1.fixVec2(config.end);
                    this.context.beginPath();
                    this.context.moveTo(start.x, start.y);
                    this.context.lineTo(end.x, end.y);
                    this.context.stroke();
                    this.context.fill();
                };
                Line.prototype.render = function (config, style) {
                    _super.prototype.render.call(this, config, style);
                };
                return Line;
            }(Canvas2D_1.default));
            exports_1("default", Line);
        }
    };
});
//# sourceMappingURL=Line.js.map