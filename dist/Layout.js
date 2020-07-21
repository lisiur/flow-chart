System.register(["./Vec2", "./utils"], function (exports_1, context_1) {
    "use strict";
    var Vec2_1, utils_1, Layout;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Vec2_1_1) {
                Vec2_1 = Vec2_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
            Layout = /** @class */ (function () {
                function Layout(root, config) {
                    var _a, _b;
                    this.root = root;
                    this.config = config;
                    this.start = new Vec2_1.default((_a = this.config.offsetX) !== null && _a !== void 0 ? _a : 0, (_b = this.config.offsetY) !== null && _b !== void 0 ? _b : 0);
                    var _c = this.calcPosition(this.root), positionMap = _c.positionMap, minRange = _c.minRange;
                    this.positionMap = positionMap;
                    this.minRange = minRange;
                }
                Layout.prototype.getPosition = function (id) {
                    var _a;
                    var gap = this.config.gap;
                    return ((_a = this.positionMap.get(id)) !== null && _a !== void 0 ? _a : new Vec2_1.default(0, 0))
                        .multiply(gap
                        .multiply(new Vec2_1.default(1 / this.minRange, 1)
                        .add(new Vec2_1.default(1, 0))))
                        .add(this.start);
                };
                Layout.prototype.calcPosition = function (node, rangeMap, positionMap) {
                    if (rangeMap === void 0) { rangeMap = new Map(); }
                    if (positionMap === void 0) { positionMap = new Map(); }
                    rangeMap.set(node.id, new Vec2_1.default(-1, 1));
                    positionMap.set(node.id, new Vec2_1.default(0, 0));
                    var scaleList = [];
                    var visitedMap = new Map();
                    scaleList.push(1);
                    var minRange = 2;
                    utils_1.bfs(node, function (item, level) {
                        if (Array.from(item.children).length === 0)
                            return;
                        var itemRange = rangeMap.get(item.id);
                        if (!itemRange)
                            return;
                        minRange = Math.min(itemRange[1] - itemRange[0], minRange);
                        var childLength = Array.from(item.children).length;
                        var childRangeLength = (itemRange[1] - itemRange[0]) / childLength;
                        visitedMap.set(item.id, true);
                        Array.from(item.children).forEach(function (child, index) {
                            var parents = Array.from(child.parents);
                            var parentsAllViewed = parents.every(function (parent) { return !!visitedMap.get(parent.id); });
                            if (parentsAllViewed) {
                                if (parents.length > 1) {
                                    var min_1 = Infinity;
                                    var max_1 = -Infinity;
                                    var sum = parents.reduce(function (sum, node) {
                                        var pos = positionMap.get(node.id);
                                        min_1 = Math.min(min_1, pos.x);
                                        max_1 = Math.max(max_1, pos.x);
                                        return sum.add(pos);
                                    }, new Vec2_1.default(0, 0));
                                    var pos = sum.multiply(1 / parents.length);
                                    positionMap.set(child.id, new Vec2_1.default(pos.x, level));
                                    rangeMap.set(child.id, new Vec2_1.default(min_1, max_1));
                                }
                                else {
                                    rangeMap.set(child.id, new Vec2_1.default(itemRange[0] + index * childRangeLength, itemRange[0] + (index + 1) * childRangeLength));
                                    positionMap.set(child.id, new Vec2_1.default(itemRange[0] + (index + 0.5) * childRangeLength, level));
                                }
                            }
                        });
                    });
                    return { positionMap: positionMap, minRange: minRange };
                };
                return Layout;
            }());
            exports_1("default", Layout);
        }
    };
});
//# sourceMappingURL=Layout.js.map