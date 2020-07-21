import Canvas2D, {CanvasContextStyle} from './Canvas2D'
import Line from './Line'
import Rect from './Rect'
import Vec2 from './Vec2'

export default class Text extends Canvas2D {

    protected draw(config: Config): Vec2 {
        const {
            text = ' ',
            bound,
            textBaseOffset = 'center',
            top = 0,
            left = 0,
            right = 0,
            bottom = 0,
        } = config
        const textWidth = this.context.measureText(text).width
        const textHeight = this.context.measureText(text[0]).width * 1.2
        let startX = bound.startX
        let startY = bound.startY
        let offsetX: number
        let offsetY: number
        switch (textBaseOffset) {
            case 'leftTop': {
                offsetX = left
                offsetY = top
                this.context.textBaseline = 'top'
                break
            }
            case 'left': {
                offsetX = left
                offsetY = bound.height / 2
                this.context.textBaseline = 'middle'
                break
            }
            case 'leftBottom': {
                offsetX = left
                offsetY = bound.height
                this.context.textBaseline = 'bottom'
                break
            }
            case 'top': {
                offsetX = bound.width / 2
                offsetY = top
                this.context.textBaseline = 'top'
                this.context.textAlign = 'center'
                break
            }
            case 'center': {
                offsetX = bound.width / 2
                offsetY = bound.height / 2
                this.context.textBaseline = 'middle'
                this.context.textAlign = 'center'
                break
            }
            case 'bottom': {
                offsetX = bound.width/ 2
                offsetY = bound.height - bottom
                this.context.textBaseline = 'bottom'
                this.context.textAlign = 'center'
                break
            }
            case 'rightTop': {
                offsetX = bound.width
                offsetY = top
                this.context.textBaseline = 'top'
                this.context.textAlign = 'right'
                break
            }
            case 'right': {
                offsetX = bound.width
                offsetY = bound.height / 2
                this.context.textBaseline = 'middle'
                this.context.textAlign = 'right'
                break
            }
            case 'rightBottom': {
                offsetX = bound.width
                offsetY = bound.height
                this.context.textBaseline = 'bottom'
                this.context.textAlign = 'right'
                break
            }
        }
        this.context.fillText(text, startX + offsetX, startY + offsetY)
        return new Vec2(textWidth, textHeight)
    }

    public render(config: Config, style?: CanvasContextStyle) {
        return super.render(config, style)
    }
}

export interface Config {
    text: string
    bound: Rect
    textBaseOffset?: 'center' | 'left' | 'right' | 'top' | 'bottom' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom'
    top?: number
    left?: number
    right?: number
    bottom?: number
}