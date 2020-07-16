import Canvas2D, { CanvasContextStyle } from './Canvas2D';
import Rect from './Rect';
import Vec2 from './Vec2';
export default class Text extends Canvas2D {
    protected draw(config: Config): Vec2;
    render(config: Config, style?: CanvasContextStyle): void;
}
export interface Config {
    text: string;
    bound: Rect;
    textBaseOffset?: 'center' | 'left' | 'right' | 'top' | 'bottom' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
}
