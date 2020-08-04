import Vec2 from "./Vec2"
import GraphArrow from "./GraphArrow"
import Rect from "./Rect"

export default class FlowNode {
    private graphArrow: GraphArrow
    private rect: Rect
    constructor(canvas: HTMLCanvasElement, public config: Config) {
        this.graphArrow = new GraphArrow(canvas)
        let minX = Math.min(this.config.start.x, this.config.end.x)
        let minY = Math.min(this.config.start.y, this.config.end.y)
        let maxX = Math.max(this.config.start.x, this.config.end.x)
        let maxY = Math.max(this.config.start.y, this.config.end.y)
        this.rect = new Rect(minX, minY, maxX - minX, maxY - minY)
    }

    render() {
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

    intersect(rect: Rect) {
        return this.rect.intersect(rect)
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