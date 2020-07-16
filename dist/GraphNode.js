System.register(["./Rect", "./Arc", "./Text", "./Vec2"], function (exports_1, context_1) {
    "use strict";
    var Rect_1, Arc_1, Text_1, Vec2_1, GraphNode;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Rect_1_1) {
                Rect_1 = Rect_1_1;
            },
            function (Arc_1_1) {
                Arc_1 = Arc_1_1;
            },
            function (Text_1_1) {
                Text_1 = Text_1_1;
            },
            function (Vec2_1_1) {
                Vec2_1 = Vec2_1_1;
            }
        ],
        execute: function () {
            GraphNode = /** @class */ (function () {
                function GraphNode(canvas) {
                    this.circle = new Arc_1.default(canvas);
                    this.text = new Text_1.default(canvas);
                }
                GraphNode.prototype.render = function (config) {
                    var center = config.center, text = config.text, radius = config.radius, background = config.background, fontSize = config.fontSize, color = config.color;
                    this.circle.render({
                        angle: new Vec2_1.default(0, Math.PI * 2),
                        center: center,
                        radius: radius,
                    }, {
                        fillStyle: background
                    });
                    var leftTop = center.add(new Vec2_1.default(-radius, -radius));
                    this.text.render({
                        bound: new Rect_1.default(leftTop.x, leftTop.y, radius * 2, radius * 2),
                        text: text,
                        textBaseOffset: 'center',
                    }, {
                        font: fontSize + "px Microsoft YaHei",
                        fillStyle: color
                    });
                };
                return GraphNode;
            }());
            exports_1("default", GraphNode);
        }
    };
});
//# sourceMappingURL=GraphNode.js.map