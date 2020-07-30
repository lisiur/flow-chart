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

    intersect(rect: Rect) {
        return this.config.rect.intersect(rect)
    }

    contains(vec: Vec2) {
        return this.config.rect.contains(vec)
    }
}

export interface Config {
    text: string
    rect: Rect
    color: string
    background: string
    fontSize?: number
}