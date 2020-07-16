import Canvas2D, {CanvasContextStyle} from './Canvas2D'
import { fixVec2 } from './utils'
import Vec2 from './Vec2'

export default class Line extends Canvas2D {

    protected draw(config: Config): void {
        const start = fixVec2(config.start)
        const end = fixVec2(config.end)
        this.context.beginPath()
        this.context.moveTo(start.x, start.y)
        this.context.lineTo(end.x, end.y)
        this.context.stroke()
        this.context.fill()
    }

    public render(config: Config, style?: CanvasContextStyle) {
        super.render(config, style)
    }
}

interface Config {
    start: Vec2
    end: Vec2
}