System.register(["./GraphNode"], function (exports_1, context_1) {
    "use strict";
    var GraphNode_1, FlowNode;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (GraphNode_1_1) {
                GraphNode_1 = GraphNode_1_1;
            }
        ],
        execute: function () {
            FlowNode = /** @class */ (function () {
                function FlowNode(canvas, config, data) {
                    this.config = config;
                    this.data = data;
                    this.graphNode = new GraphNode_1.default(canvas);
                }
                FlowNode.prototype.render = function () {
                    var _a = this.config, text = _a.text, _b = _a.radius, radius = _b === void 0 ? 30 : _b, start = _a.center, color = _a.color, background = _a.background, _c = _a.fontSize, fontSize = _c === void 0 ? 12 : _c;
                    this.graphNode.render({
                        background: background,
                        center: start,
                        radius: radius,
                        color: color,
                        text: text,
                        fontSize: fontSize,
                    });
                };
                FlowNode.prototype.contains = function (vec) {
                    return Math.pow(vec.x - this.config.center.x, 2) + Math.pow(vec.y - this.config.center.y, 2) <= Math.pow(this.config.radius, 2);
                };
                return FlowNode;
            }());
            exports_1("default", FlowNode);
        }
    };
});
//# sourceMappingURL=FlowNode.js.map