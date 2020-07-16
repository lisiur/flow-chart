import Canvas2D, { CanvasContextStyle } from './Canvas2D';
import Rect from './Rect';
export default class Rectangle extends Canvas2D {
    protected draw(config: Config): void;
    render(config: Config, style?: CanvasContextStyle): void;
}
interface Config {
    rect: Rect;
}
export {};
