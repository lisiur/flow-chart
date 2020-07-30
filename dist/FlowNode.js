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
                    var _a = this.config, text = _a.text, rect = _a.rect, color = _a.color, background = _a.background, _b = _a.fontSize, fontSize = _b === void 0 ? 12 : _b;
                    this.graphNode.render({
                        background: background,
                        rect: rect,
                        color: color,
                        text: text,
                        fontSize: fontSize,
                    });
                };
                FlowNode.prototype.intersect = function (rect) {
                    return this.config.rect.intersect(rect);
                };
                FlowNode.prototype.contains = function (vec) {
                    return this.config.rect.contains(vec);
                };
                return FlowNode;
            }());
            exports_1("default", FlowNode);
        }
    };
});
//# sourceMappingURL=FlowNode.js.map