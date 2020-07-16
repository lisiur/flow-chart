import GraphArrow from "./GraphArrow";
export default class FlowNode {
    constructor(canvas, config) {
        this.config = config;
        this.graphArrow = new GraphArrow(canvas);
    }
    render(config) {
        this.config = config !== null && config !== void 0 ? config : this.config;
        const { start, end, color } = this.config;
        this.graphArrow.render({
            color,
            start,
            startRadius: 5,
            end,
            endAngle: Math.PI / 2,
            endBorder: 5,
            endHeight: 10,
            wrapLength: 50,
        });
    }
}
