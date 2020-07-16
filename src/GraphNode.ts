import Rect from './Rect'
import Arc from './Arc'
import Text from './Text'
import Vec2 from './Vec2'

export default class GraphNode {
    private circle: Arc
    private text: Text
    constructor(canvas: HTMLCanvasElement) {
        this.circle = new Arc(canvas)
        this.text = new Text(canvas)
    }

    render(config: Config) {
        const { center, text, radius, background, fontSize, color } = config
        this.circle.render({
            angle: new Vec2(0, Math.PI * 2),
            center,
            radius,
        }, {
            fillStyle: background
        })


        const leftTop = center.add(new Vec2(-radius, -radius))
        this.text.render({
            bound: new Rect(
                leftTop.x, leftTop.y,
                radius * 2, radius * 2
            ),
            text,
            textBaseOffset: 'center',
        }, {
            font: `${fontSize}px Microsoft YaHei`,
            fillStyle: color
        })
    }
}

export interface Config {
    text: string
    center: Vec2
    radius: number
    background: string
    color: string
    fontSize: number
}