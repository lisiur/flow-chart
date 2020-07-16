export default abstract class Canvas2D {
    protected canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    private scaleRatio;
    constructor(canvas: HTMLCanvasElement);
    render(config?: any, style?: CanvasContextStyle): void;
    protected abstract draw(config: any): any;
    private getStyle;
    private setStyle;
}
export interface CanvasContextStyle {
    fillStyle?: string;
    strokeStyle?: string;
    lineWidth?: number;
    direction?: CanvasDirection;
    lineJoin?: CanvasLineJoin;
    font?: string;
    textAlign?: CanvasTextAlign;
    textBaseline?: CanvasTextBaseline;
}
