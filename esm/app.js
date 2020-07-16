import dataList from './data';
import Flow from './Flow';
const canvas = document.getElementById('gantt');
if (!canvas) {
    throw new Error('no canvas');
}
const flow = new Flow(canvas, dataList, {
    nodeBackground(data) {
        if (data.id === '1') {
            return 'red';
        }
        else {
            return 'green';
        }
    },
    nodeColor(data) {
        return 'white';
    },
    arrowColor(start, end) {
        if (start.id === '1') {
            return 'red';
        }
        else {
            return 'green';
        }
    }
});
flow.render();
