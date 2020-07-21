import dataList from './data3'
import Flow from './Flow'

const canvas = document.getElementById('gantt') as HTMLCanvasElement
if (!canvas) {
    throw new Error('no canvas')
}

const flow = new Flow(canvas, dataList, {
    nodeBackground(data) {
        // if (data.id === '1') {
            return 'red'
        // } else {
        //     return 'green'
        // }
    },
    nodeColor(data) {
        return 'white'
    },
    arrowColor(start, end) {
        // if (start.id === '1') {
        //     return 'red'
        // } else {
            return 'green'
        // }
    },
    onTapNode(data) {
        alert(data.id)
    },
})
flow.render()