import Vec2 from './Vec2'

export default class Rect {
    constructor(public x: number, public y: number, public w: number, public h: number) {}

    get startX() {
        return this.x
    }

    get startY() {
        return this.y
    }

    get endX() {
        return this.x + this.w
    }

    get endY() {
        return this.y + this.h
    }

    get width() {
        return this.w
    }

    get height() {
        return this.h
    }

    get start() {
        return new Vec2(this.x, this.y)
    }

    get end() {
        return new Vec2(this.endX, this.endY)
    }

    within(rect: Rect) {
        return this.x >= rect.x && this.endX <= rect.endX && this.y >= rect.y && this.y <= rect.endY
    }

    clone() {
        return new Rect(this.x, this.y, this.w, this.h)
    }
}