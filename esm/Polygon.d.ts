import Canvas2D, { CanvasContextStyle } from './Canvas2D';
import Vec2 from './Vec2';
export default class Polygon extends Canvas2D {
    protected draw(config: Config): void;
    render(config: Config, style?: CanvasContextStyle): void;
}
interface Config {
    points: Array<Vec2>;
}
export {};
