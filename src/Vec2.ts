export default class Vec2 {
    private arr: Array<number>
    constructor(x?: number, y?: number) {
        x = x ?? 0
        y = y ?? x
        this.arr = [x, y]
    }

    get 0() {
        return this.arr[0]
    }
    set 0(v: number) {
        this.arr[0] = v
    }

    get 1() {
        return this.arr[1]
    }
    set 1(v: number) {
        this.arr[1] = v
    }

    get x() {
        return this.arr[0]
    }
    set x(v: number) {
        this.arr[0] = v
    }

    get y() {
        return this.arr[1]
    }
    set y(v: number) {
        this.arr[1] = v
    }

    eachSelf(p: (n: number) => number) {
        this.x = p(this.x)
        this.y = p(this.y)
    }

    each(p: (n: number) => number) {
        return new Vec2(p(this.x), p(this.y))
    }

    add(arg: Vec2 | number) {
        if (typeof arg === 'number') {
            arg = new Vec2(arg, arg)
            return arg.addSelf(this)
        } else {
            const arr = this.arr.slice()
            arr.forEach((v, i, s) => {
                s[i] = v + (arg as Vec2).arr[i]
            })
            return new Vec2(arr[0], arr[1])
        }
    }

    addSelf(arg: Vec2 | number) {
        if (typeof arg === 'number') {
            arg = new Vec2(arg)
        }
        this.arr.forEach((v, i, s) => {
            s[i] = v + (arg as Vec2).arr[i]
        })
        return this
    }

    multiply(arg: Vec2 | number) {
        if (typeof arg === 'number') {
            arg = new Vec2(arg)
        }
        const arr = this.arr.slice()
        arr[0] *= arg[0]
        arr[1] *= arg[1]
        return new Vec2(...arr)
    }

    multiplySelf(arg: Vec2 | number) {
        if (typeof arg === 'number') {
            arg = new Vec2(arg)
        }
        this.arr[0] *= arg[0]
        this.arr[1] *= arg[1]
        return this
    }

    clone() {
        return new Vec2(this.x, this.y)
    }
}
