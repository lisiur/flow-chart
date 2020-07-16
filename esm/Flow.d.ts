import Vec2 from './Vec2';
export default class Flow {
    private canvas;
    config: FlowConfig;
    private flowNodes;
    private flowArrows;
    private context;
    private interaction;
    private rect;
    constructor(canvas: HTMLCanvasElement, dataList: Data[], config: FlowConfig);
    render(): void;
    translate(vec: Vec2): void;
    scale(center: Vec2, delta: number): void;
    private buildDataTree;
}
interface Data {
    id: string;
    label: string;
    children: string[];
    originData?: any;
}
interface FlowConfig {
    nodeBackground: (data: any) => string;
    nodeColor: (data: any) => string;
    arrowColor: (start: any, end: any) => string;
}
export {};
