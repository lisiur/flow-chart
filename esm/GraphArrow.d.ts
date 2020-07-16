import Vec2 from './Vec2';
export default class GraphArrow {
    private startCircle;
    private endTriangle;
    private endTriangleWrapper;
    private polyline;
    constructor(canvas: HTMLCanvasElement);
    render(config: Config): void;
}
export interface Config {
    color: string;
    wrapLength: number;
    start: Vec2;
    startRadius: number;
    end: Vec2;
    endAngle: number;
    endHeight: number;
    endBorder: number;
}
