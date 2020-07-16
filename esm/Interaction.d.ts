import Vec2 from './Vec2';
import EventBus from './EventBus';
export default class Interaction extends EventBus {
    private canvas;
    private callbacks;
    constructor(canvas: HTMLCanvasElement, callbacks: Callbacks);
    on(event: InteractionEventName, callback: (arg: InteractionEventData) => any): void;
    private translatePoint;
    private handleMouseDown;
    private handleScroll;
    private handleMouseMove;
    private dispatch;
}
interface Callbacks {
    scale(center: Vec2, delta: number): void;
    translate(delta: Vec2): void;
}
export declare type InteractionEventData = {
    name: 'scale';
    center: Vec2;
    delta: number;
} | {
    name: 'move';
    delta: Vec2;
} | {
    name: 'tap';
    center: Vec2;
};
export declare type InteractionEventName = InteractionEventData['name'];
export {};
