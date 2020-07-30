import Vec2 from './Vec2'

export default class Rect {
    constructor(public x: number, public y: number, public w: number, public h: number) { }

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

    get startMirror() {
        return new Vec2(this.x, this.endY)
    }

    get endMirror() {
        return new Vec2(this.endX, this.y)
    }

    combine(rect: Rect) {
        let { startX, startY, endX, endY } = this
        let { startX: newStartX, startY: newStartY, endX: newEndX, endY: newEndY } = rect
        startX = Math.min(startX, newStartX)
        startY = Math.min(startY, newStartY)
        endX = Math.max(endX, newEndX)
        endY = Math.max(endY, newEndY)
        return new Rect(startX, startY, endX - startX, endY - startY)
    }

    offset(vec: Vec2) {
        return new Rect(this.x + vec.x, this.y + vec.y, this.w, this.h)
    }

    within(rect: Rect) {
        return this.x >= rect.x && this.endX <= rect.endX && this.y >= rect.y && this.y <= rect.endY
    }
    
    cover(rect: Rect) {
        return rect.within(this)
    }

    intersect(rect: Rect) {
        return !(this.endX < rect.x || this.x > rect.endX || this.y > rect.endY || this.endY < rect.y)
    }

    contains(vec: Vec2) {
        return vec.x >= this.x && vec.x <= this.endX && vec.y >= this.y && vec.y <= this.endY
    }

    clone() {
        return new Rect(this.x, this.y, this.w, this.h)
    }
}