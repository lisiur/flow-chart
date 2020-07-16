import Canvas2D, { CanvasContextStyle } from './Canvas2D'
import { fixVec2 } from './utils'
import Rect from './Rect'

export default class Rectangle extends Canvas2D {

    protected draw(config: Config): void {
        const rect = config.rect
        const start = fixVec2(rect.start)
        const end = fixVec2(rect.end)
        this.context.beginPath()
        this.context.moveTo(start.x, start.y)
        this.context.lineTo(end.x, start.y)
        this.context.lineTo(end.x, end.y)
        this.context.lineTo(start.x, end.y)
        this.context.fill()
    }

    public render(config: Config, style?: CanvasContextStyle) {
        super.render(config, style)
    }
}

interface Config {
    rect: Rect
}