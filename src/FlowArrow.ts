import Vec2 from "./Vec2"
import GraphArrow from "./GraphArrow"

export default class FlowNode {
    private graphArrow: GraphArrow
    constructor(canvas: HTMLCanvasElement, public config: Config) {
        this.graphArrow = new GraphArrow(canvas)
    }

    render(config?: Config) {
        this.config = config ?? this.config
        const { start, end, color, endBorder = 5, startRadius = 5, endAngle = Math.PI / 2, endHeight = 10, wrapLength = 20 } = this.config
        this.graphArrow.render({
            color,
            start,
            startRadius,
            end,
            endAngle,
            endBorder,
            endHeight,
            wrapLength,
        })
    }
}

export interface Config {
    start: Vec2
    end: Vec2
    color: string
    startRadius?: number
    endAngle?: number
    endBorder?: number
    endHeight?: number
    wrapLength?: number
}