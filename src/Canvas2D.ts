import Vec2 from "./Vec2"
import Interaction from "./Interaction"

export default abstract class Canvas2D {
    public context: CanvasRenderingContext2D
    private scaleRatio: number
    constructor(protected canvas: HTMLCanvasElement) {
        this.canvas = canvas
        const context = this.canvas.getContext('2d')
        if (!context) {
            throw new Error('can not get context from canvas')
        }
        this.context = context
        this.scaleRatio = 1
        // || window.devicePixelRatio
    }

    render(config?: any, style?: CanvasContextStyle) {
        this.context.save()
        this.setStyle(style)
        const ret = this.draw(config)
        this.context.restore()
        return ret
    }

    protected abstract draw(config: any): any;

    private getStyle(style?: CanvasContextStyle): Required<CanvasContextStyle> {
        return {
            fillStyle: '#000',
            strokeStyle: '#000',
            lineWidth: 1,
            textAlign: 'start',
            direction: 'inherit',
            textBaseline: 'alphabetic',
            font: '13px Microsoft YaHei',
            lineJoin: 'bevel',
            ...style,
        }
    }


    private setStyle(style?: CanvasContextStyle) {
        const contextStyle = this.getStyle(style)
        // @ts-ignore
        if (this.context.setFillStyle) this.context.setFillStyle(contextStyle.fillStyle)
        else this.context.fillStyle = contextStyle.fillStyle

        // @ts-ignore
        if (this.context.setStrokeStyle) this.context.setStrokeStyle(contextStyle.strokeStyle)
        else this.context.strokeStyle = contextStyle.strokeStyle

        // @ts-ignore
        if (this.context.setLineWidth) this.context.setLineWidth(contextStyle.lineWidth)
        else this.context.lineWidth = contextStyle.lineWidth

        this.context.font = contextStyle.font

        // @ts-ignore
        if (this.context.setTextBaseline) this.context.setTextBaseline(contextStyle.textBaseline)
        else this.context.textBaseline = contextStyle.textBaseline

        // @ts-ignore
        if (this.context.setTextAlign) this.context.setTextAlign(contextStyle.textAlign)
        else this.context.textAlign = contextStyle.textAlign
    }
}

export interface CanvasContextStyle {
    fillStyle?: string
    strokeStyle?: string
    lineWidth?: number
    direction?: CanvasDirection
    lineJoin?: CanvasLineJoin
    font?: string
    textAlign?: CanvasTextAlign
    textBaseline?: CanvasTextBaseline
}
