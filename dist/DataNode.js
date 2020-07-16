System.register([], function (exports_1, context_1) {
    "use strict";
    var DataNode;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            DataNode = /** @class */ (function () {
                function DataNode(id, label, originData) {
                    this.id = id;
                    this.label = label;
                    this.originData = originData;
                    this.children = new Set();
                    this.parents = new Set();
                }
                return DataNode;
            }());
            exports_1("default", DataNode);
        }
    };
});
//# sourceMappingURL=DataNode.js.map