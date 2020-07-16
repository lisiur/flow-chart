System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function fixPoint(n) {
        return Math.floor(n) + 0.5;
    }
    exports_1("fixPoint", fixPoint);
    function fixVec2(v) {
        return v.each(fixPoint);
    }
    exports_1("fixVec2", fixVec2);
    function dfs(node, callback, level) {
        if (level === void 0) { level = 0; }
        if (node) {
            callback(node, level);
        }
        Array.from(node.children).forEach(function (childNode) {
            dfs(childNode, callback, level + 1);
        });
    }
    exports_1("dfs", dfs);
    function bfs(node, callback, level) {
        if (level === void 0) { level = 0; }
        var queue = [];
        var queueIndex = 0;
        queue.push([0, node]);
        var _loop_1 = function () {
            var _a = queue[queueIndex++], curLevel = _a[0], item = _a[1];
            callback(item, curLevel);
            Array.from(item.children).forEach(function (childNode) {
                queue.push([curLevel + 1, childNode]);
            });
        };
        while (queueIndex < queue.length) {
            _loop_1();
        }
    }
    exports_1("bfs", bfs);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=utils.js.map