System.register(["./Vec2", "./DataNode", "./Interaction", "./Rect", "./FlowNode", "./FlowArrow", "mathjs"], function (exports_1, context_1) {
    "use strict";
    var Vec2_1, DataNode_1, Interaction_1, Rect_1, FlowNode_1, FlowArrow_1, math, Flow;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Vec2_1_1) {
                Vec2_1 = Vec2_1_1;
            },
            function (DataNode_1_1) {
                DataNode_1 = DataNode_1_1;
            },
            function (Interaction_1_1) {
                Interaction_1 = Interaction_1_1;
            },
            function (Rect_1_1) {
                Rect_1 = Rect_1_1;
            },
            function (FlowNode_1_1) {
                FlowNode_1 = FlowNode_1_1;
            },
            function (FlowArrow_1_1) {
                FlowArrow_1 = FlowArrow_1_1;
            },
            function (math_1) {
                math = math_1;
            }
        ],
        execute: function () {
            // import math from 'mathjs'
            Flow = /** @class */ (function () {
                function Flow(canvas, dataList, config) {
                    var _this = this;
                    this.canvas = canvas;
                    this.config = config;
                    var context = canvas.getContext('2d');
                    if (!context)
                        throw new Error('can not get canvas context');
                    this.context = context;
                    this.flowNodes = [];
                    this.flowArrows = [];
                    this.transformMatrix = math.matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
                    this.interaction = new Interaction_1.default(canvas, {
                        scale: this.scale.bind(this),
                        translate: this.translate.bind(this)
                    });
                    this.interaction.on('tap', function (event) {
                        _this.flowNodes.forEach(function (flowNode) {
                            if (event.name === 'tap') {
                                var point = math.transpose(math.matrix([event.center.x, event.center.y, 1]));
                                var rTransformMatrix = math.inv(_this.transformMatrix);
                                var originPoint = math.multiply(rTransformMatrix, point);
                                if (flowNode.contains(new Vec2_1.default(originPoint.get([0]), originPoint.get([1])))) {
                                    if (config.onTapNode) {
                                        config.onTapNode(flowNode.data.originData);
                                    }
                                }
                            }
                        });
                    });
                    var _a = this.canvas, width = _a.width, height = _a.height;
                    this.rect = new Rect_1.default(0, 0, width, height);
                    this.maxRect = new Rect_1.default(0, 0, width, height);
                    var _b = this.buildDataTree(dataList), dataTree = _b.root, list = _b.list;
                    var rootPosition = Array.from(dataTree.children)[0].position;
                    var realPosition = this.getPosition(rootPosition.x, rootPosition.y, true);
                    this.offset = new Vec2_1.default(width / 2 - realPosition.x, 0);
                    var maxLabelLength = 0;
                    dataList.forEach(function (dataItem) {
                        maxLabelLength = Math.max(maxLabelLength, dataItem.label.length);
                    });
                    var labelWidth = this.config.width || ((this.config.fontSize || 12) * maxLabelLength + 4);
                    var labelHeight = (this.config.fontSize || 12) + 16;
                    // const layout = new Layout(dataTree, {
                    //     gap: this.config.gap || new Vec2(labelWidth, labelHeight * 3),
                    //     offsetX: this.config.offsetX ?? width / 2,
                    //     offsetY: this.config.offsetY ?? 0,
                    // })
                    dataList.forEach(function (dataItem) {
                        var node = list.get(dataItem.id);
                        // const center = layout.getPosition(dataItem.id) as Vec2
                        var center = _this.getPosition(dataItem.x, dataItem.y);
                        var flowNode = new FlowNode_1.default(canvas, {
                            background: _this.config.nodeBackground(dataItem.originData),
                            color: _this.config.nodeColor(dataItem.originData),
                            rect: new Rect_1.default(center.x - labelWidth / 2, center.y - labelHeight / 2, labelWidth, labelHeight),
                            text: dataItem.label,
                            fontSize: _this.config.fontSize,
                        }, dataItem);
                        _this.flowNodes.push(flowNode);
                        _this.maxRect = _this.maxRect.combine(flowNode.config.rect);
                        var parents = Array.from(node.parents);
                        parents.forEach(function (parent) {
                            // const position = layout.getPosition(parent.id)
                            // position.x = parent.position?.y * 2
                            // position.y = parent.position?.x
                            var position = _this.getPosition(parent.position.x, parent.position.y);
                            _this.flowArrows.push(new FlowArrow_1.default(canvas, {
                                color: _this.config.arrowColor(parent.originData, dataItem.originData),
                                start: position.add(new Vec2_1.default(0, labelHeight / 2)),
                                end: center.add(new Vec2_1.default(0, -labelHeight / 2)),
                                endAngle: _this.config.endAngle,
                                endBorder: _this.config.endBorder,
                                endHeight: _this.config.endHeight,
                                startRadius: _this.config.startRadius,
                                wrapLength: _this.config.wrapLength
                            }));
                        });
                    });
                }
                Flow.prototype.getPosition = function (x, y, noOffset) {
                    if (noOffset === void 0) { noOffset = false; }
                    if (noOffset) {
                        return new Vec2_1.default(x * 2, y);
                    }
                    else {
                        return new Vec2_1.default(x * 2, y).add(this.offset);
                    }
                };
                Flow.prototype.render = function () {
                    this.context.save();
                    this.context.setTransform(1, 0, 0, 1, 0, 0);
                    var _a = this.rect, x = _a.x, y = _a.y, w = _a.w, h = _a.h;
                    this.context.clearRect(x, y, w, h);
                    this.context.restore();
                    var rTransformMatrix = math.inv(this.transformMatrix);
                    var start = math.multiply(rTransformMatrix, math.transpose(math.matrix([0, 0, 1])));
                    var end = math.multiply(rTransformMatrix, math.transpose(math.matrix([this.canvas.width, this.canvas.height, 1])));
                    var rect = new Rect_1.default(start.get([0]), start.get([1]), end.get([0]) - start.get([0]), end.get([1]) - start.get([1]));
                    this.flowArrows.forEach(function (flowArrow) {
                        flowArrow.render();
                    });
                    this.flowNodes.forEach(function (flowNode) {
                        if (flowNode.intersect(rect)) {
                            flowNode.render();
                        }
                    });
                    // @ts-ignore for uni-app
                    if (this.context.draw)
                        this.context.draw();
                };
                Flow.prototype.transform = function (matrix) {
                    this.transformMatrix = matrix;
                    this.context.setTransform(this.transformMatrix.get([0, 0]), this.transformMatrix.get([0, 1]), this.transformMatrix.get([1, 0]), this.transformMatrix.get([1, 1]), this.transformMatrix.get([0, 2]), this.transformMatrix.get([1, 2]));
                    this.render();
                };
                Flow.prototype.translate = function (vec) {
                    var translateMatrix = math.matrix([
                        [1, 0, vec.x],
                        [0, 1, vec.y],
                        [0, 0, 1]
                    ]);
                    var transformMatrix = math.multiply(translateMatrix, this.transformMatrix);
                    this.transform(transformMatrix);
                };
                Flow.prototype.scale = function (center, delta) {
                    var translateMatrix = math.matrix([
                        [1, 0, -center.x],
                        [0, 1, -center.y],
                        [0, 0, 1]
                    ]);
                    var scaleMatrix = math.matrix([
                        [delta, 0, center.x],
                        [0, delta, center.y],
                        [0, 0, 1]
                    ]);
                    var transformMatrix = math.multiply(math.multiply(scaleMatrix, translateMatrix), this.transformMatrix);
                    this.transform(transformMatrix);
                    this.render();
                };
                Flow.prototype.buildDataTree = function (dataList) {
                    var map = new Map();
                    var isChildren = new Map();
                    var dataLinkList = [];
                    dataList.forEach(function (dataItem) {
                        var dataNode = new DataNode_1.default(dataItem.id, dataItem.label, dataItem.originData, new Vec2_1.default(dataItem.x, dataItem.y));
                        map.set(dataItem.id, dataNode);
                        dataItem.children.forEach(function (id) {
                            isChildren.set(id, true);
                        });
                    });
                    dataList.forEach(function (dataItem) {
                        var dataNode = map.get(dataItem.id);
                        if (!isChildren.has(dataItem.id)) {
                            dataLinkList.push(dataNode);
                        }
                        dataItem.children.forEach(function (id) {
                            var node = map.get(id);
                            dataNode.children.add(node);
                            node.parents.add(dataNode);
                        });
                    });
                    var root = new DataNode_1.default('', '', null, new Vec2_1.default(0, 0));
                    dataLinkList.forEach(function (dataNode) {
                        root.children.add(dataNode);
                    });
                    return {
                        root: root,
                        list: map,
                    };
                };
                return Flow;
            }());
            exports_1("default", Flow);
        }
    };
});
//# sourceMappingURL=Flow.js.map