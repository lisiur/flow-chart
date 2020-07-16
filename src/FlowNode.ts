import Vec2 from "./Vec2"
import GraphNode from './GraphNode'

export default class FlowNode<T> {
    private graphNode: GraphNode
    constructor(canvas: HTMLCanvasElement, public config: Config, public data: T) {
        this.graphNode = new GraphNode(canvas)
    }

    render() {
        const {text, radius = 30, center: start, color, background, fontSize = 12} = this.config
        this.graphNode.render({
            background,
            center: start,
            radius,
            color,
            text,
            fontSize,
        })
    }

    contains(vec: Vec2) {
        return Math.pow(vec.x - this.config.center.x, 2) + Math.pow(vec.y - this.config.center.y, 2) <= Math.pow(this.config.radius, 2)
    }
}

export interface Config {
    text: string
    center: Vec2
    radius: number
    color: string
    background: string
    fontSize?: number
}