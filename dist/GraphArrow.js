System.register(["./Arc", "./Polygon", "./Polyline", "./Vec2"], function (exports_1, context_1) {
    "use strict";
    var Arc_1, Polygon_1, Polyline_1, Vec2_1, GraphArrow;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Arc_1_1) {
                Arc_1 = Arc_1_1;
            },
            function (Polygon_1_1) {
                Polygon_1 = Polygon_1_1;
            },
            function (Polyline_1_1) {
                Polyline_1 = Polyline_1_1;
            },
            function (Vec2_1_1) {
                Vec2_1 = Vec2_1_1;
            }
        ],
        execute: function () {
            GraphArrow = /** @class */ (function () {
                function GraphArrow(canvas) {
                    this.startCircle = new Arc_1.default(canvas);
                    this.endTriangle = new Polygon_1.default(canvas);
                    this.endTriangleWrapper = new Polygon_1.default(canvas);
                    this.polyline = new Polyline_1.default(canvas);
                }
                GraphArrow.prototype.render = function (config) {
                    var color = config.color, start = config.start, end = config.end, startRadius = config.startRadius, endAngle = config.endAngle, endHeight = config.endHeight, endBorder = config.endBorder, wrapLength = config.wrapLength;
                    // draw start circle
                    this.startCircle.render({
                        center: start,
                        angle: new Vec2_1.default(0, Math.PI * 2),
                        radius: startRadius,
                    }, {
                        fillStyle: color
                    });
                    // draw end arrow
                    var deltaH = endHeight;
                    var deltaW = deltaH / Math.tan(Math.PI / 2 - endAngle / 2);
                    var leftPoint = new Vec2_1.default(end.x - deltaW, end.y - deltaH);
                    var rightPoint = new Vec2_1.default(end.x + deltaW, end.y - deltaH);
                    var points = [end, rightPoint, leftPoint];
                    this.endTriangleWrapper.render({
                        points: points.map(function (point) { return point.add(new Vec2_1.default(0, endBorder)); })
                    }, {
                        fillStyle: 'white'
                    });
                    this.endTriangle.render({
                        points: points,
                    }, {
                        fillStyle: color
                    });
                    // draw line
                    // const startWrapPoint = start.add(new Vec2(0, wrapLength))
                    // const endWrapPoint = end.add(new Vec2(0, -(end.y - start.y - wrapLength)))
                    var startWrapPoint = start.add(new Vec2_1.default(0, end.y - start.y - wrapLength));
                    var endWrapPoint = end.add(new Vec2_1.default(0, -wrapLength));
                    var linePoints = [start, startWrapPoint, endWrapPoint, end];
                    this.polyline.render({
                        points: linePoints
                    }, {
                        strokeStyle: color
                    });
                };
                return GraphArrow;
            }());
            exports_1("default", GraphArrow);
        }
    };
});
//# sourceMappingURL=GraphArrow.js.map