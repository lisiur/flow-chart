import Vec2 from './Vec2';
export default class GraphNode {
    private circle;
    private text;
    constructor(canvas: HTMLCanvasElement);
    render(config: Config): void;
}
export interface Config {
    text: string;
    center: Vec2;
    radius: number;
    background: string;
    color: string;
    fontSize: number;
}
