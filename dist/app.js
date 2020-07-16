System.register(["./data", "./Flow"], function (exports_1, context_1) {
    "use strict";
    var data_1, Flow_1, canvas, flow;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (data_1_1) {
                data_1 = data_1_1;
            },
            function (Flow_1_1) {
                Flow_1 = Flow_1_1;
            }
        ],
        execute: function () {
            canvas = document.getElementById('gantt');
            if (!canvas) {
                throw new Error('no canvas');
            }
            flow = new Flow_1.default(canvas, data_1.default, {
                nodeBackground: function (data) {
                    if (data.id === '1') {
                        return 'red';
                    }
                    else {
                        return 'green';
                    }
                },
                nodeColor: function (data) {
                    return 'white';
                },
                arrowColor: function (start, end) {
                    if (start.id === '1') {
                        return 'red';
                    }
                    else {
                        return 'green';
                    }
                },
                onTapNode: function (data) {
                    alert(data.id);
                },
                radius: 30,
            });
            flow.render();
        }
    };
});
//# sourceMappingURL=app.js.map