import Vec2 from './Vec2';
import Rect from './Rect';
declare class Axis {
    origin: Rect;
    bounds: Rect;
    constructor(rect: Rect);
    move(vec: Vec2): void;
    scale(vec: Vec2, dRatio: number): void;
    translate(vec: Vec2): void;
}
export default Axis;
