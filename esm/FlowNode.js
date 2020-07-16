import GraphNode from './GraphNode';
export default class FlowNode {
    constructor(canvas, config, data) {
        this.config = config;
        this.data = data;
        this.graphNode = new GraphNode(canvas);
        this.radius = 30;
    }
    render() {
        const { text, center: start, color, background } = this.config;
        this.graphNode.render({
            background,
            center: start,
            radius: this.radius,
            color: color,
            text,
            fontSize: 10,
        });
    }
    contains(vec) {
        return Math.pow(vec.x - this.config.center.x, 2) + Math.pow(vec.y - this.config.center.y, 2) <= Math.pow(this.radius, 2);
    }
}
