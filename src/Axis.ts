import Vec2 from './Vec2'
import Rect from './Rect'

class Axis {
    public origin: Rect
    public bounds: Rect

    constructor(rect: Rect) {
        this.origin = rect.clone()
        this.bounds = rect.clone()
    }

    move(vec: Vec2) {
    }

    scale(vec: Vec2, dRatio: number) {
    }

    translate(vec: Vec2) {
    }
}

export default Axis