System.register(["./Vec2", "./DataNode", "./Interaction", "./Rect", "./Layout", "./FlowNode", "./FlowArrow", "mathjs"], function (exports_1, context_1) {
    "use strict";
    var Vec2_1, DataNode_1, Interaction_1, Rect_1, Layout_1, FlowNode_1, FlowArrow_1, mathjs_1, Flow;
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
            function (Layout_1_1) {
                Layout_1 = Layout_1_1;
            },
            function (FlowNode_1_1) {
                FlowNode_1 = FlowNode_1_1;
            },
            function (FlowArrow_1_1) {
                FlowArrow_1 = FlowArrow_1_1;
            },
            function (mathjs_1_1) {
                mathjs_1 = mathjs_1_1;
            }
        ],
        execute: function () {
            Flow = /** @class */ (function () {
                function Flow(canvas, dataList, config) {
                    var _this = this;
                    var _a, _b;
                    this.canvas = canvas;
                    this.config = config;
                    var context = canvas.getContext('2d');
                    if (!context)
                        throw new Error('can not get canvas context');
                    this.context = context;
                    this.flowNodes = [];
                    this.flowArrows = [];
                    this.transformMatrix = mathjs_1.default.matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
                    this.interaction = new Interaction_1.default(canvas, {
                        scale: this.scale.bind(this),
                        translate: this.translate.bind(this)
                    });
                    this.interaction.on('tap', function (event) {
                        _this.flowNodes.forEach(function (flowNode) {
                            if (event.name === 'tap') {
                                var point = mathjs_1.default.transpose(mathjs_1.default.matrix([event.center.x, event.center.y, 1]));
                                var rTransformMatrix = mathjs_1.default.inv(_this.transformMatrix);
                                var originPoint = mathjs_1.default.multiply(rTransformMatrix, point);
                                if (flowNode.contains(new Vec2_1.default(originPoint.get([0]), originPoint.get([1])))) {
                                    if (config.onTapNode) {
                                        config.onTapNode(flowNode.data.originData);
                                    }
                                }
                            }
                        });
                    });
                    var _c = this.canvas, width = _c.width, height = _c.height;
                    this.rect = new Rect_1.default(0, 0, width, height);
                    var _d = this.buildDataTree(dataList), dataTree = _d.root, list = _d.list;
                    var layout = new Layout_1.default(dataTree, {
                        gap: this.config.gap,
                        offsetX: (_a = this.config.offsetX) !== null && _a !== void 0 ? _a : width / 2,
                        offsetY: (_b = this.config.offsetY) !== null && _b !== void 0 ? _b : 0,
                    });
                    dataList.forEach(function (dataItem) {
                        var node = list.get(dataItem.id);
                        var center = layout.getPosition(dataItem.id);
                        _this.flowNodes.push(new FlowNode_1.default(canvas, {
                            background: _this.config.nodeBackground(dataItem.originData),
                            color: _this.config.nodeColor(dataItem.originData),
                            center: center,
                            text: dataItem.label,
                            fontSize: _this.config.fontSize,
                            radius: _this.config.radius,
                        }, dataItem));
                        var parents = Array.from(node.parents);
                        parents.forEach(function (parent) {
                            var position = layout.getPosition(parent.id);
                            _this.flowArrows.push(new FlowArrow_1.default(canvas, {
                                color: _this.config.arrowColor(parent.originData, dataItem.originData),
                                start: position.add(new Vec2_1.default(0, _this.config.radius)),
                                end: center.add(new Vec2_1.default(0, -_this.config.radius)),
                                endAngle: _this.config.endAngle,
                                endBorder: _this.config.endBorder,
                                endHeight: _this.config.endHeight,
                                startRadius: _this.config.startRadius,
                                wrapLength: _this.config.wrapLength
                            }));
                        });
                    });
                }
                Flow.prototype.render = function () {
                    this.context.save();
                    this.context.setTransform(1, 0, 0, 1, 0, 0);
                    var _a = this.rect, x = _a.x, y = _a.y, w = _a.w, h = _a.h;
                    this.context.clearRect(x, y, w, h);
                    this.context.restore();
                    this.flowArrows.forEach(function (flowArrow) { return flowArrow.render(); });
                    this.flowNodes.forEach(function (flowNode) { return flowNode.render(); });
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
                    var translateMatrix = mathjs_1.default.matrix([
                        [1, 0, vec.x],
                        [0, 1, vec.y],
                        [0, 0, 1]
                    ]);
                    var transformMatrix = mathjs_1.default.multiply(translateMatrix, this.transformMatrix);
                    this.transform(transformMatrix);
                };
                Flow.prototype.scale = function (center, delta) {
                    var translateMatrix = mathjs_1.default.matrix([
                        [1, 0, -center.x],
                        [0, 1, -center.y],
                        [0, 0, 1]
                    ]);
                    var scaleMatrix = mathjs_1.default.matrix([
                        [delta, 0, center.x],
                        [0, delta, center.y],
                        [0, 0, 1]
                    ]);
                    var transformMatrix = mathjs_1.default.multiply(mathjs_1.default.multiply(scaleMatrix, translateMatrix), this.transformMatrix);
                    this.transform(transformMatrix);
                    this.render();
                };
                Flow.prototype.buildDataTree = function (dataList) {
                    var map = new Map();
                    var isChildren = new Map();
                    var dataLinkList = [];
                    dataList.forEach(function (dataItem) {
                        var dataNode = new DataNode_1.default(dataItem.id, dataItem.label, dataItem.originData);
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
                    var root = new DataNode_1.default('', '', null);
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