System.register(["./Rect", "./Arc", "./Text", "./Vec2", "./Rectangle"], function (exports_1, context_1) {
    "use strict";
    var Rect_1, Arc_1, Text_1, Vec2_1, Rectangle_1, GraphNode;
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
            },
            function (Rectangle_1_1) {
                Rectangle_1 = Rectangle_1_1;
            }
        ],
        execute: function () {
            GraphNode = /** @class */ (function () {
                function GraphNode(canvas) {
                    this.circle = new Arc_1.default(canvas);
                    this.rectangles = [new Rectangle_1.default(canvas), new Rectangle_1.default(canvas), new Rectangle_1.default(canvas)];
                    this.text = new Text_1.default(canvas);
                    this.borders = [new Arc_1.default(canvas), new Arc_1.default(canvas), new Arc_1.default(canvas), new Arc_1.default(canvas)];
                }
                GraphNode.prototype.render = function (config) {
                    var rect = config.rect, text = config.text, background = config.background, fontSize = config.fontSize, color = config.color, _a = config.borderRadius, borderRadius = _a === void 0 ? 6 : _a;
                    var topRect = new Rect_1.default(rect.startX + borderRadius, rect.startY, rect.width - borderRadius * 2, borderRadius);
                    var middleRect = new Rect_1.default(rect.startX, rect.startY + borderRadius, rect.width, rect.height - borderRadius * 2);
                    var bottomRect = new Rect_1.default(rect.startX + borderRadius, rect.endY - borderRadius, rect.width - borderRadius * 2, borderRadius);
                    this.rectangles[0].render({
                        rect: topRect,
                    }, {
                        fillStyle: background
                    });
                    this.rectangles[1].render({
                        rect: middleRect,
                    }, {
                        fillStyle: background
                    });
                    this.rectangles[2].render({
                        rect: bottomRect,
                    }, {
                        fillStyle: background
                    });
                    this.borders[0].render({
                        center: rect.start.add(new Vec2_1.default(borderRadius, borderRadius)),
                        angle: new Vec2_1.default(0, Math.PI * 2),
                        radius: borderRadius,
                    }, {
                        fillStyle: background
                    });
                    this.borders[1].render({
                        center: rect.endMirror.add(new Vec2_1.default(-borderRadius, borderRadius)),
                        angle: new Vec2_1.default(0, Math.PI * 2),
                        radius: borderRadius,
                    }, {
                        fillStyle: background
                    });
                    this.borders[2].render({
                        center: rect.end.add(new Vec2_1.default(-borderRadius, -borderRadius)),
                        angle: new Vec2_1.default(0, Math.PI * 2),
                        radius: borderRadius,
                    }, {
                        fillStyle: background
                    });
                    this.borders[3].render({
                        center: rect.startMirror.add(new Vec2_1.default(borderRadius, -borderRadius)),
                        angle: new Vec2_1.default(0, Math.PI * 2),
                        radius: borderRadius,
                    }, {
                        fillStyle: background
                    });
                    this.text.render({
                        bound: rect.offset(new Vec2_1.default(0, 2)),
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