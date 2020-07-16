System.register(["./Canvas2D", "./Vec2"], function (exports_1, context_1) {
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
    var Canvas2D_1, Vec2_1, Text;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Canvas2D_1_1) {
                Canvas2D_1 = Canvas2D_1_1;
            },
            function (Vec2_1_1) {
                Vec2_1 = Vec2_1_1;
            }
        ],
        execute: function () {
            Text = /** @class */ (function (_super) {
                __extends(Text, _super);
                function Text() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Text.prototype.draw = function (config) {
                    var _a = config.text, text = _a === void 0 ? ' ' : _a, bound = config.bound, _b = config.textBaseOffset, textBaseOffset = _b === void 0 ? 'center' : _b, _c = config.top, top = _c === void 0 ? 0 : _c, _d = config.left, left = _d === void 0 ? 0 : _d, _e = config.right, right = _e === void 0 ? 0 : _e, _f = config.bottom, bottom = _f === void 0 ? 0 : _f;
                    var textWidth = this.context.measureText(text).width;
                    var textHeight = this.context.measureText(text[0]).width * 1.2;
                    var startX = bound.startX;
                    var startY = bound.startY;
                    var offsetX;
                    var offsetY;
                    switch (textBaseOffset) {
                        case 'leftTop': {
                            offsetX = left;
                            offsetY = top;
                            this.context.textBaseline = 'top';
                            break;
                        }
                        case 'left': {
                            offsetX = left;
                            offsetY = bound.height / 2;
                            this.context.textBaseline = 'middle';
                            break;
                        }
                        case 'leftBottom': {
                            offsetX = left;
                            offsetY = bound.height;
                            this.context.textBaseline = 'bottom';
                            break;
                        }
                        case 'top': {
                            offsetX = bound.width / 2;
                            offsetY = top;
                            this.context.textBaseline = 'top';
                            this.context.textAlign = 'center';
                            break;
                        }
                        case 'center': {
                            offsetX = bound.width / 2;
                            offsetY = bound.height / 2;
                            this.context.textBaseline = 'middle';
                            this.context.textAlign = 'center';
                            break;
                        }
                        case 'bottom': {
                            offsetX = bound.width / 2;
                            offsetY = bound.height - bottom;
                            this.context.textBaseline = 'bottom';
                            this.context.textAlign = 'center';
                            break;
                        }
                        case 'rightTop': {
                            offsetX = bound.width;
                            offsetY = top;
                            this.context.textBaseline = 'top';
                            this.context.textAlign = 'right';
                            break;
                        }
                        case 'right': {
                            offsetX = bound.width;
                            offsetY = bound.height / 2;
                            this.context.textBaseline = 'middle';
                            this.context.textAlign = 'right';
                            break;
                        }
                        case 'rightBottom': {
                            offsetX = bound.width;
                            offsetY = bound.height;
                            this.context.textBaseline = 'bottom';
                            this.context.textAlign = 'right';
                            break;
                        }
                    }
                    this.context.fillText(text, startX + offsetX, startY + offsetY);
                    return new Vec2_1.default(textWidth, textHeight);
                };
                Text.prototype.render = function (config, style) {
                    _super.prototype.render.call(this, config, style);
                };
                return Text;
            }(Canvas2D_1.default));
            exports_1("default", Text);
        }
    };
});
//# sourceMappingURL=Text.js.map