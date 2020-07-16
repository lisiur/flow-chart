import Canvas2D, { CanvasContextStyle } from './Canvas2D';
import Vec2 from './Vec2';
export default class Arc extends Canvas2D {
    protected draw(config: Config): void;
    render(config: Config, style?: CanvasContextStyle): void;
}
interface Config {
    center: Vec2;
    radius: number;
    angle: Vec2;
}
export {};
