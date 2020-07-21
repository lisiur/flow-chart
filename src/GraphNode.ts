import Rect from './Rect'
import Arc from './Arc'
import Text from './Text'
import Vec2 from './Vec2'
import Rectangle from './Rectangle'

export default class GraphNode {
    private circle: Arc
    private text: Text
    private rectangles: Rectangle[]
    private borders: Arc[]
    constructor(canvas: HTMLCanvasElement) {
        this.circle = new Arc(canvas)
        this.rectangles = [new Rectangle(canvas), new Rectangle(canvas), new Rectangle(canvas)]
        this.text = new Text(canvas)
        this.borders = [new Arc(canvas), new Arc(canvas), new Arc(canvas), new Arc(canvas)]
    }

    render(config: Config) {
        const { rect, text, background, fontSize, color, borderRadius = 6 } = config
        const topRect = new Rect(rect.startX + borderRadius, rect.startY, rect.width - borderRadius * 2, borderRadius)
        const middleRect = new Rect(rect.startX, rect.startY + borderRadius, rect.width, rect.height - borderRadius * 2)
        const bottomRect = new Rect(rect.startX + borderRadius, rect.endY - borderRadius, rect.width - borderRadius * 2, borderRadius)
        this.rectangles[0].render({
            rect: topRect,
        }, {
            fillStyle: background
        })
        this.rectangles[1].render({
            rect: middleRect,
        }, {
            fillStyle: background
        })
        this.rectangles[2].render({
            rect: bottomRect,
        }, {
            fillStyle: background
        })
        this.borders[0].render({
            center: rect.start.add(new Vec2(borderRadius, borderRadius)),
            angle: new Vec2(0, Math.PI * 2),
            radius: borderRadius,
        }, {
            fillStyle: background
        })
        this.borders[1].render({
            center: rect.endMirror.add(new Vec2(-borderRadius, borderRadius)),
            angle: new Vec2(0, Math.PI * 2),
            radius: borderRadius,
        }, {
            fillStyle: background
        })
        this.borders[2].render({
            center: rect.end.add(new Vec2(-borderRadius, -borderRadius)),
            angle: new Vec2(0, Math.PI * 2),
            radius: borderRadius,
        }, {
            fillStyle: background
        })
        this.borders[3].render({
            center: rect.startMirror.add(new Vec2(borderRadius, -borderRadius)),
            angle: new Vec2(0, Math.PI * 2),
            radius: borderRadius,
        }, {
            fillStyle: background
        })

        this.text.render({
            bound: rect.offset(new Vec2(0, 2)),
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
    rect: Rect
    background: string
    color: string
    fontSize: number
    borderRadius?: number
}