import Vec2 from "./Vec2";
export default class FlowNode<T> {
    config: Config;
    data: T;
    private graphNode;
    private radius;
    constructor(canvas: HTMLCanvasElement, config: Config, data: T);
    render(): void;
    contains(vec: Vec2): boolean;
}
export interface Config {
    text: string;
    center: Vec2;
    color: string;
    background: string;
}
