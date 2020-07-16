import Vec2 from "./Vec2";
export default class FlowNode {
    config: Config;
    private graphArrow;
    constructor(canvas: HTMLCanvasElement, config: Config);
    render(config?: Config): void;
}
export interface Config {
    start: Vec2;
    end: Vec2;
    color: string;
}
