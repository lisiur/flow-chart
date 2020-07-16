import Arc from './Arc'
import Polygon from './Polygon'
import Polyline from './Polyline'
import Vec2 from './Vec2'
import Interaction from './Interaction'

export default class GraphArrow {
    private startCircle: Arc
    private endTriangle: Polygon
    private endTriangleWrapper: Polygon
    private polyline: Polyline
    constructor(canvas: HTMLCanvasElement) {
        this.startCircle = new Arc(canvas)
        this.endTriangle = new Polygon(canvas)
        this.endTriangleWrapper = new Polygon(canvas)
        this.polyline = new Polyline(canvas)
    }

    render(config: Config) {
        const { color, start, end, startRadius, endAngle, endHeight, endBorder, wrapLength } = config
        // draw start circle
        this.startCircle.render({
            center: start,
            angle: new Vec2(0, Math.PI * 2),
            radius: startRadius,
        }, {
            fillStyle: color
        })

        // draw end arrow
        const deltaH = endHeight
        const deltaW = deltaH / Math.tan(Math.PI / 2 - endAngle / 2)
        const leftPoint = new Vec2(end.x - deltaW, end.y - deltaH)
        const rightPoint = new Vec2(end.x + deltaW, end.y - deltaH)
        const points = [end, rightPoint, leftPoint]
        this.endTriangleWrapper.render({
            points: points.map(point => point.add(new Vec2(0, endBorder)))
        }, {
            fillStyle: 'white'
        })
        this.endTriangle.render({
            points,
        }, {
            fillStyle: color
        })

        // draw line
        // const startWrapPoint = start.add(new Vec2(0, wrapLength))
        // const endWrapPoint = end.add(new Vec2(0, -(end.y - start.y - wrapLength)))
        const startWrapPoint = start.add(new Vec2(0, end.y - start.y - wrapLength))
        const endWrapPoint = end.add(new Vec2(0, -wrapLength))
        const linePoints = [start, startWrapPoint, endWrapPoint, end]
        this.polyline.render({
            points: linePoints
        }, {
            strokeStyle: color
        })
    }
}

export interface Config {
    color: string
    wrapLength: number
    start: Vec2
    startRadius: number
    end: Vec2
    endAngle: number
    endHeight: number
    endBorder: number
}