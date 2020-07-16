import Vec2 from './Vec2';
export default class Rect {
    x: number;
    y: number;
    w: number;
    h: number;
    constructor(x: number, y: number, w: number, h: number);
    get startX(): number;
    get startY(): number;
    get endX(): number;
    get endY(): number;
    get width(): number;
    get height(): number;
    get start(): Vec2;
    get end(): Vec2;
    within(rect: Rect): boolean;
    clone(): Rect;
}
