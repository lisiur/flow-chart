System.register(["./GraphArrow"], function (exports_1, context_1) {
    "use strict";
    var GraphArrow_1, FlowNode;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (GraphArrow_1_1) {
                GraphArrow_1 = GraphArrow_1_1;
            }
        ],
        execute: function () {
            FlowNode = /** @class */ (function () {
                function FlowNode(canvas, config) {
                    this.config = config;
                    this.graphArrow = new GraphArrow_1.default(canvas);
                }
                FlowNode.prototype.render = function (config) {
                    this.config = config !== null && config !== void 0 ? config : this.config;
                    var _a = this.config, start = _a.start, end = _a.end, color = _a.color, _b = _a.endBorder, endBorder = _b === void 0 ? 5 : _b, _c = _a.startRadius, startRadius = _c === void 0 ? 5 : _c, _d = _a.endAngle, endAngle = _d === void 0 ? Math.PI / 2 : _d, _e = _a.endHeight, endHeight = _e === void 0 ? 10 : _e, _f = _a.wrapLength, wrapLength = _f === void 0 ? 20 : _f;
                    this.graphArrow.render({
                        color: color,
                        start: start,
                        startRadius: startRadius,
                        end: end,
                        endAngle: endAngle,
                        endBorder: endBorder,
                        endHeight: endHeight,
                        wrapLength: wrapLength,
                    });
                };
                return FlowNode;
            }());
            exports_1("default", FlowNode);
        }
    };
});
//# sourceMappingURL=FlowArrow.js.map