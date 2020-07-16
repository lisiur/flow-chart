import Vec2 from './Vec2';
import EventBus from './EventBus';
export default class Interaction extends EventBus {
    constructor(canvas, callbacks) {
        super();
        this.canvas = canvas;
        this.callbacks = callbacks;
        this.canvas.addEventListener('mousewheel', e => this.handleScroll(e));
        this.canvas.addEventListener('DOMMouseScroll', e => this.handleScroll(e));
        this.canvas.addEventListener('mousemove', e => this.handleMouseMove(e));
        this.canvas.addEventListener('mousedown', e => this.handleMouseDown(e));
    }
    on(event, callback) {
        super.on(event, callback);
    }
    translatePoint(vec) {
        const context = this.canvas.getContext('2d');
        const { x, y } = context.getTransform().invertSelf().transformPoint({ x: vec.x, y: vec.y });
        return new Vec2(x, y);
    }
    handleMouseDown(e) {
        if (e.buttons === 1) {
            const { offsetX: x, offsetY: y } = e;
            this.dispatch({
                name: 'tap',
                center: this.translatePoint(new Vec2(x, y))
            });
        }
    }
    handleScroll(e) {
        e.preventDefault();
        const { offsetX: x, offsetY: y } = e;
        let delta = 1 + (e.wheelDelta ? e.wheelDelta / 40 : (-e.detail)) * 0.1;
        const center = new Vec2(x, y);
        this.callbacks.scale(center, delta);
        this.dispatch({
            name: 'scale',
            center: this.translatePoint(center),
            delta
        });
    }
    handleMouseMove(e) {
        if (e.buttons === 1) {
            const delta = new Vec2(e.movementX, e.movementY);
            this.callbacks.translate(delta);
            this.dispatch({
                name: 'move',
                delta
            });
        }
    }
    dispatch(event) {
        this.emit(event.name, event);
    }
}
