import Canvas2D, {CanvasContextStyle} from './Canvas2D'
import { fixVec2 } from './utils'
import Vec2 from './Vec2'

export default class Polygon extends Canvas2D {

    protected draw(config: Config): void {
        if (config.points.length < 3) return
        const points = config.points.map(point => fixVec2(point))
        this.context.beginPath()
        this.context.moveTo(points[0].x, points[0].y)
        for (let i = 1; i < points.length; ++i) {
            this.context.lineTo(points[i].x, points[i].y)
        }
        this.context.closePath()
        this.context.fill()
    }

    public render(config: Config, style?: CanvasContextStyle) {
        super.render(config, style)
    }
}

interface Config {
    points: Array<Vec2>
}