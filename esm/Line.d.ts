import Canvas2D, { CanvasContextStyle } from './Canvas2D';
import Vec2 from './Vec2';
export default class Line extends Canvas2D {
    protected draw(config: Config): void;
    render(config: Config, style?: CanvasContextStyle): void;
}
interface Config {
    start: Vec2;
    end: Vec2;
}
export {};
