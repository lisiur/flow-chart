import Canvas2D, { CanvasContextStyle } from './Canvas2D'
import { fixVec2 } from './utils'
import Vec2 from './Vec2'

export default class Arc extends Canvas2D {
    protected draw(config: Config) {
        const {center, radius, angle: {x: angleStart, y: angleEnd}} = config
        const {x, y} = fixVec2(center)
        this.context.beginPath()
        this.context.arc(x, y, radius, angleStart, angleEnd)
        this.context.fill()
    }

    public render(config: Config, style?: CanvasContextStyle) {
        super.render(config, style)
    }
}

interface Config {
    center: Vec2,
    radius: number,
    angle: Vec2,
}