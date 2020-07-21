System.register([], function (exports_1, context_1) {
    "use strict";
    var __assign = (this && this.__assign) || function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    var Canvas2D;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Canvas2D = /** @class */ (function () {
                function Canvas2D(canvas) {
                    this.canvas = canvas;
                    this.canvas = canvas;
                    var context = this.canvas.getContext('2d');
                    if (!context) {
                        throw new Error('can not get context from canvas');
                    }
                    this.context = context;
                    this.scaleRatio = 1;
                    // || window.devicePixelRatio
                }
                Canvas2D.prototype.render = function (config, style) {
                    this.context.save();
                    this.setStyle(style);
                    var ret = this.draw(config);
                    this.context.restore();
                    return ret;
                };
                Canvas2D.prototype.getStyle = function (style) {
                    return __assign({ fillStyle: '#000', strokeStyle: '#000', lineWidth: 1, textAlign: 'start', direction: 'inherit', textBaseline: 'alphabetic', font: '13px Microsoft YaHei', lineJoin: 'bevel' }, style);
                };
                Canvas2D.prototype.setStyle = function (style) {
                    var contextStyle = this.getStyle(style);
                    // @ts-ignore
                    if (this.context.setFillStyle)
                        this.context.setFillStyle(contextStyle.fillStyle);
                    else
                        this.context.fillStyle = contextStyle.fillStyle;
                    // @ts-ignore
                    if (this.context.setStrokeStyle)
                        this.context.setStrokeStyle(contextStyle.strokeStyle);
                    else
                        this.context.strokeStyle = contextStyle.strokeStyle;
                    // @ts-ignore
                    if (this.context.setLineWidth)
                        this.context.setLineWidth(contextStyle.lineWidth);
                    else
                        this.context.lineWidth = contextStyle.lineWidth;
                    this.context.font = contextStyle.font;
                    // @ts-ignore
                    if (this.context.setTextBaseline)
                        this.context.setTextBaseline(contextStyle.textBaseline);
                    else
                        this.context.textBaseline = contextStyle.textBaseline;
                    // @ts-ignore
                    if (this.context.setTextAlign)
                        this.context.setTextAlign(contextStyle.textAlign);
                    else
                        this.context.textAlign = contextStyle.textAlign;
                };
                return Canvas2D;
            }());
            exports_1("default", Canvas2D);
        }
    };
});
//# sourceMappingURL=Canvas2D.js.map