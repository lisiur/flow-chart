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
                    this.positionMap = this.calcPosition(this.root);
                }
                Layout.prototype.getPosition = function (id) {
                    var _a;
                    var gap = this.config.gap || Layout.Gap;
                    return ((_a = this.positionMap.get(id)) !== null && _a !== void 0 ? _a : new Vec2_1.default(0, 0)).multiply(gap).add(this.start);
                };
                Layout.prototype.calcPosition = function (node, rangeMap, positionMap) {
                    if (rangeMap === void 0) { rangeMap = new Map(); }
                    if (positionMap === void 0) { positionMap = new Map(); }
                    rangeMap.set(node.id, new Vec2_1.default(-1, 1));
                    positionMap.set(node.id, new Vec2_1.default(0, 0));
                    var scaleList = [];
                    var visitedMap = new Map();
                    scaleList.push(1);
                    utils_1.bfs(node, function (item, level) {
                        if (Array.from(item.children).length === 0)
                            return;
                        var itemRange = rangeMap.get(item.id);
                        var childLength = Array.from(item.children).length;
                        var childRangeLength = (itemRange[1] - itemRange[0]) / childLength;
                        visitedMap.set(item.id, true);
                        Array.from(item.children).forEach(function (child, index) {
                            var parents = Array.from(child.parents);
                            var parentsAllViewed = parents.every(function (parent) { return !!visitedMap.get(parent.id); });
                            if (parentsAllViewed) {
                                if (parents.length > 1) {
                                    var firstParent = positionMap.get(parents[0].id);
                                    var lastParent = positionMap.get(parents[1].id);
                                    positionMap.set(child.id, new Vec2_1.default((firstParent.x + lastParent.x) / 2, level));
                                    rangeMap.set(child.id, new Vec2_1.default(firstParent.x, lastParent.x));
                                }
                                else {
                                    rangeMap.set(child.id, new Vec2_1.default(itemRange[0] + index * childRangeLength, itemRange[0] + (index + 1) * childRangeLength));
                                    positionMap.set(child.id, new Vec2_1.default(itemRange[0] + (index + 0.5) * childRangeLength, level));
                                }
                            }
                        });
                    });
                    return positionMap;
                };
                Layout.Gap = 130;
                return Layout;
            }());
            exports_1("default", Layout);
        }
    };
});
//# sourceMappingURL=Layout.js.map