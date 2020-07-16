import Vec2 from './Vec2'
import EventBus from './EventBus'

export default class Interaction extends EventBus {
    constructor(private canvas: HTMLCanvasElement, private callbacks: Callbacks) {
        super()
        this.canvas.addEventListener('mousewheel', e => this.handleScroll(e as any))
        this.canvas.addEventListener('DOMMouseScroll', e => this.handleScroll(e as any))
        this.canvas.addEventListener('mousemove', e => this.handleMouseMove(e))
        this.canvas.addEventListener('mousedown', e => this.handleMouseDown(e))
    }

    public on(event: InteractionEventName, callback: (arg: InteractionEventData) => any) {
        super.on(event, callback)
    }

    // private translatePoint(vec: Vec2) {
    //     const context = this.canvas.getContext('2d') as CanvasRenderingContext2D
    //     const {x, y} = context.getTransform().invertSelf().transformPoint({x: vec.x, y: vec.y})
    //     return new Vec2(x, y)
    // }

    private handleMouseDown(e: MouseEvent) {
        if (e.buttons === 1) {
            const { offsetX: x, offsetY: y } = e
            this.dispatch({
                name: 'tap',
                center: new Vec2(x, y)
            })
        }
    }

    private handleScroll(e: MouseEvent & { wheelDelta: number }) {
        // e.preventDefault()
        const { offsetX: x, offsetY: y } = e
        let delta = 1 + (e.wheelDelta ? e.wheelDelta / 40 : (-e.detail)) * 0.1
        const center = new Vec2(x, y)
        this.callbacks.scale(center, delta)
        this.dispatch({
            name: 'scale',
            center,
            delta
        })
    }

    private handleMouseMove(e: MouseEvent) {
        if (e.buttons === 1) {
            const delta = new Vec2(e.movementX, e.movementY)
            this.callbacks.translate(delta)
            this.dispatch({
                name: 'move',
                delta
            })
        }
    }

    private dispatch(event: InteractionEventData) {
        this.emit(event.name, event)
    }
}

interface Callbacks {
    scale(center: Vec2, delta: number): void
    translate(delta: Vec2): void
}


export type InteractionEventData = {
    name: 'scale'
    center: Vec2
    delta: number
} | {
    name: 'move',
    delta: Vec2
} | {
    name: 'tap'
    center: Vec2
}

export type InteractionEventName = InteractionEventData['name']
