import Vec2 from "./Vec2"
import GraphNode from './GraphNode'
import Rect from "./Rect"

export default class FlowNode<T> {
    private graphNode: GraphNode
    constructor(canvas: HTMLCanvasElement, public config: Config, public data: T) {
        this.graphNode = new GraphNode(canvas)
    }

    render() {
        const { text, rect, color, background, fontSize = 12 } = this.config
        this.graphNode.render({
            background,
            rect,
            color,
            text,
            fontSize,
        })
    }

    contains(vec: Vec2) {
        return vec.x >= this.config.rect.x && vec.x <= this.config.rect.endX && vec.y >= this.config.rect.y && vec.y <= this.config.rect.endY
    }
}

export interface Config {
    text: string
    rect: Rect
    color: string
    background: string
    fontSize?: number
}